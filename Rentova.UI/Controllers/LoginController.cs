using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.AppUserDtos;
using System.Net.Http.Json;

namespace Rentova.UI.Controllers;

public class LoginController : Controller
{
    private readonly HttpClient _httpClient = new HttpClient();
    private const string BaseUrl = "http://localhost:5234/";

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> UserLogin([FromBody] UserLoginDto loginDto)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}api/Login/login", loginDto);
            if (response.IsSuccessStatusCode)
            {
                var user = await response.Content.ReadFromJsonAsync<AppUserGetDto>();
                if (user != null)
                {
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.Lax,
                        Expires = DateTimeOffset.UtcNow.AddDays(7)
                    };

                    Response.Cookies.Append("rv_user_id", user.AppUserId.ToString(), cookieOptions);
                    Response.Cookies.Append("rv_user_first", user.FirstName ?? string.Empty, cookieOptions);
                    Response.Cookies.Append("rv_user_last", user.LastName ?? string.Empty, cookieOptions);
                    Response.Cookies.Append("rv_user_email", user.Email ?? string.Empty, cookieOptions);
                    Response.Cookies.Append("rv_user_phone", user.PhoneNumber ?? string.Empty, cookieOptions);
                    Response.Cookies.Append("rv_user_isadmin", user.IsAdmin.ToString(), cookieOptions);
                }

                return Ok(user);
            }
            var error = await response.Content.ReadAsStringAsync();
            return BadRequest(error);
        }
        catch
        {
            return StatusCode(500, "Sunucuya bağlanılamadı.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> UserSignUp([FromBody] AppUserAddDto signUpDto)
    {
        try
        {
            signUpDto.IsAdmin = false;
            var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}api/Login/signup", signUpDto);
            if (response.IsSuccessStatusCode)
            {
                return Ok("Kayıt başarılı");
            }
            var error = await response.Content.ReadAsStringAsync();
            return BadRequest(error);
        }
        catch
        {
            return StatusCode(500, "Sunucuya bağlanılamadı.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> UpdateUser(AppUserUpdateDto appUserUpdateDto)
    {
        if (appUserUpdateDto == null)
        {
            TempData["AccountProfileFeedback"] = "Guncelleme verisi gecersiz.";
            TempData["AccountProfileFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu");
        }

        if (appUserUpdateDto.AppUserId <= 0 && int.TryParse(Request.Cookies["rv_user_id"], out var cookieUserId))
        {
            appUserUpdateDto.AppUserId = cookieUserId;
        }

        if (appUserUpdateDto.AppUserId <= 0)
        {
            TempData["AccountProfileFeedback"] = "Kullanici bilgisi bulunamadi.";
            TempData["AccountProfileFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu");
        }

        if (string.IsNullOrWhiteSpace(appUserUpdateDto.FirstName) ||
            string.IsNullOrWhiteSpace(appUserUpdateDto.LastName) ||
            string.IsNullOrWhiteSpace(appUserUpdateDto.Email))
        {
            TempData["AccountProfileFeedback"] = "Ad, soyad ve e-posta zorunludur.";
            TempData["AccountProfileFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu");
        }

        try
        {
            var currentUser = await _httpClient.GetFromJsonAsync<AppUserGetDto>($"{BaseUrl}api/Login/getbyid/{appUserUpdateDto.AppUserId}");

            if (string.IsNullOrWhiteSpace(appUserUpdateDto.Password))
            {
                appUserUpdateDto.Password = currentUser?.Password ?? string.Empty;
            }

            appUserUpdateDto.IsAdmin = currentUser?.IsAdmin ?? false;

            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}api/Login/update", appUserUpdateDto);
            if (!response.IsSuccessStatusCode)
            {
                TempData["AccountProfileFeedback"] = "Hesap guncelleme basarisiz oldu.";
                TempData["AccountProfileFeedbackType"] = "error";
                return RedirectToAction("Index", "AccountMenu");
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("rv_user_id", appUserUpdateDto.AppUserId.ToString(), cookieOptions);
            Response.Cookies.Append("rv_user_first", appUserUpdateDto.FirstName ?? string.Empty, cookieOptions);
            Response.Cookies.Append("rv_user_last", appUserUpdateDto.LastName ?? string.Empty, cookieOptions);
            Response.Cookies.Append("rv_user_email", appUserUpdateDto.Email ?? string.Empty, cookieOptions);
            Response.Cookies.Append("rv_user_phone", appUserUpdateDto.PhoneNumber ?? string.Empty, cookieOptions);
            Response.Cookies.Append("rv_user_isadmin", appUserUpdateDto.IsAdmin.ToString(), cookieOptions);

            TempData["AccountProfileFeedback"] = "Hesap bilgileri guncellendi.";
            TempData["AccountProfileFeedbackType"] = "success";
            return RedirectToAction("Index", "AccountMenu");
        }
        catch
        {
            TempData["AccountProfileFeedback"] = "Sunucuya baglanilamadi.";
            TempData["AccountProfileFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu");
        }
    }

    [HttpPost]
    public async Task<IActionResult> ChangePassword(int appUserId, string? currentPassword, string? newPassword, string? confirmNewPassword)
    {
        if (appUserId <= 0 && int.TryParse(Request.Cookies["rv_user_id"], out var cookieUserId))
        {
            appUserId = cookieUserId;
        }

        if (appUserId <= 0)
        {
            TempData["AccountPasswordFeedback"] = "Kullanici bilgisi bulunamadi.";
            TempData["AccountPasswordFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
        }

        if (string.IsNullOrWhiteSpace(currentPassword) || string.IsNullOrWhiteSpace(newPassword) || string.IsNullOrWhiteSpace(confirmNewPassword))
        {
            TempData["AccountPasswordFeedback"] = "Tum sifre alanlari zorunludur.";
            TempData["AccountPasswordFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
        }

        if (!string.Equals(newPassword, confirmNewPassword, StringComparison.Ordinal))
        {
            TempData["AccountPasswordFeedback"] = "Yeni sifre ve tekrar sifresi eslesmiyor.";
            TempData["AccountPasswordFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
        }

        try
        {
            var currentUser = await _httpClient.GetFromJsonAsync<AppUserGetDto>($"{BaseUrl}api/Login/getbyid/{appUserId}");
            if (currentUser == null)
            {
                TempData["AccountPasswordFeedback"] = "Kullanici bulunamadi.";
                TempData["AccountPasswordFeedbackType"] = "error";
                return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
            }

            if (!string.Equals(currentUser.Password, currentPassword, StringComparison.Ordinal))
            {
                TempData["AccountPasswordFeedback"] = "Mevcut sifre yanlis.";
                TempData["AccountPasswordFeedbackType"] = "error";
                return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
            }

            var updateDto = new AppUserUpdateDto
            {
                AppUserId = currentUser.AppUserId,
                FirstName = currentUser.FirstName,
                LastName = currentUser.LastName,
                PhoneNumber = currentUser.PhoneNumber,
                Email = currentUser.Email,
                Password = newPassword,
                IsAdmin = currentUser.IsAdmin
            };

            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}api/Login/update", updateDto);
            if (!response.IsSuccessStatusCode)
            {
                TempData["AccountPasswordFeedback"] = "Sifre guncellenemedi.";
                TempData["AccountPasswordFeedbackType"] = "error";
                return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
            }

            TempData["AccountPasswordFeedback"] = "Sifre basariyla guncellendi.";
            TempData["AccountPasswordFeedbackType"] = "success";
            return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
        }
        catch
        {
            TempData["AccountPasswordFeedback"] = "Sunucuya baglanilamadi.";
            TempData["AccountPasswordFeedbackType"] = "error";
            return RedirectToAction("Index", "AccountMenu", new { tab = "settings" });
        }
    }

    [HttpGet]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("rv_user_id");
        Response.Cookies.Delete("rv_user_first");
        Response.Cookies.Delete("rv_user_last");
        Response.Cookies.Delete("rv_user_email");
        Response.Cookies.Delete("rv_user_phone");
        Response.Cookies.Delete("rv_user_isadmin");

        return RedirectToAction(nameof(Index));
    }
}
