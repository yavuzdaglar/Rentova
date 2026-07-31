using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

// Vites Türü Repository Arayüzü
public interface ITransmissionTypeRepository
{
    List<TransmissionType> GetAll();
    TransmissionType? GetById(int id);
    void Add(TransmissionType transmissionType);
    void Update(TransmissionType transmissionType);
    void Delete(int id);
}
