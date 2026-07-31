using AutoMapper;
using Rentova.Application.Dtos.BrandDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class BrandMapping : Profile
{
    public BrandMapping()
    {
        CreateMap<Brand, BrandGetDto>();
        CreateMap<Brand, BrandGetAllDto>();
        CreateMap<BrandAddDto, Brand>();
        CreateMap<BrandUpdateDto, Brand>();
    }
}
