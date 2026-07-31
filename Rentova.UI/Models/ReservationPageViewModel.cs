using Rentova.UI.Dtos.CarDtos;
using Rentova.UI.Dtos.ReservationDtos;

namespace Rentova.UI.Models;

public class ReservationPageViewModel
{
    public CarGetDto? Car { get; set; }
    public List<ReservationGetDto> Reservations { get; set; } = new();
}
