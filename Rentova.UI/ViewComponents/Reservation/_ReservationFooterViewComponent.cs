using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Reservation
{
    public class _ReservationFooterViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
