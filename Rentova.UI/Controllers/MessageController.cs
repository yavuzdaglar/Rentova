using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.MessageDtos;
using System.Net.Http.Json;

namespace Rentova.UI.Controllers
{
    public class MessageController : Controller
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private const string BaseUrl = "http://localhost:5234/";

        [HttpGet]
        public async Task<IActionResult> UserMessages(int userId)
        {
            if (userId <= 0)
            {
                return Ok(Array.Empty<MessageGetDto>());
            }

            try
            {
                var values = await _httpClient.GetFromJsonAsync<List<MessageGetDto>>($"{BaseUrl}api/Messages/getbyuserid/{userId}") ?? new();
                return Ok(values);
            }
            catch
            {
                return Ok(Array.Empty<MessageGetDto>());
            }
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(MessageAddDto messageAddDto)
        {
            if (messageAddDto == null)
            {
                return BadRequest("Gecersiz mesaj.");
            }

            if (messageAddDto.AppUserId <= 0 && int.TryParse(Request.Cookies["rv_user_id"], out var cookieUserId))
            {
                messageAddDto.AppUserId = cookieUserId;
            }

            if (messageAddDto.AppUserId <= 0)
            {
                return BadRequest("Gecersiz mesaj.");
            }

            if (string.IsNullOrWhiteSpace(messageAddDto.Title) || string.IsNullOrWhiteSpace(messageAddDto.Content))
            {
                return BadRequest("Mesaj basligi ve icerik zorunludur.");
            }

            try
            {
                var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}api/Messages/add", messageAddDto);
                if (!response.IsSuccessStatusCode)
                {
                    if (!Request.HasJsonContentType())
                    {
                        TempData["AccountMessageFeedback"] = "Mesaj gonderilemedi.";
                        return RedirectToAction("Index", "AccountMenu");
                    }

                    return StatusCode((int)response.StatusCode, "Mesaj gonderilemedi.");
                }

                if (!Request.HasJsonContentType())
                {
                    TempData["AccountMessageFeedback"] = "Mesaj gonderildi.";
                    return RedirectToAction("Index", "AccountMenu");
                }

                return Ok("Mesaj gonderildi.");
            }
            catch
            {
                if (!Request.HasJsonContentType())
                {
                    TempData["AccountMessageFeedback"] = "Sunucuya baglanilamadi.";
                    return RedirectToAction("Index", "AccountMenu");
                }

                return StatusCode(500, "Sunucuya baglanilamadi.");
            }
        }
    }
}
