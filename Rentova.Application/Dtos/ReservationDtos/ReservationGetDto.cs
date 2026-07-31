namespace Rentova.Application.Dtos.ReservationDtos;

public class ReservationGetDto
{
    public int ReservationId { get; set; }
    public int AppUserId { get; set; }
    public string UserFullName { get; set; } = string.Empty;
    public int CarId { get; set; }
    public string CarModel { get; set; } = string.Empty;
    public string CarImage { get; set; } = string.Empty;
    public string BrandName { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public int TotalDays { get; set; }
    public decimal Price { get; set; }
}
