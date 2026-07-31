using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.TransmissionTypeDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransmissionTypesController : ControllerBase
{
    private readonly ITransmissionTypeService _transmissionTypeService;

    public TransmissionTypesController(ITransmissionTypeService transmissionTypeService)
    {
        _transmissionTypeService = transmissionTypeService;
    }

    // Vites Türü Ekleme
    [HttpPost("add")]
    public async Task<IActionResult> Add(TransmissionTypeAddDto transmissionTypeAddDto)
    {
        await Task.Run(() => _transmissionTypeService.Add(transmissionTypeAddDto));
        return Ok("Vites türü başarıyla eklendi.");
    }

    // Vites Türü Güncelleme
    [HttpPut("update")]
    public async Task<IActionResult> Update(TransmissionTypeUpdateDto transmissionTypeUpdateDto)
    {
        await Task.Run(() => _transmissionTypeService.Update(transmissionTypeUpdateDto));
        return Ok("Vites türü başarıyla güncellendi.");
    }

    // Vites Türü Silme
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Task.Run(() => _transmissionTypeService.Delete(id));
        return Ok("Vites türü başarıyla silindi.");
    }

    // Vites Türü Tek Getirme
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var transmissionType = await Task.Run(() => _transmissionTypeService.GetById(id));
        if (transmissionType == null) return NotFound("Vites türü bulunamadı.");
        return Ok(transmissionType);
    }

    // Vites Türü Hepsini Listeleme
    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var transmissionTypes = await Task.Run(() => _transmissionTypeService.GetAll());
        return Ok(transmissionTypes);
    }
}
