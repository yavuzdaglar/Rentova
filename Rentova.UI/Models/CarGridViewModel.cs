using Rentova.UI.Dtos.CarDtos;

namespace Rentova.UI.Models;

public class CarGridViewModel
{
    public List<CarPopularScreen1Dto> PopularCars1 { get; set; } = new();
    public List<CarPopularScreen2Dto> PopularCars2 { get; set; } = new();
}
