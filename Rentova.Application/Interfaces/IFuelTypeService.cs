using Rentova.Application.Dtos.FuelTypeDtos;

namespace Rentova.Application.Interfaces;

// Yakıt Türü Servis Arayüzü
public interface IFuelTypeService
{
    List<FuelTypeGetAllDto> GetAll();
    FuelTypeGetDto? GetById(int id);
    void Add(FuelTypeAddDto fuelTypeAddDto);
    void Update(FuelTypeUpdateDto fuelTypeUpdateDto);
    void Delete(int id);
}
