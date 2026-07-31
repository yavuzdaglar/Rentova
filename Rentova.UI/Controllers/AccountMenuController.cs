using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.ReservationDtos;
using Rentova.UI.Dtos.MessageDtos;
using Rentova.UI.Models.AccountMenu;
using System.Net.Http.Json;

namespace Rentova.UI.Controllers
{
    public class AccountMenuController : Controller
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private const string BaseUrl = "http://localhost:5234/";

        public async Task<IActionResult> Index()
        {
            var model = BuildModelFromCookies();
            if (model.UserId <= 0)
            {
                return RedirectToAction("Index", "Login");
            }

            // Fallback to API role information when cookie is missing or stale.
            try
            {
                var currentUser = await _httpClient.GetFromJsonAsync<Rentova.UI.Dtos.AppUserDtos.AppUserGetDto>($"{BaseUrl}api/Login/getbyid/{model.UserId}");
                if (currentUser != null)
                {
                    model.IsAdmin = currentUser.IsAdmin;

                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.Lax,
                        Expires = DateTimeOffset.UtcNow.AddDays(7)
                    };

                    Response.Cookies.Append("rv_user_isadmin", currentUser.IsAdmin.ToString(), cookieOptions);
                }
            }
            catch
            {
                // Keep cookie-based value if API call fails.
            }

            model.Reservations = await GetReservations(model.UserId);
            model.Messages = await GetMessages(model.UserId);

            model.ReservationFeedback = TempData["AccountReservationFeedback"]?.ToString() ?? string.Empty;
            model.MessageFeedback = TempData["AccountMessageFeedback"]?.ToString() ?? string.Empty;
            model.ProfileFeedback = TempData["AccountProfileFeedback"]?.ToString() ?? string.Empty;
            model.IsProfileFeedbackError = string.Equals(TempData["AccountProfileFeedbackType"]?.ToString(), "error", StringComparison.OrdinalIgnoreCase);
            model.PasswordFeedback = TempData["AccountPasswordFeedback"]?.ToString() ?? string.Empty;
            model.IsPasswordFeedbackError = string.Equals(TempData["AccountPasswordFeedbackType"]?.ToString(), "error", StringComparison.OrdinalIgnoreCase);

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            if (reservationId <= 0)
            {
                TempData["AccountReservationFeedback"] = "Gecersiz rezervasyon.";
                return RedirectToAction(nameof(Index));
            }

            try
            {
                var response = await _httpClient.DeleteAsync($"{BaseUrl}api/Reservation/delete/{reservationId}");
                if (!response.IsSuccessStatusCode)
                {
                    TempData["AccountReservationFeedback"] = "Rezervasyon silinemedi.";
                    return RedirectToAction(nameof(Index));
                }

                TempData["AccountReservationFeedback"] = "Rezervasyon silindi.";
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                TempData["AccountReservationFeedback"] = "Sunucuya baglanilamadi.";
                return RedirectToAction(nameof(Index));
            }
        }

        private async Task<List<ReservationGetDto>> GetReservations(int userId)
        {
            try
            {
                return await _httpClient.GetFromJsonAsync<List<ReservationGetDto>>($"{BaseUrl}api/Reservation/getbyuserid/{userId}") ?? new();
            }
            catch
            {
                return new List<ReservationGetDto>();
            }
        }

        private async Task<List<MessageGetDto>> GetMessages(int userId)
        {
            try
            {
                return await _httpClient.GetFromJsonAsync<List<MessageGetDto>>($"{BaseUrl}api/Messages/getbyuserid/{userId}") ?? new();
            }
            catch
            {
                return new List<MessageGetDto>();
            }
        }

        private AccountMenuPageViewModel BuildModelFromCookies()
        {
            var model = new AccountMenuPageViewModel();
            if (int.TryParse(Request.Cookies["rv_user_id"], out var userId))
            {
                model.UserId = userId;
            }

            model.FirstName = Request.Cookies["rv_user_first"] ?? string.Empty;
            model.LastName = Request.Cookies["rv_user_last"] ?? string.Empty;
            model.Email = Request.Cookies["rv_user_email"] ?? string.Empty;
            model.PhoneNumber = Request.Cookies["rv_user_phone"] ?? string.Empty;
            model.IsAdmin = bool.TryParse(Request.Cookies["rv_user_isadmin"], out var isAdmin) && isAdmin;

            return model;
        }

    }
}
