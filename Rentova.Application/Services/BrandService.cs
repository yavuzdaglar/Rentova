using AutoMapper;
using Rentova.Application.Dtos.BrandDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

// Marka Servis
public class BrandService : IBrandService
{
    private readonly IBrandRepository _brandRepository;
    private readonly IMapper _mapper;

    public BrandService(IBrandRepository brandRepository, IMapper mapper)
    {
        _brandRepository = brandRepository;
        _mapper = mapper;
    }

    public List<BrandGetAllDto> GetAll()
    {
        var brands = _brandRepository.GetAll();
        return _mapper.Map<List<BrandGetAllDto>>(brands);
    }

    public BrandGetDto? GetById(int id)
    {
        var brand = _brandRepository.GetById(id);
        if (brand == null) return null;
        return _mapper.Map<BrandGetDto>(brand);
    }

    public void Add(BrandAddDto brandAddDto)
    {
        var brand = _mapper.Map<Brand>(brandAddDto);
        _brandRepository.Add(brand);
    }

    public void Update(BrandUpdateDto brandUpdateDto)
    {
        var brand = _mapper.Map<Brand>(brandUpdateDto);
        _brandRepository.Update(brand);
    }

    public void Delete(int id)
    {
        _brandRepository.Delete(id);
    }
}
