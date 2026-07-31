using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.BrandDtos;
using System.Net.Http.Json;

namespace Rentova.UI.ViewComponents.Main;

public class _MainBrandsViewComponent : ViewComponent
{
    private readonly HttpClient _httpClient = new HttpClient();
    private const string BaseUrl = "http://localhost:5234/";

    public async Task<IViewComponentResult> InvokeAsync()
    {
        try 
        {
            var brands = await _httpClient.GetFromJsonAsync<List<BrandGetAllDto>>($"{BaseUrl}api/Brands/getall");
            return View(brands);
        }
        catch 
        {
            return View(new List<BrandGetAllDto>());
        }
    }
}
