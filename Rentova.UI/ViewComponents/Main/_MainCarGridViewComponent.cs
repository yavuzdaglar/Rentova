using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.CarDtos;
using Rentova.UI.Models;
using System.Net.Http.Json;

namespace Rentova.UI.ViewComponents.Main;

public class _MainCarGridViewComponent : ViewComponent
{
    private readonly HttpClient _httpClient = new HttpClient();
    private const string BaseUrl = "http://localhost:5234/";

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var model = new CarGridViewModel();
        try 
        {
            var popular1 = await _httpClient.GetFromJsonAsync<List<CarPopularScreen1Dto>>($"{BaseUrl}api/Cars/popularscreen1");
            var popular2 = await _httpClient.GetFromJsonAsync<List<CarPopularScreen2Dto>>($"{BaseUrl}api/Cars/popularscreen2");
            
            model.PopularCars1 = popular1 ?? new();
            model.PopularCars2 = popular2 ?? new();
        }
        catch 
        {
            // Fallback to empty lists in model
        }
        return View(model);
    }
}
