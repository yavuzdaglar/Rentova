using Rentova.UI.Dtos.BrandDtos;
using Rentova.UI.Dtos.CarDtos;
using Rentova.UI.Dtos.FuelTypeDtos;
using Rentova.UI.Dtos.SeatCountDtos;
using Rentova.UI.Dtos.TransmissionTypeDtos;
using Rentova.UI.Dtos.VehicleTypeDtos;

namespace Rentova.UI.Models;

public class ProductViewModel
{
    public List<BrandGetAllDto> Brands { get; set; } = new();
    public List<VehicleTypeGetAllDto> VehicleTypes { get; set; } = new();
    public List<FuelTypeGetAllDto> FuelTypes { get; set; } = new();
    public List<TransmissionTypeGetAllDto> TransmissionTypes { get; set; } = new();
    public List<SeatCountGetAllDto> SeatCounts { get; set; } = new();
}
