using Rentova.Application.Dtos.SeatCountDtos;

namespace Rentova.Application.Interfaces;

// Koltuk Sayısı Servis Arayüzü
public interface ISeatCountService
{
    List<SeatCountGetAllDto> GetAll();
    SeatCountGetDto? GetById(int id);
    void Add(SeatCountAddDto seatCountAddDto);
    void Update(SeatCountUpdateDto seatCountUpdateDto);
    void Delete(int id);
}
