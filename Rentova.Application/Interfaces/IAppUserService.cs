using Rentova.Application.Dtos.AppUserDtos;

namespace Rentova.Application.Interfaces;

public interface IAppUserService
{
    List<AppUserGetDto> GetAll();
    AppUserGetDto? GetById(int id);
    void Add(AppUserAddDto appUserAddDto);
    void Update(AppUserUpdateDto appUserUpdateDto);
    void Delete(int id);
    AppUserGetDto? Login(string email, string password);
}
