using AutoMapper;
using AppMessage = Rentova.Application.Dtos.MessageDtos;
using UIMessage = Rentova.UI.Dtos.MessageDtos;

namespace Rentova.UI.Mapping;

public class MessageMapping : Profile
{
    public MessageMapping()
    {
        CreateMap<AppMessage.MessageAddDto, UIMessage.MessageAddDto>().ReverseMap();
        CreateMap<AppMessage.MessageUpdateDto, UIMessage.MessageUpdateDto>().ReverseMap();
        CreateMap<AppMessage.MessageGetDto, UIMessage.MessageGetDto>().ReverseMap();
    }
}
