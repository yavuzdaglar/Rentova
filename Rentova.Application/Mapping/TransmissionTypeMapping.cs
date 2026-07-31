using AutoMapper;
using Rentova.Application.Dtos.TransmissionTypeDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class TransmissionTypeMapping : Profile
{
    public TransmissionTypeMapping()
    {
        CreateMap<TransmissionType, TransmissionTypeGetDto>();
        CreateMap<TransmissionType, TransmissionTypeGetAllDto>();
        CreateMap<TransmissionTypeAddDto, TransmissionType>();
        CreateMap<TransmissionTypeUpdateDto, TransmissionType>();
    }
}
