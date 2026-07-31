using AutoMapper;
using Rentova.Application.Dtos.VehicleTypeDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class VehicleTypeMapping : Profile
{
    public VehicleTypeMapping()
    {
        CreateMap<VehicleType, VehicleTypeGetDto>();
        CreateMap<VehicleType, VehicleTypeGetAllDto>();
        CreateMap<VehicleTypeAddDto, VehicleType>();
        CreateMap<VehicleTypeUpdateDto, VehicleType>();
    }
}
