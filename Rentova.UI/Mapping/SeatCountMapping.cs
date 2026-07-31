using AutoMapper;
using AppSeat = Rentova.Application.Dtos.SeatCountDtos;
using UISeat = Rentova.UI.Dtos.SeatCountDtos;

namespace Rentova.UI.Mapping;

public class SeatCountMapping : Profile
{
    public SeatCountMapping()
    {
        CreateMap<AppSeat.SeatCountGetAllDto, UISeat.SeatCountGetAllDto>().ReverseMap();
    }
}
