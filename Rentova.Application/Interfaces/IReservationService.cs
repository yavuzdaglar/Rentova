using Rentova.Application.Dtos.ReservationDtos;

namespace Rentova.Application.Interfaces;

public interface IReservationService
{
    List<ReservationGetDto> GetAll();
    ReservationGetDto? GetById(int id);
    void Add(ReservationAddDto reservationAddDto);
    void Update(ReservationUpdateDto reservationUpdateDto);
    void Delete(int id);
    List<ReservationGetDto> GetByUserId(int userId);
    List<ReservationGetDto> GetByCarId(int carId);
}
