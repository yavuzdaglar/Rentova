using AutoMapper;
using AppTransmission = Rentova.Application.Dtos.TransmissionTypeDtos;
using UITransmission = Rentova.UI.Dtos.TransmissionTypeDtos;

namespace Rentova.UI.Mapping;

public class TransmissionTypeMapping : Profile
{
    public TransmissionTypeMapping()
    {
        CreateMap<AppTransmission.TransmissionTypeGetAllDto, UITransmission.TransmissionTypeGetAllDto>().ReverseMap();
    }
}
