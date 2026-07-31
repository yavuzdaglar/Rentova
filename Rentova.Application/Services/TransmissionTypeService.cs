using AutoMapper;
using Rentova.Application.Dtos.TransmissionTypeDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

// Vites Türü Servis
public class TransmissionTypeService : ITransmissionTypeService
{
    private readonly ITransmissionTypeRepository _transmissionTypeRepository;
    private readonly IMapper _mapper;

    public TransmissionTypeService(ITransmissionTypeRepository transmissionTypeRepository, IMapper mapper)
    {
        _transmissionTypeRepository = transmissionTypeRepository;
        _mapper = mapper;
    }

    public List<TransmissionTypeGetAllDto> GetAll()
    {
        var transmissionTypes = _transmissionTypeRepository.GetAll();
        return _mapper.Map<List<TransmissionTypeGetAllDto>>(transmissionTypes);
    }

    public TransmissionTypeGetDto? GetById(int id)
    {
        var transmissionType = _transmissionTypeRepository.GetById(id);
        if (transmissionType == null) return null;
        return _mapper.Map<TransmissionTypeGetDto>(transmissionType);
    }

    public void Add(TransmissionTypeAddDto transmissionTypeAddDto)
    {
        var transmissionType = _mapper.Map<TransmissionType>(transmissionTypeAddDto);
        _transmissionTypeRepository.Add(transmissionType);
    }

    public void Update(TransmissionTypeUpdateDto transmissionTypeUpdateDto)
    {
        var transmissionType = _mapper.Map<TransmissionType>(transmissionTypeUpdateDto);
        _transmissionTypeRepository.Update(transmissionType);
    }

    public void Delete(int id)
    {
        _transmissionTypeRepository.Delete(id);
    }
}
