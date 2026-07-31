using Rentova.Entities;

namespace Rentova.Domain.Interfaces;

public interface IMessageRepository
{
    List<Message> GetAll();
    Message? GetById(int id);
    List<Message> GetByUserId(int userId);
    void Add(Message message);
    void Update(Message message);
    void Delete(int id);
}
