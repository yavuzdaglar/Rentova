using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

public class AppUserRepository : IAppUserRepository
{
    private readonly RentovaDbContext _context;

    public AppUserRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public void Add(AppUser appUser)
    {
        _context.AppUsers.Add(appUser);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var user = _context.AppUsers.Find(id);
        if (user != null)
        {
            _context.AppUsers.Remove(user);
            _context.SaveChanges();
        }
    }

    public List<AppUser> GetAll()
    {
        return _context.AppUsers.ToList();
    }

    public AppUser? GetByEmail(string email)
    {
        return _context.AppUsers.FirstOrDefault(x => x.Email == email);
    }

    public AppUser? GetById(int id)
    {
        return _context.AppUsers.Find(id);
    }

    public void Update(AppUser appUser)
    {
        var existingUser = _context.AppUsers.FirstOrDefault(x => x.AppUserId == appUser.AppUserId);
        if (existingUser == null)
        {
            return;
        }

        _context.Entry(existingUser).CurrentValues.SetValues(appUser);
        _context.SaveChanges();
    }
}
