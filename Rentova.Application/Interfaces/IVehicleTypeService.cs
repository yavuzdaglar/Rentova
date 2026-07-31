using Rentova.Application.Dtos.VehicleTypeDtos;

namespace Rentova.Application.Interfaces;

// Araç Tipi Servis Arayüzü
public interface IVehicleTypeService
{
    List<VehicleTypeGetAllDto> GetAll();
    VehicleTypeGetDto? GetById(int id);
    void Add(VehicleTypeAddDto vehicleTypeAddDto);
    void Update(VehicleTypeUpdateDto vehicleTypeUpdateDto);
    void Delete(int id);
}
