using AutoMapper;
using AppUser = Rentova.Application.Dtos.AppUserDtos;
using UIUser = Rentova.UI.Dtos.AppUserDtos;

namespace Rentova.UI.Mapping;

public class AppUserMapping : Profile
{
    public AppUserMapping()
    {
        CreateMap<AppUser.AppUserAddDto, UIUser.AppUserAddDto>().ReverseMap();
        CreateMap<AppUser.AppUserUpdateDto, UIUser.AppUserUpdateDto>().ReverseMap();
        CreateMap<AppUser.AppUserGetDto, UIUser.AppUserGetDto>().ReverseMap();

        CreateMap<AppUser.UserLoginDto, UIUser.UserLoginDto>().ReverseMap();
    }
}
