using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.VehicleTypeDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VehicleTypesController : ControllerBase
{
    private readonly IVehicleTypeService _vehicleTypeService;

    public VehicleTypesController(IVehicleTypeService vehicleTypeService)
    {
        _vehicleTypeService = vehicleTypeService;
    }

    // Araç Tipi Ekleme
    [HttpPost("add")]
    public async Task<IActionResult> Add(VehicleTypeAddDto vehicleTypeAddDto)
    {
        await Task.Run(() => _vehicleTypeService.Add(vehicleTypeAddDto));
        return Ok("Araç tipi başarıyla eklendi.");
    }

    // Araç Tipi Güncelleme
    [HttpPut("update")]
    public async Task<IActionResult> Update(VehicleTypeUpdateDto vehicleTypeUpdateDto)
    {
        await Task.Run(() => _vehicleTypeService.Update(vehicleTypeUpdateDto));
        return Ok("Araç tipi başarıyla güncellendi.");
    }

    // Araç Tipi Silme
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Task.Run(() => _vehicleTypeService.Delete(id));
        return Ok("Araç tipi başarıyla silindi.");
    }

    // Araç Tipi Tek Getirme
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var vehicleType = await Task.Run(() => _vehicleTypeService.GetById(id));
        if (vehicleType == null) return NotFound("Araç tipi bulunamadı.");
        return Ok(vehicleType);
    }

    // Araç Tipi Hepsini Listeleme
    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var vehicleTypes = await Task.Run(() => _vehicleTypeService.GetAll());
        return Ok(vehicleTypes);
    }
}
