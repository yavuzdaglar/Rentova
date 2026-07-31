using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.BrandDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BrandsController : ControllerBase
{
    private readonly IBrandService _brandService;

    public BrandsController(IBrandService brandService)
    {
        _brandService = brandService;
    }

    // Marka Ekleme
    [HttpPost("add")]
    public async Task<IActionResult> Add(BrandAddDto brandAddDto)
    {
        await Task.Run(() => _brandService.Add(brandAddDto));
        return Ok("Marka başarıyla eklendi.");
    }

    // Marka Güncelleme
    [HttpPut("update")]
    public async Task<IActionResult> Update(BrandUpdateDto brandUpdateDto)
    {
        await Task.Run(() => _brandService.Update(brandUpdateDto));
        return Ok("Marka başarıyla güncellendi.");
    }

    // Marka Silme
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Task.Run(() => _brandService.Delete(id));
        return Ok("Marka başarıyla silindi.");
    }

    // Marka Tek Getirme
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var brand = await Task.Run(() => _brandService.GetById(id));
        if (brand == null) return NotFound("Marka bulunamadı.");
        return Ok(brand);
    }

    // Marka Hepsini Listeleme
    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var brands = await Task.Run(() => _brandService.GetAll());
        return Ok(brands);
    }
}
