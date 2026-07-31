using AutoMapper;
using Rentova.Application.Dtos.AppUserDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

public class AppUserService : IAppUserService
{
    private readonly IAppUserRepository _appUserRepository;
    private readonly IMapper _mapper;

    public AppUserService(IAppUserRepository appUserRepository, IMapper mapper)
    {
        _appUserRepository = appUserRepository;
        _mapper = mapper;
    }

    public void Add(AppUserAddDto appUserAddDto)
    {
        var appUser = _mapper.Map<AppUser>(appUserAddDto);
        _appUserRepository.Add(appUser);
    }

    public void Delete(int id)
    {
        _appUserRepository.Delete(id);
    }

    public List<AppUserGetDto> GetAll()
    {
        var users = _appUserRepository.GetAll();
        return _mapper.Map<List<AppUserGetDto>>(users);
    }

    public AppUserGetDto? GetById(int id)
    {
        var user = _appUserRepository.GetById(id);
        return _mapper.Map<AppUserGetDto>(user);
    }

    public AppUserGetDto? Login(string email, string password)
    {
        var user = _appUserRepository.GetByEmail(email);
        if (user != null && user.Password == password)
        {
            return _mapper.Map<AppUserGetDto>(user);
        }
        return null;
    }

    public void Update(AppUserUpdateDto appUserUpdateDto)
    {
        var existingUser = _appUserRepository.GetById(appUserUpdateDto.AppUserId);
        if (existingUser == null)
        {
            return;
        }

        var appUser = _mapper.Map<AppUser>(appUserUpdateDto);
        _appUserRepository.Update(appUser);
    }
}
