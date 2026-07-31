using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.ReservationDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationController(IReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    [HttpGet("getall")]
    public IActionResult GetAll()
    {
        var values = _reservationService.GetAll();
        return Ok(values);
    }

    [HttpGet("getbyid/{id}")]
    public IActionResult GetById(int id)
    {
        var value = _reservationService.GetById(id);
        if (value == null)
            return NotFound("Rezervasyon bulunamadı.");
        return Ok(value);
    }

    [HttpGet("getbyuserid/{userId}")]
    public IActionResult GetByUserId(int userId)
    {
        var values = _reservationService.GetByUserId(userId);
        return Ok(values);
    }

    [HttpGet("getbycarid/{carId}")]
    public IActionResult GetByCarId(int carId)
    {
        var values = _reservationService.GetByCarId(carId);
        return Ok(values);
    }

    [HttpPost("add")]
    public IActionResult Add(ReservationAddDto reservationAddDto)
    {
        if (reservationAddDto.StartDate > reservationAddDto.EndDate)
            return BadRequest("Başlangıç tarihi bitiş tarihinden sonra olamaz.");

        try
        {
            _reservationService.Add(reservationAddDto);
            return Ok("Rezervasyon başarıyla oluşturuldu.");
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
    }

    [HttpPut("update")]
    public IActionResult Update(ReservationUpdateDto reservationUpdateDto)
    {
        if (reservationUpdateDto.StartDate > reservationUpdateDto.EndDate)
            return BadRequest("Başlangıç tarihi bitiş tarihinden sonra olamaz.");

        try
        {
            _reservationService.Update(reservationUpdateDto);
            return Ok("Rezervasyon başarıyla güncellendi.");
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
    }

    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        _reservationService.Delete(id);
        return Ok("Rezervasyon başarıyla silindi.");
    }
}
