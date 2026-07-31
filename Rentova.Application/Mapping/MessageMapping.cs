using AutoMapper;
using Rentova.Application.Dtos.MessageDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class MessageMapping : Profile
{
    public MessageMapping()
    {
        CreateMap<Message, MessageGetDto>()
            .ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.AppUser.FirstName + " " + src.AppUser.LastName));

        CreateMap<Message, MessageAddDto>().ReverseMap();
        CreateMap<Message, MessageUpdateDto>().ReverseMap();
    }
}
