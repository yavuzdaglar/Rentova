function updateAuthUI() {
    const userJson = localStorage.getItem('currentUser');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const userNameElement = document.getElementById('userName');

    if (userJson) {
        const user = JSON.parse(userJson);
        if (authButtons) authButtons.classList.add('hidden');
        if (userInfo) {
            userInfo.classList.remove('hidden');
            userInfo.classList.add('flex');
        }
        if (userNameElement) {
            userNameElement.textContent = `${user.firstName} ${user.lastName}`;
        }
    } else {
        if (authButtons) authButtons.classList.remove('hidden');
        if (userInfo) {
            userInfo.classList.add('hidden');
            userInfo.classList.remove('flex');
        }
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', updateAuthUI);
