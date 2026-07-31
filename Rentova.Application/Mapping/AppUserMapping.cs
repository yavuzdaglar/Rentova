using AutoMapper;
using Rentova.Application.Dtos.AppUserDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class AppUserMapping : Profile
{
    public AppUserMapping()
    {
        CreateMap<AppUser, AppUserAddDto>().ReverseMap();
        CreateMap<AppUser, AppUserUpdateDto>().ReverseMap();
        CreateMap<AppUser, AppUserGetDto>().ReverseMap();
    }
}
