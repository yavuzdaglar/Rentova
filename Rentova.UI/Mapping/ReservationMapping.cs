using AutoMapper;
using AppReservation = Rentova.Application.Dtos.ReservationDtos;
using UIReservation = Rentova.UI.Dtos.ReservationDtos;

namespace Rentova.UI.Mapping;

public class ReservationMapping : Profile
{
    public ReservationMapping()
    {
        CreateMap<AppReservation.ReservationAddDto, UIReservation.ReservationAddDto>().ReverseMap();
        CreateMap<AppReservation.ReservationUpdateDto, UIReservation.ReservationUpdateDto>().ReverseMap();
        CreateMap<AppReservation.ReservationGetDto, UIReservation.ReservationGetDto>().ReverseMap();
    }
}
