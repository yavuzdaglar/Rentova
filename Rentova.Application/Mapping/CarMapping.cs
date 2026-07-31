using AutoMapper;
using Rentova.Application.Dtos.CarDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class CarMapping : Profile
{
    public CarMapping()
    {
        // Entity -> DTO
        CreateMap<Car, CarGetDto>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.BrandName))
            .ForMember(dest => dest.BrandImageUrl, opt => opt.MapFrom(src => src.Brand.ImageUrl))
            .ForMember(dest => dest.FuelTypeName, opt => opt.MapFrom(src => src.FuelType.FuelTypeName))
            .ForMember(dest => dest.TransmissionTypeName, opt => opt.MapFrom(src => src.TransmissionType.TransmissionTypeName))
            .ForMember(dest => dest.VehicleTypeName, opt => opt.MapFrom(src => src.VehicleType.VehicleTypeName))
            .ForMember(dest => dest.SeatCountName, opt => opt.MapFrom(src => src.SeatCount.SeatCountName));

        CreateMap<Car, CarGetAllDto>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.BrandName))
            .ForMember(dest => dest.FuelTypeName, opt => opt.MapFrom(src => src.FuelType.FuelTypeName))
            .ForMember(dest => dest.TransmissionTypeName, opt => opt.MapFrom(src => src.TransmissionType.TransmissionTypeName))
            .ForMember(dest => dest.VehicleTypeName, opt => opt.MapFrom(src => src.VehicleType.VehicleTypeName))
            .ForMember(dest => dest.SeatCountName, opt => opt.MapFrom(src => src.SeatCount.SeatCountName));

        CreateMap<Car, CarMainScreenDto>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.BrandName))
            .ForMember(dest => dest.FuelTypeName, opt => opt.MapFrom(src => src.FuelType.FuelTypeName))
            .ForMember(dest => dest.TransmissionTypeName, opt => opt.MapFrom(src => src.TransmissionType.TransmissionTypeName))
            .ForMember(dest => dest.VehicleTypeName, opt => opt.MapFrom(src => src.VehicleType.VehicleTypeName))
            .ForMember(dest => dest.SeatCountName, opt => opt.MapFrom(src => src.SeatCount.SeatCountName));

        CreateMap<Car, CarPopularScreen1Dto>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.BrandName))
            .ForMember(dest => dest.FuelTypeName, opt => opt.MapFrom(src => src.FuelType.FuelTypeName))
            .ForMember(dest => dest.TransmissionTypeName, opt => opt.MapFrom(src => src.TransmissionType.TransmissionTypeName))
            .ForMember(dest => dest.VehicleTypeName, opt => opt.MapFrom(src => src.VehicleType.VehicleTypeName))
            .ForMember(dest => dest.SeatCountName, opt => opt.MapFrom(src => src.SeatCount.SeatCountName));

        CreateMap<Car, CarPopularScreen2Dto>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.BrandName))
            .ForMember(dest => dest.FuelTypeName, opt => opt.MapFrom(src => src.FuelType.FuelTypeName))
            .ForMember(dest => dest.TransmissionTypeName, opt => opt.MapFrom(src => src.TransmissionType.TransmissionTypeName))
            .ForMember(dest => dest.VehicleTypeName, opt => opt.MapFrom(src => src.VehicleType.VehicleTypeName))
            .ForMember(dest => dest.SeatCountName, opt => opt.MapFrom(src => src.SeatCount.SeatCountName));

        // DTO -> Entity
        CreateMap<CarAddDto, Car>();
        CreateMap<CarUpdateDto, Car>();
    }
}
