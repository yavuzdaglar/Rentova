using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Dtos.BrandDtos;
using Rentova.UI.Dtos.FuelTypeDtos;
using Rentova.UI.Dtos.SeatCountDtos;
using Rentova.UI.Dtos.TransmissionTypeDtos;
using Rentova.UI.Dtos.VehicleTypeDtos;
using Rentova.UI.Models;
using System.Net.Http.Json;

namespace Rentova.UI.ViewComponents.Product
{
    public class _ProductFiltersViewComponent : ViewComponent
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private const string BaseUrl = "http://localhost:5234/";

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = new ProductViewModel();
            try 
            {
                model.Brands = await _httpClient.GetFromJsonAsync<List<BrandGetAllDto>>($"{BaseUrl}api/Brands/getall") ?? new();
                model.VehicleTypes = await _httpClient.GetFromJsonAsync<List<VehicleTypeGetAllDto>>($"{BaseUrl}api/VehicleTypes/getall") ?? new();
                model.FuelTypes = await _httpClient.GetFromJsonAsync<List<FuelTypeGetAllDto>>($"{BaseUrl}api/FuelTypes/getall") ?? new();
                model.TransmissionTypes = await _httpClient.GetFromJsonAsync<List<TransmissionTypeGetAllDto>>($"{BaseUrl}api/TransmissionTypes/getall") ?? new();
                model.SeatCounts = await _httpClient.GetFromJsonAsync<List<SeatCountGetAllDto>>($"{BaseUrl}api/SeatCounts/getall") ?? new();
            }
            catch 
            {
                // Fallback to empty lists
            }
            return View(model);
        }
    }
}
