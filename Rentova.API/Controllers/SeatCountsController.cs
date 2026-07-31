using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.SeatCountDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeatCountsController : ControllerBase
{
    private readonly ISeatCountService _seatCountService;

    public SeatCountsController(ISeatCountService seatCountService)
    {
        _seatCountService = seatCountService;
    }

    // Koltuk Sayısı Ekleme
    [HttpPost("add")]
    public async Task<IActionResult> Add(SeatCountAddDto seatCountAddDto)
    {
        await Task.Run(() => _seatCountService.Add(seatCountAddDto));
        return Ok("Koltuk sayısı başarıyla eklendi.");
    }

    // Koltuk Sayısı Güncelleme
    [HttpPut("update")]
    public async Task<IActionResult> Update(SeatCountUpdateDto seatCountUpdateDto)
    {
        await Task.Run(() => _seatCountService.Update(seatCountUpdateDto));
        return Ok("Koltuk sayısı başarıyla güncellendi.");
    }

    // Koltuk Sayısı Silme
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Task.Run(() => _seatCountService.Delete(id));
        return Ok("Koltuk sayısı başarıyla silindi.");
    }

    // Koltuk Sayısı Tek Getirme
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var seatCount = await Task.Run(() => _seatCountService.GetById(id));
        if (seatCount == null) return NotFound("Koltuk sayısı bulunamadı.");
        return Ok(seatCount);
    }

    // Koltuk Sayısı Hepsini Listeleme
    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var seatCounts = await Task.Run(() => _seatCountService.GetAll());
        return Ok(seatCounts);
    }
}
