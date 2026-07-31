using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Rentova.UI.Dtos.AdminPanelDtos;
using Rentova.UI.Dtos.AppUserDtos;
using Rentova.UI.Dtos.BrandDtos;
using Rentova.UI.Dtos.CarDtos;
using Rentova.UI.Dtos.MessageDtos;
using Rentova.UI.Dtos.ReservationDtos;
using Rentova.UI.Dtos.SeatCountDtos;
using Rentova.UI.Dtos.FuelTypeDtos;
using Rentova.UI.Dtos.TransmissionTypeDtos;
using Rentova.UI.Dtos.VehicleTypeDtos;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Globalization;
using System.Net.Http.Json;

namespace Rentova.UI.Controllers
{
    public class AdminController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private const string BaseUrl = "http://localhost:5234/";

        public AdminController(IMapper mapper, IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<IActionResult> AdminPanel(
            string? tab = "overview",
            string? carFilter = null,
            string? carFilterSearch = null,
            string? bookingStatus = "all",
            string? search = null,
            int page = 1,
            string? filter = "all",
            int msgPage = 1,
            string? messageSearch = null,
            int messageId = 0,
            int carId = 0,
            string? adminSearch = null,
            int adminPage = 1,
            string? bookingSearch = null,
            int bookingPage = 1,
            int? selectedCalendarCar = null,
            int? selectedReservationId = null,
            string? calendarSearch = null,
            int calendarPage = 1,
            int? currentMonth = null,
            int? currentYear = null)
        {
            var trCulture = new CultureInfo("tr-TR");
            var today = DateTime.Today;

            var carsTask = GetListAsync<CarGetAllDto>("api/Cars/getall");
            var reservationsTask = GetListAsync<ReservationGetDto>("api/Reservation/getall");
            var messagesTask = GetListAsync<MessageGetDto>("api/Messages/getall");
            var usersTask = GetListAsync<AppUserGetDto>("api/Login/getall");
            var brandsTask = GetListAsync<BrandGetAllDto>("api/Brands/getall");
            var fuelTypesTask = GetListAsync<FuelTypeGetAllDto>("api/FuelTypes/getall");
            var transmissionTypesTask = GetListAsync<TransmissionTypeGetAllDto>("api/TransmissionTypes/getall");
            var seatCountsTask = GetListAsync<SeatCountGetAllDto>("api/SeatCounts/getall");
            var vehicleTypesTask = GetListAsync<VehicleTypeGetAllDto>("api/VehicleTypes/getall");

            await Task.WhenAll(
                carsTask,
                reservationsTask,
                messagesTask,
                usersTask,
                brandsTask,
                fuelTypesTask,
                transmissionTypesTask,
                seatCountsTask,
                vehicleTypesTask);

            var cars = carsTask.Result;
            var reservations = reservationsTask.Result;
            var messages = messagesTask.Result;
            var users = usersTask.Result;
            var brands = brandsTask.Result;
            var fuelTypes = fuelTypesTask.Result;
            var transmissionTypes = transmissionTypesTask.Result;
            var seatCounts = seatCountsTask.Result;
            var vehicleTypes = vehicleTypesTask.Result;

            var userMap = users.ToDictionary(x => x.AppUserId, x => x);
            var carMap = cars.ToDictionary(x => x.CarId, x => x);

            var fleet = cars.Select(car => new
            {
                id = car.CarId,
                brand = car.BrandName,
                model = car.CarModel,
                plate = $"ARAC-{car.CarId:D3}",
                fuel = car.FuelTypeName,
                transmission = car.TransmissionTypeName,
                vehicleType = car.VehicleTypeName,
                price = $"{car.DailyPrice:N0} TL",
                seats = ParseSeatCount(car.SeatCountName),
                image = car.CarImage,
                mainScreen = car.MainScreen,
                popularScreen1 = car.PopularScreen1,
                popularScreen2 = car.PopularScreen2,
                brandId = car.BrandId,
                fuelTypeId = car.FuelTypeId,
                transmissionTypeId = car.TransmissionTypeId,
                seatCountId = car.SeatCountId,
                vehicleTypeId = car.VehicleTypeId
            }).ToList();

            var bookingRows = reservations.Select(reservation =>
            {
                carMap.TryGetValue(reservation.CarId, out var car);
                userMap.TryGetValue(reservation.AppUserId, out var user);

                var status = string.IsNullOrWhiteSpace(reservation.Status) ? "Beklemede" : reservation.Status;
                var statusKey = GetReservationStatusKey(status);
                var amount = reservation.Price > 0 ? reservation.Price : ((car?.DailyPrice ?? 0m) * reservation.TotalDays);

                return new
                {
                    id = reservation.ReservationId,
                    user = reservation.UserFullName,
                    email = user?.Email ?? string.Empty,
                    phone = user?.PhoneNumber ?? string.Empty,
                    carId = reservation.CarId,
                    car = string.IsNullOrWhiteSpace(reservation.BrandName) ? reservation.CarModel : $"{reservation.BrandName} {reservation.CarModel}",
                    startDate = reservation.StartDate.ToString("dd MMMM yyyy", trCulture),
                    endDate = reservation.EndDate.ToString("dd MMMM yyyy", trCulture),
                    amount = $"{amount:N0} TL",
                    amountValue = amount,
                    startDateValue = reservation.StartDate,
                    endDateValue = reservation.EndDate,
                    totalDays = reservation.TotalDays,
                    statusKey,
                    status
                };
            }).OrderByDescending(x => x.id).ToList();

            var messageRows = messages.Select(message =>
            {
                userMap.TryGetValue(message.AppUserId, out var user);
                var statusKey = GetMessageStatusKey(message.Status);
                var status = statusKey switch
                {
                    "answered" => "Cevaplandı",
                    "toxic" => "Toksik",
                    _ => "Cevap Bekleniyor"
                };

                return new
                {
                    id = message.MessageId,
                    user = string.IsNullOrWhiteSpace(message.UserFullName)
                        ? $"{user?.FirstName} {user?.LastName}".Trim()
                        : message.UserFullName,
                    email = user?.Email ?? string.Empty,
                    phone = user?.PhoneNumber ?? string.Empty,
                    title = message.Title,
                    content = message.Content,
                    reply = string.IsNullOrWhiteSpace(message.Reply) ? null : message.Reply,
                    status,
                    statusKey
                };
            }).OrderByDescending(x => x.id).ToList();

            var bookingStatusKey = string.IsNullOrWhiteSpace(bookingStatus)
                ? "all"
                : bookingStatus.Trim().ToLowerInvariant();

            if (bookingStatusKey != "all")
            {
                bookingRows = bookingRows
                    .Where(x => string.Equals(x.statusKey, bookingStatusKey, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            var activeCarCount = cars.Count;
            var reservationCount = reservations.Count;
            var userCount = users.Count;

            var adminSearchText = (adminSearch ?? string.Empty).Trim();
            var filteredAdmins = users
                .Where(user =>
                    string.IsNullOrWhiteSpace(adminSearchText)
                    || user.Email.Contains(adminSearchText, StringComparison.OrdinalIgnoreCase)
                    || ($"{user.FirstName} {user.LastName}").Contains(adminSearchText, StringComparison.OrdinalIgnoreCase))
                .OrderByDescending(user => user.IsAdmin)
                .ThenBy(user => user.FirstName)
                .ThenBy(user => user.LastName)
                .ToList();

            const int adminItemsPerPage = 8;
            var adminTotalPages = Math.Max(1, (int)Math.Ceiling((double)filteredAdmins.Count / adminItemsPerPage));
            var currentAdminPage = Math.Max(1, Math.Min(adminPage, adminTotalPages));

            var adminRows = filteredAdmins
                .Skip((currentAdminPage - 1) * adminItemsPerPage)
                .Take(adminItemsPerPage)
                .Select(user => new
            {
                id = user.AppUserId,
                fullName = $"{user.FirstName} {user.LastName}".Trim(),
                email = user.Email,
                password = user.Password,
                isAdmin = user.IsAdmin,
                admin = user.IsAdmin ? "Admin" : "Admin Değil"
            }).ToList();

            ViewBag.ActiveTab = tab;
            ViewBag.MockBookings = bookingRows;
            ViewBag.MockFleet = fleet;
            ViewBag.MockAdminMessages = messageRows;
            ViewBag.Admins = adminRows;
            ViewBag.SelectedCarFilter = carFilter;
            ViewBag.FleetSearch = search;
            ViewBag.FleetPage = page;
            ViewBag.MsgFilter = filter;
            ViewBag.MsgPage = msgPage;
            ViewBag.MessageSearch = messageSearch ?? string.Empty;
            ViewBag.BookingSearch = bookingSearch ?? string.Empty;
            ViewBag.BookingStatus = bookingStatusKey;
            ViewBag.CarFilterSearch = carFilterSearch ?? string.Empty;
            ViewBag.BookingPage = bookingPage <= 0 ? 1 : bookingPage;
            ViewBag.PendingMessageCount = messageRows.Count;
            ViewBag.ActiveCarCount = activeCarCount;
            ViewBag.ReservationCount = reservationCount;
            ViewBag.UserCount = userCount;
            ViewBag.AdminSearch = adminSearchText;
            ViewBag.AdminPage = currentAdminPage;
            ViewBag.AdminTotalPages = adminTotalPages;
            ViewBag.SelectedCalendarCar = selectedCalendarCar;
            ViewBag.SelectedReservationId = selectedReservationId;
            ViewBag.CalendarSearch = calendarSearch ?? string.Empty;
            ViewBag.CalendarPage = calendarPage <= 0 ? 1 : calendarPage;
            ViewBag.CurrentMonth = currentMonth ?? today.Month;
            ViewBag.CurrentYear = currentYear ?? today.Year;
            ViewBag.BrandOptions = brands
                .Where(x => x.BrandId > 0 && !string.IsNullOrWhiteSpace(x.BrandName))
                .Select(x => new { id = x.BrandId, name = x.BrandName })
                .ToList();
            ViewBag.FuelOptions = fuelTypes
                .Where(x => x.FuelTypeId > 0 && !string.IsNullOrWhiteSpace(x.FuelTypeName))
                .Select(x => new { id = x.FuelTypeId, name = x.FuelTypeName })
                .ToList();
            ViewBag.TransmissionOptions = transmissionTypes
                .Where(x => x.TransmissionTypeId > 0 && !string.IsNullOrWhiteSpace(x.TransmissionTypeName))
                .Select(x => new { id = x.TransmissionTypeId, name = x.TransmissionTypeName })
                .ToList();
            ViewBag.SeatOptions = seatCounts
                .Where(x => x.SeatCountId > 0 && !string.IsNullOrWhiteSpace(x.SeatCountName))
                .Select(x => new { id = x.SeatCountId, name = x.SeatCountName })
                .ToList();
            ViewBag.VehicleTypeOptions = vehicleTypes
                .Where(x => x.VehicleTypeId > 0 && !string.IsNullOrWhiteSpace(x.VehicleTypeName))
                .Select(x => new { id = x.VehicleTypeId, name = x.VehicleTypeName })
                .ToList();

            if (carId > 0 && tab == "add-car")
            {
                ViewBag.EditingCar = fleet.FirstOrDefault(x => x.id == carId);
            }

            if (messageId > 0)
            {
                ViewBag.SelectedMessage = messageRows.FirstOrDefault(x => x.id == messageId);
            }

            return View("~/Views/AdminPanel/Index.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> SaveCar(AdminPanelSaveCarDto request)
        {
            var parsedPrice = ParsePrice(request.Price);

            if (request == null
                || string.IsNullOrWhiteSpace(request.Model)
                || string.IsNullOrWhiteSpace(request.Image)
                || parsedPrice <= 0
                || request.BrandId <= 0
                || request.FuelTypeId <= 0
                || request.TransmissionTypeId <= 0
                || request.SeatCountId <= 0
                || request.VehicleTypeId <= 0)
            {
                return RedirectToAction(nameof(AdminPanel), new { tab = "add-car", carId = request?.CarId });
            }

            if (request.CarId.HasValue && request.CarId.Value > 0)
            {
                var updateDto = _mapper.Map<CarUpdateDto>(request);
                updateDto.DailyPrice = parsedPrice;

                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/Cars/update", updateDto);
            }
            else
            {
                var addDto = _mapper.Map<CarAddDto>(request);
                addDto.DailyPrice = parsedPrice;

                await _httpClient.PostAsJsonAsync($"{BaseUrl}api/Cars/add", addDto);
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "fleet" });
        }

        [HttpPost]
        public async Task<IActionResult> AddBrand(AdminPanelAddBrandDto request)
        {
            if (request != null
                && !string.IsNullOrWhiteSpace(request.BrandName)
                && !string.IsNullOrWhiteSpace(request.BrandLogo))
            {
                var dto = _mapper.Map<BrandAddDto>(request);

                await _httpClient.PostAsJsonAsync($"{BaseUrl}api/Brands/add", dto);
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "fleet" });
        }

        [HttpPost]
        public async Task<IActionResult> ToggleAdmin(int appUserId, bool makeAdmin, string? adminSearch = null, int adminPage = 1)
        {
            if (appUserId > 0)
            {
                var user = await _httpClient.GetFromJsonAsync<AppUserGetDto>($"{BaseUrl}api/Login/getbyid/{appUserId}");
                if (user != null)
                {
                    var updateDto = new AppUserUpdateDto
                    {
                        AppUserId = user.AppUserId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        PhoneNumber = user.PhoneNumber,
                        Email = user.Email,
                        Password = user.Password,
                        IsAdmin = makeAdmin
                    };
                    await _httpClient.PutAsJsonAsync($"{BaseUrl}api/Login/update", updateDto);
                }
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "admins", adminSearch, adminPage });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteMessage(int messageId, string? filter = "all", int msgPage = 1, string? messageSearch = null)
        {
            if (messageId > 0)
            {
                await _httpClient.DeleteAsync($"{BaseUrl}api/Messages/delete/{messageId}");
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "messages", filter, msgPage, messageSearch });
        }

        [HttpPost]
        public async Task<IActionResult> GenerateAiMessageReply([FromBody] AdminAiReplyRequest request)
        {
            const string ProviderUrl = "https://openrouter.ai/api/v1/chat/completions";
            const string Model = "stepfun/step-3.5-flash:free";
            const string Referer = "http://localhost:5135";
            const string Title = "Rentova UI Chat";
            const string SystemPrompt = "Sen Rentova arac kiralama platformunun destek asistanisin. Rentova sistemi, rezervasyon, araclar, odeme ve destek konularinda kibar ve yardimci cevaplar ver. Eger sorunun Rentova ile ilgisi yoksa, sunu cevap ver: 'Uzgunum ben isste bu sitenin AI'i. Baska konularda bir fikrim yok, sana Rentova hakkinda nasil yardim edebilirim?'";

            // API key configuration üzerinden okunur (appsettings veya ortam değişkeni: OpenRouter__ApiKey)
            var apiKey = _configuration["OpenRouter:ApiKey"] ?? string.Empty;

            var title = request?.Title?.Trim() ?? string.Empty;
            var content = request?.Content?.Trim() ?? string.Empty;
            var user = request?.User?.Trim() ?? "kullanici";

            if (string.IsNullOrWhiteSpace(title) && string.IsNullOrWhiteSpace(content))
            {
                return BadRequest(new { reply = string.Empty });
            }

            var prompt = string.Join("\n", new[]
            {
                "Asagidaki musteri mesaji icin Rentova adina resmi, cozum odakli ve kibar bir yanit yaz.",
                "Yaniti uzun, aciklayici ve paragraf duzeninde hazirla.",
                "Varsayim kurma; sadece verilen soruna odaklan.",
                "Cikti yalnizca gonderilmeye hazir yanit metni olsun.",
                string.Empty,
                $"Musteri: {user}",
                $"Baslik: {title}",
                $"Mesaj: {content}"
            });

            var payload = new
            {
                model = Model,
                messages = new object[]
                {
                    new
                    {
                        role = "system",
                        content = SystemPrompt
                    },
                    new
                    {
                        role = "user",
                        content = prompt
                    }
                },
                temperature = 0.4,
                max_tokens = 1500
            };

            try
            {
                if (string.IsNullOrWhiteSpace(apiKey))
                {
                    throw new InvalidOperationException("API key missing");
                }

                using var requestMessage = new HttpRequestMessage(HttpMethod.Post, ProviderUrl);
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                requestMessage.Headers.TryAddWithoutValidation("HTTP-Referer", Referer);
                requestMessage.Headers.TryAddWithoutValidation("X-Title", Title);
                requestMessage.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

                var response = await _httpClient.SendAsync(requestMessage);

                if (!response.IsSuccessStatusCode)
                {
                    throw new InvalidOperationException("AI request failed");
                }

                var body = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<OpenRouterResponse>(body, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var generated = result?.Choices?.FirstOrDefault()?.Message?.Content?.Trim() ?? string.Empty;
                var finishReason = result?.Choices?.FirstOrDefault()?.FinishReason ?? string.Empty;
                
                if (string.IsNullOrWhiteSpace(generated))
                {
                    throw new InvalidOperationException("Empty AI text");
                }

                // Eğer token limiti yüzünden kesilmişse sona ellipsis ekle
                if (finishReason == "length")
                {
                    generated += "\n\n[Yanıt sistem sınırı yüzünden kısaltılmıştır. Daha fazla bilgi için müşteri hizmetleriyle iletişime geçebilirsiniz.]";
                }

                return Ok(new { reply = generated });
            }
            catch
            {
                return Ok(new { reply = "Şu anda yanıt üretilemedi. Lütfen tekrar deneyiniz." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> ReplyMessage(int messageId, string? replyText, string? filter = "all", int msgPage = 1, string? messageSearch = null)
        {
            if (messageId > 0 && !string.IsNullOrWhiteSpace(replyText))
            {
                var message = await _httpClient.GetFromJsonAsync<MessageGetDto>($"{BaseUrl}api/Messages/getbyid/{messageId}");
                if (message != null)
                {
                    var updateDto = new MessageUpdateDto
                    {
                        MessageId = message.MessageId,
                        AppUserId = message.AppUserId,
                        Title = message.Title,
                        Content = message.Content,
                        Status = "Cevaplandı",
                        Reply = replyText.Trim()
                    };

                    await _httpClient.PutAsJsonAsync($"{BaseUrl}api/Messages/update", updateDto);
                }
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "messages", filter, msgPage, messageSearch, messageId });
        }

        [HttpPost]
        public async Task<IActionResult> RemoveFromFeatured(int carId, string? screen)
        {
            var car = await _httpClient.GetFromJsonAsync<CarGetDto>($"{BaseUrl}api/Cars/get/{carId}");
            if (car != null)
            {
                var updateDto = _mapper.Map<CarUpdateDto>(car);

                if (string.Equals(screen, "mainScreen", StringComparison.OrdinalIgnoreCase))
                {
                    updateDto.MainScreen = false;
                }
                else if (string.Equals(screen, "popularScreen1", StringComparison.OrdinalIgnoreCase))
                {
                    updateDto.PopularScreen1 = false;
                }
                else if (string.Equals(screen, "popularScreen2", StringComparison.OrdinalIgnoreCase))
                {
                    updateDto.PopularScreen2 = false;
                }

                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/Cars/update", updateDto);
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "featured" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteCar(int id)
        {
            await _httpClient.DeleteAsync($"{BaseUrl}api/Cars/delete/{id}");
            return RedirectToAction(nameof(AdminPanel), new { tab = "fleet" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteReservation(int reservationId, string? carFilter = null, string? bookingStatus = "all", string? bookingSearch = null, string? carFilterSearch = null, int bookingPage = 1)
        {
            if (reservationId > 0)
            {
                await _httpClient.DeleteAsync($"{BaseUrl}api/Reservation/delete/{reservationId}");
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "bookings", carFilter, bookingStatus, bookingSearch, carFilterSearch, bookingPage });
        }

        [HttpPost]
        public async Task<IActionResult> AddFuelType(string? fuelTypeName)
        {
            if (!string.IsNullOrWhiteSpace(fuelTypeName))
            {
                await _httpClient.PostAsJsonAsync($"{BaseUrl}api/FuelTypes/add", new
                {
                    FuelTypeName = fuelTypeName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateFeature(string? featureType, int featureId, string? featureName)
        {
            if (featureId <= 0 || string.IsNullOrWhiteSpace(featureType) || string.IsNullOrWhiteSpace(featureName))
            {
                return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
            }

            var normalizedType = featureType.Trim().ToLowerInvariant();
            var normalizedName = featureName.Trim();

            if (normalizedType == "fuel")
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/FuelTypes/update", new
                {
                    FuelTypeId = featureId,
                    FuelTypeName = normalizedName
                });
            }
            else if (normalizedType == "seat")
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/SeatCounts/update", new
                {
                    SeatCountId = featureId,
                    SeatCountName = normalizedName
                });
            }
            else if (normalizedType == "transmission")
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/TransmissionTypes/update", new
                {
                    TransmissionTypeId = featureId,
                    TransmissionTypeName = normalizedName
                });
            }
            else if (normalizedType == "vehicle")
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/VehicleTypes/update", new
                {
                    VehicleTypeId = featureId,
                    VehicleTypeName = normalizedName
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateFuelType(int fuelTypeId, string? fuelTypeName)
        {
            if (fuelTypeId > 0 && !string.IsNullOrWhiteSpace(fuelTypeName))
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/FuelTypes/update", new
                {
                    FuelTypeId = fuelTypeId,
                    FuelTypeName = fuelTypeName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteFuelType(int fuelTypeId)
        {
            if (fuelTypeId > 0)
            {
                await _httpClient.DeleteAsync($"{BaseUrl}api/FuelTypes/delete/{fuelTypeId}");
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> AddSeatCount(string? seatCountName)
        {
            if (!string.IsNullOrWhiteSpace(seatCountName))
            {
                await _httpClient.PostAsJsonAsync($"{BaseUrl}api/SeatCounts/add", new
                {
                    SeatCountName = seatCountName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSeatCount(int seatCountId, string? seatCountName)
        {
            if (seatCountId > 0 && !string.IsNullOrWhiteSpace(seatCountName))
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/SeatCounts/update", new
                {
                    SeatCountId = seatCountId,
                    SeatCountName = seatCountName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteSeatCount(int seatCountId)
        {
            if (seatCountId > 0)
            {
                await _httpClient.DeleteAsync($"{BaseUrl}api/SeatCounts/delete/{seatCountId}");
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> AddTransmissionType(string? transmissionTypeName)
        {
            if (!string.IsNullOrWhiteSpace(transmissionTypeName))
            {
                await _httpClient.PostAsJsonAsync($"{BaseUrl}api/TransmissionTypes/add", new
                {
                    TransmissionTypeName = transmissionTypeName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTransmissionType(int transmissionTypeId, string? transmissionTypeName)
        {
            if (transmissionTypeId > 0 && !string.IsNullOrWhiteSpace(transmissionTypeName))
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/TransmissionTypes/update", new
                {
                    TransmissionTypeId = transmissionTypeId,
                    TransmissionTypeName = transmissionTypeName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteTransmissionType(int transmissionTypeId)
        {
            if (transmissionTypeId > 0)
            {
                await _httpClient.DeleteAsync($"{BaseUrl}api/TransmissionTypes/delete/{transmissionTypeId}");
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> AddVehicleType(string? vehicleTypeName)
        {
            if (!string.IsNullOrWhiteSpace(vehicleTypeName))
            {
                await _httpClient.PostAsJsonAsync($"{BaseUrl}api/VehicleTypes/add", new
                {
                    VehicleTypeName = vehicleTypeName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateVehicleType(int vehicleTypeId, string? vehicleTypeName)
        {
            if (vehicleTypeId > 0 && !string.IsNullOrWhiteSpace(vehicleTypeName))
            {
                await _httpClient.PutAsJsonAsync($"{BaseUrl}api/VehicleTypes/update", new
                {
                    VehicleTypeId = vehicleTypeId,
                    VehicleTypeName = vehicleTypeName.Trim()
                });
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteVehicleType(int vehicleTypeId)
        {
            if (vehicleTypeId > 0)
            {
                await _httpClient.DeleteAsync($"{BaseUrl}api/VehicleTypes/delete/{vehicleTypeId}");
            }

            return RedirectToAction(nameof(AdminPanel), new { tab = "features" });
        }

        private async Task<List<T>> GetListAsync<T>(string path)
        {
            try
            {
                return await _httpClient.GetFromJsonAsync<List<T>>($"{BaseUrl}{path}") ?? new List<T>();
            }
            catch
            {
                return new List<T>();
            }
        }

        private static int ParseSeatCount(string? seatCountName)
        {
            if (string.IsNullOrWhiteSpace(seatCountName))
            {
                return 0;
            }

            var digits = new string(seatCountName.Where(char.IsDigit).ToArray());
            return int.TryParse(digits, out var seatCount) ? seatCount : 0;
        }

        private static decimal ParsePrice(string? priceText)
        {
            if (string.IsNullOrWhiteSpace(priceText))
            {
                return 0m;
            }

            var normalized = new string(priceText.Where(x => char.IsDigit(x) || x == ',' || x == '.').ToArray());

            if (decimal.TryParse(normalized, NumberStyles.Any, new CultureInfo("tr-TR"), out var trPrice))
            {
                return trPrice;
            }

            if (decimal.TryParse(normalized, NumberStyles.Any, CultureInfo.InvariantCulture, out var invariantPrice))
            {
                return invariantPrice;
            }

            return 0m;
        }

        private static string GetReservationStatusKey(string? status)
        {
            var value = (status ?? string.Empty).Trim();
            if (value.Equals("Aktif", StringComparison.OrdinalIgnoreCase))
            {
                return "active";
            }

            if (value.Equals("Beklemede", StringComparison.OrdinalIgnoreCase))
            {
                return "pending";
            }

            return "finished";
        }

        private static string GetMessageStatusKey(string? status)
        {
            var value = (status ?? string.Empty).Trim();
            if (value.Contains("toks", StringComparison.OrdinalIgnoreCase))
            {
                return "toxic";
            }

            if (value.Contains("beklen", StringComparison.OrdinalIgnoreCase)
                || value.Contains("pending", StringComparison.OrdinalIgnoreCase))
            {
                return "pending";
            }

            if (value.Contains("cevapland", StringComparison.OrdinalIgnoreCase)
                || value.Contains("yanitland", StringComparison.OrdinalIgnoreCase)
                || value.Contains("yanıtland", StringComparison.OrdinalIgnoreCase)
                || value.Equals("answered", StringComparison.OrdinalIgnoreCase))
            {
                return "answered";
            }

            return "pending";
        }

        public sealed class AdminAiReplyRequest
        {
            public string? Title { get; set; }
            public string? Content { get; set; }
            public string? User { get; set; }
        }

        private sealed class OpenRouterResponse
        {
            public List<OpenRouterChoice>? Choices { get; set; }
        }

        private sealed class OpenRouterChoice
        {
            public OpenRouterMessage? Message { get; set; }
            public string? FinishReason { get; set; }
        }

        private sealed class OpenRouterMessage
        {
            public string? Content { get; set; }
        }

}

}
