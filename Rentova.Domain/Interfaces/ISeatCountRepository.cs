using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

// Koltuk Sayısı Repository Arayüzü
public interface ISeatCountRepository
{
    List<SeatCount> GetAll();
    SeatCount? GetById(int id);
    void Add(SeatCount seatCount);
    void Update(SeatCount seatCount);
    void Delete(int id);
}
