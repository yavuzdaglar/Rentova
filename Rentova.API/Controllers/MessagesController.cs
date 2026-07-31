using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Rentova.Application.Dtos.MessageDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly IAppUserService _appUserService;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public MessagesController(IMessageService messageService,IAppUserService appUserService,IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _messageService = messageService;
        _appUserService = appUserService;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpGet("getall")]
    public IActionResult GetAll()
    {
        var values = _messageService.GetAll();
        return Ok(values);
    }

    [HttpGet("getbyid/{id}")]
    public IActionResult GetById(int id)
    {
        var value = _messageService.GetById(id);
        if (value == null)
        {
            return NotFound("Mesaj bulunamadı.");
        }

        return Ok(value);
    }

    [HttpGet("getbyuserid/{userId}")]
    public IActionResult GetByUserId(int userId)
    {
        var values = _messageService.GetByUserId(userId);
        return Ok(values);
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add(MessageAddDto messageAddDto)
    {
        if (messageAddDto.AppUserId <= 0)
        {
            return BadRequest("Geçersiz kullanıcı.");
        }

        var user = _appUserService.GetById(messageAddDto.AppUserId);
        if (user == null)
        {
            return BadRequest("Mesaj gonderilecek kullanici bulunamadi.");
        }

        if (string.IsNullOrWhiteSpace(messageAddDto.Title) || string.IsNullOrWhiteSpace(messageAddDto.Content))
        {
            return BadRequest("Mesaj başlığı ve içerik zorunludur.");
        }

        try
        {
            var toxicityResult = await AnalyzeToxicityAsync(messageAddDto.Title, messageAddDto.Content);
            messageAddDto.Status = toxicityResult ? "Toksik" : "Cevap Bekleniyor";

            _messageService.Add(messageAddDto);
            return Ok("Mesaj başarıyla oluşturuldu.");
        }
        catch (DbUpdateException)
        {
            return BadRequest("Mesaj kaydedilemedi. Kullanici bilgisi gecersiz olabilir.");
        }
    }

    [HttpPut("update")]
    public IActionResult Update(MessageUpdateDto messageUpdateDto)
    {
        if (messageUpdateDto.MessageId <= 0 || messageUpdateDto.AppUserId <= 0)
        {
            return BadRequest("Geçersiz mesaj veya kullanıcı.");
        }

        _messageService.Update(messageUpdateDto);
        return Ok("Mesaj başarıyla güncellendi.");
    }

    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        _messageService.Delete(id);
        return Ok("Mesaj başarıyla silindi.");
    }

    private async Task<bool> AnalyzeToxicityAsync(string title, string content)
    {
        var apiKey = _configuration["OpenRouter:ApiKey"] ?? string.Empty;
        const string modelName = "stepfun/step-3.5-flash:free";
        const string baseUrl = "https://openrouter.ai/api/v1/";

        var ruleBasedToxic = IsRuleBasedToxicity(title, content);

        var prompt = $"Baslik: {title}\nMesaj: {content}";

        var payload = new
        {
            model = modelName,
            messages = new object[]
            {
                new
                {
                    role = "system",
                    content = "Sen bir toksisite siniflandiricisisin. Su kurallari uygula: 1) Musterinin sinirli veya sert bir dille sikayet etmesi tek basina toksiklik degildir. 2) Kufur, hakaret, asagilama, tehdit toksikliktir. 3) Anlamsiz random karakter dizileri, spam benzeri anlamsiz tekrarlar toksikliktir. 4) Normal soru, talep, sikayet veya yardim isteme toksik degildir. Cikti sadece tek kelime olsun: TOXIC veya SAFE."
                },
                new
                {
                    role = "user",
                    content = prompt
                }
            },
            temperature = 0
        };

        var client = _httpClientFactory.CreateClient();
        using var request = new HttpRequestMessage(HttpMethod.Post, $"{baseUrl}chat/completions");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Headers.TryAddWithoutValidation("HTTP-Referer", "http://localhost:5234");
        request.Headers.TryAddWithoutValidation("X-Title", "Rentova API");
        request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

        using var response = await client.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            return ruleBasedToxic;
        }

        var body = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<OpenRouterResponse>(body, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        var decision = result?.Choices?.FirstOrDefault()?.Message?.Content?.Trim().ToUpperInvariant() ?? string.Empty;

        if (decision.Contains("TOXIC"))
        {
            return true;
        }

        if (decision.Contains("SAFE"))
        {
            return ruleBasedToxic;
        }

        return ruleBasedToxic;
    }

    private static bool IsRuleBasedToxicity(string title, string content)
    {
        var combined = $"{title} {content}".Trim();
        if (string.IsNullOrWhiteSpace(combined))
        {
            return false;
        }

        var normalized = NormalizeForCheck(combined);

        if (LooksLikeRandomOrSpam(normalized))
        {
            return true;
        }

        return false;
    }

    private static string NormalizeForCheck(string input)
    {
        return input
            .ToLowerInvariant()
            .Replace('\u0131', 'i')
            .Replace('\u00E7', 'c')
            .Replace('\u011F', 'g')
            .Replace('\u00F6', 'o')
            .Replace('\u015F', 's')
            .Replace('\u00FC', 'u');
    }

    private static bool LooksLikeRandomOrSpam(string input)
    {
        if (input.Length < 12)
        {
            return false;
        }

        if (Regex.IsMatch(input, "(.)\\1{5,}"))
        {
            return true;
        }

        var letters = input.Count(char.IsLetter);
        var digits = input.Count(char.IsDigit);
        var spaces = input.Count(char.IsWhiteSpace);
        var symbols = input.Length - letters - digits - spaces;

        // Cok yuksek sembol/rakam orani anlamsiz random metinlere isaret eder.
        if ((digits + symbols) > (letters + spaces) && (digits + symbols) > 8)
        {
            return true;
        }

        // Uzun ama hic bosluk icermeyen metinler genelde spam/random girdidir.
        if (!input.Contains(' ') && input.Length > 20)
        {
            return true;
        }

        return false;
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
    }

    private sealed class OpenRouterMessage
    {
        [JsonPropertyName("content")]
        public string? Content { get; set; }
    }
}
