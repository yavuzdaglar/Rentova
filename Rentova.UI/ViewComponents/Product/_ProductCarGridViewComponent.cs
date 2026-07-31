using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.CarDtos;
using System.Net.Http.Json;

namespace Rentova.UI.ViewComponents.Product
{
    public class _ProductCarGridViewComponent : ViewComponent
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private const string BaseUrl = "http://localhost:5234/";

        public async Task<IViewComponentResult> InvokeAsync()
        {
            List<CarGetAllDto> cars = new();
            try 
            {
                cars = await _httpClient.GetFromJsonAsync<List<CarGetAllDto>>($"{BaseUrl}api/Cars/getall") ?? new();
            }
            catch 
            {
                // Fallback to empty list
            }
            return View(cars);
        }
    }
}
