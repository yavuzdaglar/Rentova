using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.CarDtos;
using System.Net.Http.Json;

namespace Rentova.UI.ViewComponents.Main;

public class _MainHeroViewComponent : ViewComponent
{
    private readonly HttpClient _httpClient = new HttpClient();
    private const string BaseUrl = "http://localhost:5234/";

    public async Task<IViewComponentResult> InvokeAsync()
    {
        try 
        {
            var cars = await _httpClient.GetFromJsonAsync<List<CarMainScreenDto>>($"{BaseUrl}api/Cars/mainscreen");
            if (cars == null || !cars.Any()) return View();

            var random = new Random();
            var randomCar = cars[random.Next(cars.Count)];

            return View(randomCar);
        }
        catch 
        {
            return View();
        }
    }
}
