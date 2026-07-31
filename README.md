# 🚗 Rentova — Car Rental System

**Rentova** is a full-stack **car rental system** built with **ASP.NET Core (.NET 10)** and **React (Vite + TypeScript)**. It lets customers browse available vehicles, make reservations, manage their account, and contact support, while giving administrators a panel to manage the fleet, brands, and user messages.

---

## ✨ Features

- **Car catalog** — Browse vehicles with brand, model, daily price, fuel type, transmission, vehicle type, and seat count.
- **Filters & search** — Narrow down vehicles by brand, fuel type, transmission, vehicle type, and seat count.
- **Reservations** — Customers can reserve a car by choosing start and end dates; total price and status are calculated automatically.
- **User accounts** — Register, log in, and manage your profile.
- **Messages & support** — Users can send support messages and receive replies from admins.
- **Admin panel** — Add and edit cars, manage brands, view reservations, and reply to user messages.
- **Responsive modern UI** — Tailwind CSS + React frontends, one per screen (main, login, products, reservation, account, admin).

---

## 🏗️ Architecture

The solution follows a **layered / clean architecture** approach split across six projects:

| Project | Role |
| --- | --- |
| **Rentova.API** | RESTful Web API exposing controllers for cars, brands, reservations, users, and messages (Swagger included). |
| **Rentova.Application** | Application services and business logic orchestration. |
| **Rentova.Domain** | Repository interfaces (the persistence contracts). |
| **Rentova.Entities** | EF Core domain entities (`Car`, `Brand`, `FuelType`, `TransmissionType`, `VehicleType`, `SeatCount`, `AppUser`, `Reservation`, `Message`). |
| **Rentova.Infrastructure** | EF Core `DbContext`, repository implementations, and database migrations. |
| **Rentova.UI** | ASP.NET Core MVC web app that hosts the React frontends and AutoMapper mappings. |

### Technology stack

- **Backend:** ASP.NET Core (.NET 10), EF Core 10 (SQL Server / LocalDB), AutoMapper, Swagger/OpenAPI
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide icons
- **Database:** SQL Server (LocalDB), migrations managed via EF Core

---

## 🧱 Project layout

```
Rentova.sln
├── Rentova.API            # Web API (controllers + Swagger)
├── Rentova.Application    # Application services
├── Rentova.Domain         # Repository interfaces
├── Rentova.Entities       # EF Core entities
├── Rentova.Infrastructure # DbContext, repositories, migrations
└── Rentova.UI             # ASP.NET Core MVC + React apps
```

---

## 🚀 Getting started

### Prerequisites

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [SQL Server LocalDB](https://learn.microsoft.com/sql/database-engine/configure-windows/sql-server-express-localdb) (or any SQL Server instance)
- [Node.js](https://nodejs.org/) (for the React frontends)

### 1. Restore and build

```bash
dotnet restore
dotnet build
```

### 2. Apply database migrations

```bash
dotnet ef database update --project Rentova.Infrastructure --startup-project Rentova.API
```

The default connection string points to LocalDB:

```
Server=(localdb)\mssqllocaldb;Database=Rentova;Trusted_Connection=True;
```

### 3. Run the API

```bash
dotnet run --project Rentova.API
```

Swagger UI is available at `http://localhost:<port>/swagger`.

### 4. Run the web UI

```bash
dotnet run --project Rentova.UI
```

The UI runs on `http://localhost:5135` by default.

### 5. Run a React frontend (optional, during development)

```bash
cd Rentova.UI/wwwroot/RentovaMain
npm install
npm run dev
```

---

## 🗃️ Domain model

- **Car** — model, image, daily price, brand, fuel type, transmission type, vehicle type, seat count, and screen-placement flags (`MainScreen`, `PopularScreen1`, `PopularScreen2`).
- **AppUser** — customer or administrator (`IsAdmin`).
- **Reservation** — links a user to a car with start/end dates; `TotalDays`, `Price`, and `Status` (Pending / Active / Ended) are computed properties.
- **Message** — user support messages with optional admin replies and a status.

---

## 🔮 Roadmap ideas

- Email/password hashing & JWT authentication
- Payment integration
- Admin dashboard analytics
- Real-time reservation availability calendar

---

## 📄 License

This project is for educational and portfolio purposes.
