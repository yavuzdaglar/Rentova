using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.AppUserDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly IAppUserService _appUserService;

    public LoginController(IAppUserService appUserService)
    {
        _appUserService = appUserService;
    }

    [HttpGet("getall")]
    public IActionResult GetAll()
    {
        var values = _appUserService.GetAll();
        return Ok(values);
    }

    [HttpGet("getbyid/{id}")]
    public IActionResult GetById(int id)
    {
        var value = _appUserService.GetById(id);
        if (value == null)
            return NotFound("Kullanıcı bulunamadı.");
        return Ok(value);
    }

    [HttpPost("signup")]
    public IActionResult SignUp(AppUserAddDto appUserAddDto)
    {
        if (appUserAddDto == null || string.IsNullOrWhiteSpace(appUserAddDto.Email))
        {
            return BadRequest("Gecersiz kullanici verisi.");
        }

        var normalizedEmail = appUserAddDto.Email.Trim();
        var exists = _appUserService
            .GetAll()
            .Any(x => !string.IsNullOrWhiteSpace(x.Email)
                && x.Email.Equals(normalizedEmail, StringComparison.OrdinalIgnoreCase));

        if (exists)
        {
            return BadRequest("Bu e-posta adresi ile zaten bir hesap var.");
        }

        appUserAddDto.Email = normalizedEmail;
        _appUserService.Add(appUserAddDto);
        return Ok("Kullanıcı başarıyla kaydedildi.");
    }

    [HttpPost("login")]
    public IActionResult Login(UserLoginDto userLoginDto)
    {
        var value = _appUserService.Login(userLoginDto.Email, userLoginDto.Password);
        if (value == null)
            return Unauthorized("Geçersiz e-posta veya şifre.");
        return Ok(value);
    }

    [HttpPut("update")]
    public IActionResult Update(AppUserUpdateDto appUserUpdateDto)
    {
        _appUserService.Update(appUserUpdateDto);
        return Ok("Kullanıcı başarıyla güncellendi.");
    }

    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        _appUserService.Delete(id);
        return Ok("Kullanıcı başarıyla silindi.");
    }
}
