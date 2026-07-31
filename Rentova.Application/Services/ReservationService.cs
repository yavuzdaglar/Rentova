using AutoMapper;
using Rentova.Application.Dtos.ReservationDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

public class ReservationService : IReservationService
{
    private readonly IReservationRepository _reservationRepository;
    private readonly IMapper _mapper;

    public ReservationService(IReservationRepository reservationRepository, IMapper mapper)
    {
        _reservationRepository = reservationRepository;
        _mapper = mapper;
    }

    public void Add(ReservationAddDto reservationAddDto)
    {
        var reservation = _mapper.Map<Reservation>(reservationAddDto);
        _reservationRepository.Add(reservation);
    }

    public void Delete(int id)
    {
        _reservationRepository.Delete(id);
    }

    public List<ReservationGetDto> GetAll()
    {
        var reservations = _reservationRepository.GetAll();
        return _mapper.Map<List<ReservationGetDto>>(reservations);
    }

    public List<ReservationGetDto> GetByCarId(int carId)
    {
        var reservations = _reservationRepository.GetByCarId(carId);
        return _mapper.Map<List<ReservationGetDto>>(reservations);
    }

    public ReservationGetDto? GetById(int id)
    {
        var reservation = _reservationRepository.GetById(id);
        return _mapper.Map<ReservationGetDto>(reservation);
    }

    public List<ReservationGetDto> GetByUserId(int userId)
    {
        var reservations = _reservationRepository.GetByUserId(userId);
        return _mapper.Map<List<ReservationGetDto>>(reservations);
    }

    public void Update(ReservationUpdateDto reservationUpdateDto)
    {
        var reservation = _mapper.Map<Reservation>(reservationUpdateDto);
        _reservationRepository.Update(reservation);
    }
}
