(function () {
    function getCurrentTheme() {
        var savedTheme = null;
        try {
            savedTheme = localStorage.getItem('rentova-theme');
        } catch (_error) {
            savedTheme = null;
        }

        return savedTheme === 'light' ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('rentova-theme', theme);
        } catch (_error) {
            // Ignore storage errors in private mode.
        }
    }

    function getToggleText(theme) {
        return theme === 'dark' ? 'Beyaz Tema' : 'Siyah Tema';
    }

    function mountThemeToggle() {
        if (document.getElementById('themeToggleBtn')) {
            return;
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.id = 'themeToggleBtn';
        button.className = 'theme-toggle-btn';
        button.setAttribute('aria-label', 'Tema degistir');

        var theme = getCurrentTheme();
        button.textContent = getToggleText(theme);

        button.addEventListener('click', function () {
            var currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            button.textContent = getToggleText(nextTheme);
        });

        document.body.appendChild(button);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountThemeToggle);
    } else {
        mountThemeToggle();
    }
})();
