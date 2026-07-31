using Microsoft.AspNetCore.Mvc;
using Rentova.Application.Dtos.CarDtos;
using Rentova.Application.Interfaces;

namespace Rentova.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CarsController : ControllerBase
{
    private readonly ICarService _carService;

    public CarsController(ICarService carService)
    {
        _carService = carService;
    }

    // Araç Ekleme
    [HttpPost("add")]
    public async Task<IActionResult> Add(CarAddDto carAddDto)
    {
        await Task.Run(() => _carService.Add(carAddDto));
        return Ok("Araç başarıyla eklendi.");
    }

    // Araç Güncelleme
    [HttpPut("update")]
    public async Task<IActionResult> Update(CarUpdateDto carUpdateDto)
    {
        await Task.Run(() => _carService.Update(carUpdateDto));
        return Ok("Araç başarıyla güncellendi.");
    }

    // Araç Silme
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await Task.Run(() => _carService.Delete(id));
        return Ok("Araç başarıyla silindi.");
    }

    // Araç Tek Getirme
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var car = await Task.Run(() => _carService.GetById(id));
        if (car == null) return NotFound("Araç bulunamadı.");
        return Ok(car);
    }

    // Araç Hepsini Getirme
    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var cars = await Task.Run(() => _carService.GetAll());
        return Ok(cars);
    }

    // Ana Ekran Araçları
    [HttpGet("mainscreen")]
    public async Task<IActionResult> GetMainScreen()
    {
        var cars = await Task.Run(() => _carService.GetMainScreen());
        return Ok(cars);
    }

    // Popüler Ekran 1 Araçları
    [HttpGet("popularscreen1")]
    public async Task<IActionResult> GetPopularScreen1()
    {
        var cars = await Task.Run(() => _carService.GetPopularScreen1());
        return Ok(cars);
    }

    // Popüler Ekran 2 Araçları
    [HttpGet("popularscreen2")]
    public async Task<IActionResult> GetPopularScreen2()
    {
        var cars = await Task.Run(() => _carService.GetPopularScreen2());
        return Ok(cars);
    }
}
