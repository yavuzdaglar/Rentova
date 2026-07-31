using Rentova.Application.Dtos.TransmissionTypeDtos;

namespace Rentova.Application.Interfaces;

// Vites Türü Servis Arayüzü
public interface ITransmissionTypeService
{
    List<TransmissionTypeGetAllDto> GetAll();
    TransmissionTypeGetDto? GetById(int id);
    void Add(TransmissionTypeAddDto transmissionTypeAddDto);
    void Update(TransmissionTypeUpdateDto transmissionTypeUpdateDto);
    void Delete(int id);
}
