using Microsoft.EntityFrameworkCore;
using Rentova.Domain.Interfaces;
using Rentova.Entities;
using Rentova.Infrastructure.Context;

namespace Rentova.Infrastructure.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly RentovaDbContext _context;

    public MessageRepository(RentovaDbContext context)
    {
        _context = context;
    }

    public void Add(Message message)
    {
        _context.Messages.Add(message);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var message = _context.Messages.Find(id);
        if (message != null)
        {
            _context.Messages.Remove(message);
            _context.SaveChanges();
        }
    }

    public List<Message> GetAll()
    {
        return _context.Messages
            .Include(x => x.AppUser)
            .OrderByDescending(x => x.CreatedDate)
            .ToList();
    }

    public Message? GetById(int id)
    {
        return _context.Messages
            .Include(x => x.AppUser)
            .FirstOrDefault(x => x.MessageId == id);
    }

    public List<Message> GetByUserId(int userId)
    {
        return _context.Messages
            .Include(x => x.AppUser)
            .Where(x => x.AppUserId == userId)
            .OrderByDescending(x => x.CreatedDate)
            .ToList();
    }

    public void Update(Message message)
    {
        var existingMessage = _context.Messages.FirstOrDefault(x => x.MessageId == message.MessageId);
        if (existingMessage == null)
        {
            return;
        }

        _context.Entry(existingMessage).CurrentValues.SetValues(message);
        _context.SaveChanges();
    }
}
