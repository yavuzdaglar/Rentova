using Rentova.Application.Dtos.MessageDtos;

namespace Rentova.Application.Interfaces;

public interface IMessageService
{
    List<MessageGetDto> GetAll();
    MessageGetDto? GetById(int id);
    List<MessageGetDto> GetByUserId(int userId);
    void Add(MessageAddDto messageAddDto);
    void Update(MessageUpdateDto messageUpdateDto);
    void Delete(int id);
}
