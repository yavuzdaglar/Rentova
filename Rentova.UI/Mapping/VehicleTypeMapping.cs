using AutoMapper;
using AppVehicle = Rentova.Application.Dtos.VehicleTypeDtos;
using UIVehicle = Rentova.UI.Dtos.VehicleTypeDtos;

namespace Rentova.UI.Mapping;

public class VehicleTypeMapping : Profile
{
    public VehicleTypeMapping()
    {
        CreateMap<AppVehicle.VehicleTypeGetAllDto, UIVehicle.VehicleTypeGetAllDto>().ReverseMap();
    }
}
