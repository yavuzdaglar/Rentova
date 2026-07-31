namespace Rentova.UI.Dtos.CarDtos;

public class CarGetDto
{
    public int CarId { get; set; }
    public string CarModel { get; set; } = string.Empty;
    public string CarImage { get; set; } = string.Empty;
    public decimal DailyPrice { get; set; }
    public int BrandId { get; set; }
    public string BrandName { get; set; } = string.Empty;
    public string BrandImageUrl { get; set; } = string.Empty;
    public int FuelTypeId { get; set; }
    public string FuelTypeName { get; set; } = string.Empty;
    public int TransmissionTypeId { get; set; }
    public string TransmissionTypeName { get; set; } = string.Empty;
    public int VehicleTypeId { get; set; }
    public string VehicleTypeName { get; set; } = string.Empty;
    public int SeatCountId { get; set; }
    public string SeatCountName { get; set; } = string.Empty;
    public bool MainScreen { get; set; }
    public bool PopularScreen1 { get; set; }
    public bool PopularScreen2 { get; set; }
}
