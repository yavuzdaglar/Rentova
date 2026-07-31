using AutoMapper;
using Rentova.Application.Dtos.MessageDtos;
using Rentova.Application.Interfaces;
using Rentova.Domain.Interfaces;
using Rentova.Entities;

namespace Rentova.Application.Services;

public class MessageService : IMessageService
{
    private readonly IMessageRepository _messageRepository;
    private readonly IMapper _mapper;

    public MessageService(IMessageRepository messageRepository, IMapper mapper)
    {
        _messageRepository = messageRepository;
        _mapper = mapper;
    }

    public void Add(MessageAddDto messageAddDto)
    {
        var message = _mapper.Map<Message>(messageAddDto);
        message.Status = NormalizeStatus(messageAddDto.Status);
        message.CreatedDate = DateTime.Now;
        _messageRepository.Add(message);
    }

    public void Delete(int id)
    {
        _messageRepository.Delete(id);
    }

    public List<MessageGetDto> GetAll()
    {
        var messages = _messageRepository.GetAll();
        return _mapper.Map<List<MessageGetDto>>(messages);
    }

    public MessageGetDto? GetById(int id)
    {
        var message = _messageRepository.GetById(id);
        return _mapper.Map<MessageGetDto>(message);
    }

    public List<MessageGetDto> GetByUserId(int userId)
    {
        var messages = _messageRepository.GetByUserId(userId);
        return _mapper.Map<List<MessageGetDto>>(messages);
    }

    public void Update(MessageUpdateDto messageUpdateDto)
    {
        var message = _mapper.Map<Message>(messageUpdateDto);
        message.Status = NormalizeStatus(messageUpdateDto.Status);

        var currentMessage = _messageRepository.GetById(message.MessageId);
        if (currentMessage != null)
        {
            message.CreatedDate = currentMessage.CreatedDate;
            message.Reply = string.IsNullOrWhiteSpace(messageUpdateDto.Reply)
                ? currentMessage.Reply
                : messageUpdateDto.Reply.Trim();
        }

        _messageRepository.Update(message);
    }

    private static string NormalizeStatus(string? status)
    {
        var value = (status ?? string.Empty).Trim();
        if (string.Equals(value, "Cevaplandı", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(value, "Cevaplandi", StringComparison.OrdinalIgnoreCase))
        {
            return "Cevaplandı";
        }

        if (string.Equals(value, "Toksik", StringComparison.OrdinalIgnoreCase))
        {
            return "Toksik";
        }

        return "Cevap Bekleniyor";
    }
}
