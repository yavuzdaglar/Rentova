using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.CarDtos;
using Rentova.UI.Dtos.ReservationDtos;
using Rentova.UI.Models;
using System.Net;
using System.Net.Http.Json;

namespace Rentova.UI.Controllers;

public class ReservationController : Controller
{
    private readonly HttpClient _httpClient = new HttpClient();
    private const string BaseUrl = "http://localhost:5234/";

    [HttpGet]
    public async Task<IActionResult> Index(int carId)
    {
        var model = new ReservationPageViewModel();

        try
        {
            if (carId <= 0)
            {
                var cars = await _httpClient.GetFromJsonAsync<List<CarGetAllDto>>($"{BaseUrl}api/Cars/getall") ?? new();
                carId = cars.FirstOrDefault()?.CarId ?? 0;
            }

            if (carId > 0)
            {
                model.Car = await _httpClient.GetFromJsonAsync<CarGetDto>($"{BaseUrl}api/Cars/get/{carId}");
                model.Reservations = await _httpClient.GetFromJsonAsync<List<ReservationGetDto>>($"{BaseUrl}api/Reservation/getbycarid/{carId}") ?? new();
            }
        }
        catch
        {
            // Fallback to empty model and show graceful page state.
        }

        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ReservationAddDto reservationAddDto)
    {
        if (reservationAddDto == null)
        {
            return BadRequest("Rezervasyon verisi gönderilmedi.");
        }

        if (reservationAddDto.StartDate > reservationAddDto.EndDate)
        {
            return BadRequest("Başlangıç tarihi bitiş tarihinden sonra olamaz.");
        }

        try
        {
            var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}api/Reservation/add", reservationAddDto);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                    var message = ExtractSafeErrorMessage(error);
                    return BadRequest(string.IsNullOrWhiteSpace(message) ? "Rezervasyon oluşturulamadı." : message);
                }

                return StatusCode(500, "Rezervasyon servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
            }

            return Ok("Rezervasyon başarıyla oluşturuldu.");
        }
        catch
        {
            return StatusCode(500, "Sunucuya bağlanılamadı.");
        }
    }

    [HttpGet]
    public async Task<IActionResult> ReservedRanges(int carId)
    {
        try
        {
            var values = await _httpClient.GetFromJsonAsync<List<ReservationGetDto>>($"{BaseUrl}api/Reservation/getbycarid/{carId}") ?? new();
            return Ok(values.Select(x => new { x.StartDate, x.EndDate }));
        }
        catch
        {
            return Ok(Array.Empty<object>());
        }
    }

    private static string ExtractSafeErrorMessage(string rawError)
    {
        if (string.IsNullOrWhiteSpace(rawError))
        {
            return string.Empty;
        }

        var cleanError = rawError.Trim().Replace("\r", " ").Replace("\n", " ");
        if (cleanError.Length > 400)
        {
            if (cleanError.Contains("Invalid object name", StringComparison.OrdinalIgnoreCase))
            {
                return "Rezervasyon altyapısı henüz hazır değil. Lütfen sistem yöneticisiyle iletişime geçin.";
            }

            return "Rezervasyon oluşturulamadı.";
        }

        return cleanError;
    }
}
