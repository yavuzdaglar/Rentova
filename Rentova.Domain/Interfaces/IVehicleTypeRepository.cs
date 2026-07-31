using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

// Araç Tipi Repository Arayüzü
public interface IVehicleTypeRepository
{
    List<VehicleType> GetAll();
    VehicleType? GetById(int id);
    void Add(VehicleType vehicleType);
    void Update(VehicleType vehicleType);
    void Delete(int id);
}
