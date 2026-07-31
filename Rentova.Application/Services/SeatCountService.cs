using AutoMapper;
using Rentova.Application.Dtos.SeatCountDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

// Koltuk Sayısı Servis
public class SeatCountService : ISeatCountService
{
    private readonly ISeatCountRepository _seatCountRepository;
    private readonly IMapper _mapper;

    public SeatCountService(ISeatCountRepository seatCountRepository, IMapper mapper)
    {
        _seatCountRepository = seatCountRepository;
        _mapper = mapper;
    }

    public List<SeatCountGetAllDto> GetAll()
    {
        var seatCounts = _seatCountRepository.GetAll();
        return _mapper.Map<List<SeatCountGetAllDto>>(seatCounts);
    }

    public SeatCountGetDto? GetById(int id)
    {
        var seatCount = _seatCountRepository.GetById(id);
        if (seatCount == null) return null;
        return _mapper.Map<SeatCountGetDto>(seatCount);
    }

    public void Add(SeatCountAddDto seatCountAddDto)
    {
        var seatCount = _mapper.Map<SeatCount>(seatCountAddDto);
        _seatCountRepository.Add(seatCount);
    }

    public void Update(SeatCountUpdateDto seatCountUpdateDto)
    {
        var seatCount = _mapper.Map<SeatCount>(seatCountUpdateDto);
        _seatCountRepository.Update(seatCount);
    }

    public void Delete(int id)
    {
        _seatCountRepository.Delete(id);
    }
}
