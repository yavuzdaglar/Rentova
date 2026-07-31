using Microsoft.EntityFrameworkCore;
using Rentova.Application.Interfaces;
using Rentova.Application.Mapping;
using Rentova.Application.Services;
using Rentova.Domain.Interfaces;
using Rentova.Infrastructure.Context;
using Rentova.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5234");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", builder => {
        builder.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed((host) => true).AllowCredentials();
    });
});

// Database Context Registration
builder.Services.AddDbContext<RentovaDbContext>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(CarMapping).Assembly);

// Repository DI
builder.Services.AddScoped<ICarRepository, CarRepository>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();
builder.Services.AddScoped<IFuelTypeRepository, FuelTypeRepository>();
builder.Services.AddScoped<ITransmissionTypeRepository, TransmissionTypeRepository>();
builder.Services.AddScoped<IVehicleTypeRepository, VehicleTypeRepository>();
builder.Services.AddScoped<ISeatCountRepository, SeatCountRepository>();
builder.Services.AddScoped<IAppUserRepository, AppUserRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();

// Service DI
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<IFuelTypeService, FuelTypeService>();
builder.Services.AddScoped<ITransmissionTypeService, TransmissionTypeService>();
builder.Services.AddScoped<IVehicleTypeService, VehicleTypeService>();
builder.Services.AddScoped<ISeatCountService, SeatCountService>();
builder.Services.AddScoped<IAppUserService, AppUserService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IMessageService, MessageService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<RentovaDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
