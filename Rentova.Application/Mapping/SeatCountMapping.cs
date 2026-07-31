using AutoMapper;
using Rentova.Application.Dtos.SeatCountDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class SeatCountMapping : Profile
{
    public SeatCountMapping()
    {
        CreateMap<SeatCount, SeatCountGetDto>();
        CreateMap<SeatCount, SeatCountGetAllDto>();
        CreateMap<SeatCountAddDto, SeatCount>();
        CreateMap<SeatCountUpdateDto, SeatCount>();
    }
}
