namespace Rentova.UI.Dtos.ReservationDtos;

public class ReservationAddDto
{
    public int AppUserId { get; set; }
    public int CarId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Price { get; set; }
}
