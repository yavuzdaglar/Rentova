using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

public interface IAppUserRepository
{
    List<AppUser> GetAll();
    AppUser? GetById(int id);
    void Add(AppUser appUser);
    void Update(AppUser appUser);
    void Delete(int id);
    AppUser? GetByEmail(string email);
}
