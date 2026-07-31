using AutoMapper;
using AppCar = Rentova.Application.Dtos.CarDtos;
using UICar = Rentova.UI.Dtos.CarDtos;

namespace Rentova.UI.Mapping;

public class CarMapping : Profile
{
    public CarMapping()
    {
        CreateMap<AppCar.CarAddDto, UICar.CarAddDto>().ReverseMap();
        CreateMap<AppCar.CarUpdateDto, UICar.CarUpdateDto>().ReverseMap();
        CreateMap<AppCar.CarGetDto, UICar.CarGetDto>().ReverseMap();
        CreateMap<AppCar.CarGetAllDto, UICar.CarGetAllDto>().ReverseMap();
        CreateMap<AppCar.CarMainScreenDto, UICar.CarMainScreenDto>().ReverseMap();
        CreateMap<AppCar.CarPopularScreen1Dto, UICar.CarPopularScreen1Dto>().ReverseMap();
        CreateMap<AppCar.CarPopularScreen2Dto, UICar.CarPopularScreen2Dto>().ReverseMap();
        CreateMap<UICar.CarGetDto, UICar.CarUpdateDto>().ReverseMap();
    }
}
