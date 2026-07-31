using AutoMapper;
using AppBrand = Rentova.Application.Dtos.BrandDtos;
using UIBrand = Rentova.UI.Dtos.BrandDtos;

namespace Rentova.UI.Mapping;

public class BrandMapping : Profile
{
    public BrandMapping()
    {
        CreateMap<AppBrand.BrandAddDto, UIBrand.BrandAddDto>().ReverseMap();
        CreateMap<AppBrand.BrandGetAllDto, UIBrand.BrandGetAllDto>().ReverseMap();
    }
}
