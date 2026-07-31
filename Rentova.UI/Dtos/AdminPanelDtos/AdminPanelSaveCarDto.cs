namespace Rentova.UI.Dtos.AdminPanelDtos;

public class AdminPanelSaveCarDto
{
    public int? CarId { get; set; }
    public string? Model { get; set; }
    public string? Price { get; set; }
    public string? Image { get; set; }
    public int BrandId { get; set; }
    public int FuelTypeId { get; set; }
    public int TransmissionTypeId { get; set; }
    public int SeatCountId { get; set; }
    public int VehicleTypeId { get; set; }
    public bool MainScreen { get; set; }
    public bool PopularScreen1 { get; set; }
    public bool PopularScreen2 { get; set; }
}
