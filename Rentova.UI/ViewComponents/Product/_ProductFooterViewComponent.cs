using Microsoft.AspNetCore.Mvc;

namespace Rentova.UI.ViewComponents.Product
{
    public class _ProductFooterViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
