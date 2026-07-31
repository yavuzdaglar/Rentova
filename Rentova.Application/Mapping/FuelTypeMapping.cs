using AutoMapper;
using Rentova.Application.Dtos.FuelTypeDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class FuelTypeMapping : Profile
{
    public FuelTypeMapping()
    {
        CreateMap<FuelType, FuelTypeGetDto>();
        CreateMap<FuelType, FuelTypeGetAllDto>();
        CreateMap<FuelTypeAddDto, FuelType>();
        CreateMap<FuelTypeUpdateDto, FuelType>();
    }
}
