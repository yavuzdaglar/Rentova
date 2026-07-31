using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.FuelTypeDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FuelTypesController : ControllerBase
{
    private readonly IFuelTypeService _fuelTypeService;

    public FuelTypesController(IFuelTypeService fuelTypeService)
    {
        _fuelTypeService = fuelTypeService;
    }

    // Yakıt Türü Ekleme
    [HttpPost("add")]
    public async Task<IActionResult> Add(FuelTypeAddDto fuelTypeAddDto)
    {
        await Task.Run(() => _fuelTypeService.Add(fuelTypeAddDto));
        return Ok("Yakıt türü başarıyla eklendi.");
    }

    // Yakıt Türü Güncelleme
    [HttpPut("update")]
    public async Task<IActionResult> Update(FuelTypeUpdateDto fuelTypeUpdateDto)
    {
        await Task.Run(() => _fuelTypeService.Update(fuelTypeUpdateDto));
        return Ok("Yakıt türü başarıyla güncellendi.");
    }

    // Yakıt Türü Silme
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Task.Run(() => _fuelTypeService.Delete(id));
        return Ok("Yakıt türü başarıyla silindi.");
    }

    // Yakıt Türü Tek Getirme
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var fuelType = await Task.Run(() => _fuelTypeService.GetById(id));
        if (fuelType == null) return NotFound("Yakıt türü bulunamadı.");
        return Ok(fuelType);
    }

    // Yakıt Türü Hepsini Listeleme
    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var fuelTypes = await Task.Run(() => _fuelTypeService.GetAll());
        return Ok(fuelTypes);
    }
}
