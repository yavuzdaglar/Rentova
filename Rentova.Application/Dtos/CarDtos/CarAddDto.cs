// Araç Ekleme
namespace Rentova.Application.Dtos.CarDtos;

public class CarAddDto
{
    public string CarModel { get; set; } = string.Empty;
    public string CarImage { get; set; } = string.Empty;
    public decimal DailyPrice { get; set; }
    public int BrandId { get; set; }
    public int FuelTypeId { get; set; }
    public int TransmissionTypeId { get; set; }
    public int VehicleTypeId { get; set; }
    public int SeatCountId { get; set; }
    public bool MainScreen { get; set; } = false;
    public bool PopularScreen1 { get; set; } = false;
    public bool PopularScreen2 { get; set; } = false;
}
