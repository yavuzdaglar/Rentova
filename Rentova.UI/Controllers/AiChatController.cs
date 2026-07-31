using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Rentova.UI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AiChatController : ControllerBase
{
    private const string ProviderUrl = "https://openrouter.ai/api/v1/chat/completions";
    private const string Model = "stepfun/step-3.5-flash:free";
    private const string Referer = "http://localhost:5135";
    private const string Title = "Rentova UI Chat";
    private const string SystemPrompt = "Sen Rentova arac kiralama platformunun destek asistanisin.\n\nEGER mesaj Rentova, arac kiralama, rezervasyon, odeme, destek veya siteyle ilgili ise: Kibar ve yardimci cevap ver.\n\nEGER mesaj Rentova ile ILGILI DEGIL ise: Sunu cevap ver: 'Uzgunum ben sadece Rentova sitesinin AI'iyim. Baska konularda bir fikrim yok. Sana Rentova hakkinda nasil yardim edebilirim?'\n\nKurallar: Yalnizca site konularinda cevap ver. Diger konularda KESIN OLARAK spesifik mesaj ver.";

    // API key configuration üzerinden okunur (appsettings veya ortam değişkeni: OpenRouter__ApiKey)
    private readonly string _apiKey;
    private readonly IHttpClientFactory _httpClientFactory;

    public AiChatController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _apiKey = configuration["OpenRouter:ApiKey"] ?? string.Empty;
    }

    [HttpPost("ask")]
    public async Task<IActionResult> Ask([FromBody] AiChatRequest request)
    {
        var message = request.Message?.Trim() ?? string.Empty;
        if (string.IsNullOrWhiteSpace(message))
        {
            return BadRequest(new { reply = "Mesaj bos olamaz." });
        }

        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            return Ok(new { reply = "Şu anda AI servisi kullanılamıyor. Lütfen sonra tekrar deneyiniz." });
        }

        var messages = new List<object>
        {
            new { role = "system", content = SystemPrompt }
        };

        var history = request.History ?? new List<AiChatHistoryItem>();
        foreach (var item in history.TakeLast(8))
        {
            var role = (item.Role ?? string.Empty).Trim().ToLowerInvariant();
            if ((role != "user" && role != "assistant") || string.IsNullOrWhiteSpace(item.Content))
            {
                continue;
            }

            messages.Add(new
            {
                role,
                content = item.Content.Trim()
            });
        }

        messages.Add(new { role = "user", content = message });

        var payload = new
        {
            model = Model,
            messages,
            temperature = 0.3,
            max_tokens = 1500
        };

        string responseText;
        HttpResponseMessage response;
        try
        {
            var client = _httpClientFactory.CreateClient();
            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, ProviderUrl);
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            httpRequest.Headers.TryAddWithoutValidation("HTTP-Referer", Referer);
            httpRequest.Headers.TryAddWithoutValidation("X-Title", Title);
            httpRequest.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            response = await client.SendAsync(httpRequest);
            responseText = await response.Content.ReadAsStringAsync();
        }
        catch
        {
            return Ok(new { reply = "Şu anda AI servisi kullanılamıyor. Lütfen sonra tekrar deneyiniz." });
        }

        if (!response.IsSuccessStatusCode)
        {
            return Ok(new { reply = "Şu anda AI servisi kullanılamıyor. Lütfen sonra tekrar deneyiniz." });
        }

        var parsed = JsonSerializer.Deserialize<OpenRouterResponse>(responseText, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        var choice = parsed?.Choices?.FirstOrDefault();
        var reply = choice?.Message?.Content?.Trim();
        if (string.IsNullOrWhiteSpace(reply))
        {
            return Ok(new { reply = "Şu anda AI servisi kullanılamıyor. Lütfen sonra tekrar deneyiniz." });
        }

        // Eğer token limitine ulaştığında kesilmişse sona uyarı ekle
        if (choice?.FinishReason == "length")
        {
            reply += "\n\n[Yanıt sistem sınırı yüzünden kısaltılmıştır. Daha fazla bilgi için bize ulaşabilirsiniz.]";
        }

        return Ok(new { reply });
    }

    public sealed class AiChatRequest
    {
        public string? Message { get; set; }
        public List<AiChatHistoryItem>? History { get; set; }
    }

    public sealed class AiChatHistoryItem
    {
        public string? Role { get; set; }
        public string? Content { get; set; }
    }

    private sealed class OpenRouterResponse
    {
        [JsonPropertyName("choices")]
        public List<OpenRouterChoice>? Choices { get; set; }
    }

    private sealed class OpenRouterChoice
    {
        [JsonPropertyName("message")]
        public OpenRouterMessage? Message { get; set; }
        [JsonPropertyName("finish_reason")]
        public string? FinishReason { get; set; }
    }

    private sealed class OpenRouterMessage
    {
        [JsonPropertyName("content")]
        public string? Content { get; set; }
    }
}