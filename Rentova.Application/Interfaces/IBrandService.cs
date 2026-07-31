using Rentova.Application.Dtos.BrandDtos;

namespace Rentova.Application.Interfaces;

// Marka Servis Arayüzü
public interface IBrandService
{
    List<BrandGetAllDto> GetAll();
    BrandGetDto? GetById(int id);
    void Add(BrandAddDto brandAddDto);
    void Update(BrandUpdateDto brandUpdateDto);
    void Delete(int id);
}
