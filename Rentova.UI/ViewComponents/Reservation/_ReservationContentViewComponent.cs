using Microsoft.AspNetCore.Mvc;
using Rentova.UI.Models;

namespace Rentova.UI.ViewComponents.Reservation
{
    public class _ReservationContentViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(ReservationPageViewModel model)
        {
            return View(model);
        }
    }
}
