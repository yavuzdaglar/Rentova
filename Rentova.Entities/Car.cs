// Araç
namespace Rentova.Entities;

public class Car
{
    public int CarId { get; set; }
    public string CarModel { get; set; } = string.Empty;
    public string CarImage { get; set; } = string.Empty;
    public decimal DailyPrice { get; set; }

    // Marka
    public int BrandId { get; set; }
    public Brand Brand { get; set; } = null!;

    // Yakıt Türü
    public int FuelTypeId { get; set; }
    public FuelType FuelType { get; set; } = null!;

    // Vites Türü
    public int TransmissionTypeId { get; set; }
    public TransmissionType TransmissionType { get; set; } = null!;

    // Araç Tipi
    public int VehicleTypeId { get; set; }
    public VehicleType VehicleType { get; set; } = null!;

    // Koltuk Sayısı
    public int SeatCountId { get; set; }
    public SeatCount SeatCount { get; set; } = null!;

    // Ekran Görünürlük
    public bool MainScreen { get; set; } = false;
    public bool PopularScreen1 { get; set; } = false;
    public bool PopularScreen2 { get; set; } = false;
}
