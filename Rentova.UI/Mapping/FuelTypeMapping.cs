using AutoMapper;
using AppFuel = Rentova.Application.Dtos.FuelTypeDtos;
using UIFuel = Rentova.UI.Dtos.FuelTypeDtos;

namespace Rentova.UI.Mapping;

public class FuelTypeMapping : Profile
{
    public FuelTypeMapping()
    {
        CreateMap<AppFuel.FuelTypeGetAllDto, UIFuel.FuelTypeGetAllDto>().ReverseMap();
    }
}
