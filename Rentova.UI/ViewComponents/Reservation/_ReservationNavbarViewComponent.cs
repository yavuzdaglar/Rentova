using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Reservation
{
    public class _ReservationNavbarViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
