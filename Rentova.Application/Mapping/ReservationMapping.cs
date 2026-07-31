using AutoMapper;
using Rentova.Application.Dtos.ReservationDtos;
using Rentova.Entities;

namespace Rentova.Application.Mapping;

public class ReservationMapping : Profile
{
    public ReservationMapping()
    {
        // Entity -> DTO
        CreateMap<Reservation, ReservationGetDto>()
            .ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.AppUser.FirstName + " " + src.AppUser.LastName))
            .ForMember(dest => dest.CarModel, opt => opt.MapFrom(src => src.Car.CarModel))
            .ForMember(dest => dest.CarImage, opt => opt.MapFrom(src => src.Car.CarImage))
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Car.Brand.BrandName))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.TotalDays, opt => opt.MapFrom(src => Math.Max(0, (src.EndDate.Date - src.StartDate.Date).Days + 1)))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Car.DailyPrice * Math.Max(0, (src.EndDate.Date - src.StartDate.Date).Days + 1)));

        // DTO -> Entity
        CreateMap<ReservationAddDto, Reservation>();
        CreateMap<ReservationUpdateDto, Reservation>();
    }
}
