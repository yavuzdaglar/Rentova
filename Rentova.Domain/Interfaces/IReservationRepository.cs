using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

public interface IReservationRepository
{
    List<Reservation> GetAll();
    Reservation? GetById(int id);
    void Add(Reservation reservation);
    void Update(Reservation reservation);
    void Delete(int id);
    List<Reservation> GetByUserId(int userId);
    List<Reservation> GetByCarId(int carId);
}
