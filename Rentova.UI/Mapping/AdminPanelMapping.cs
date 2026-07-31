using AutoMapper;
using Rentova.UI.Dtos.AdminPanelDtos;
using Rentova.UI.Dtos.BrandDtos;
using Rentova.UI.Dtos.CarDtos;

namespace Rentova.UI.Mapping;

public class AdminPanelMapping : Profile
{
    public AdminPanelMapping()
    {
        CreateMap<AdminPanelSaveCarDto, CarAddDto>()
            .ForMember(dest => dest.CarModel, opt => opt.MapFrom(src => src.Model))
            .ForMember(dest => dest.CarImage, opt => opt.MapFrom(src => src.Image))
            .ForMember(dest => dest.DailyPrice, opt => opt.Ignore());

        CreateMap<AdminPanelSaveCarDto, CarUpdateDto>()
            .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.CarId ?? 0))
            .ForMember(dest => dest.CarModel, opt => opt.MapFrom(src => src.Model))
            .ForMember(dest => dest.CarImage, opt => opt.MapFrom(src => src.Image))
            .ForMember(dest => dest.DailyPrice, opt => opt.Ignore());

        CreateMap<AdminPanelAddBrandDto, BrandAddDto>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.BrandLogo));
    }
}
