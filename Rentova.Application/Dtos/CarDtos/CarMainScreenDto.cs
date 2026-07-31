// Ana Ekran Araçları
namespace Rentova.Application.Dtos.CarDtos;

public class CarMainScreenDto
{
    public int CarId { get; set; }
    public string CarModel { get; set; } = string.Empty;
    public string CarImage { get; set; } = string.Empty;
    public decimal DailyPrice { get; set; }
    public string BrandName { get; set; } = string.Empty;
    public string FuelTypeName { get; set; } = string.Empty;
    public string TransmissionTypeName { get; set; } = string.Empty;
    public string VehicleTypeName { get; set; } = string.Empty;
    public string SeatCountName { get; set; } = string.Empty;
}
