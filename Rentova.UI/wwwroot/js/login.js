document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.getElementById('loginCard');
    const authForm = document.getElementById('authForm');
    const registerFields = document.getElementById('registerFields');
    const loginTitle = document.getElementById('loginTitle');
    const loginSubtitle = document.getElementById('loginSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const socialAuthBtn = document.getElementById('socialAuthBtn');
    const googleBtnText = document.getElementById('googleBtnText');
    const footerText = document.getElementById('footerText');
    const toggleModeBtn = document.getElementById('toggleModeBtn');
    const authMessage = document.getElementById('authMessage');

    let isLoginMode = true;
    let isSubmitting = false;

    function showMessage(text, isError = true) {
        if (!authMessage) return;
        authMessage.textContent = text;
        authMessage.className = `text-xs font-bold text-center h-4 transition-opacity duration-300 ${isError ? 'text-red-500' : 'text-green-500'}`;
        authMessage.style.opacity = '1';
        setTimeout(() => { authMessage.style.opacity = '0'; }, 3000);
    }

    // --- Validation ---
    function validateForm(data) {
        if (!data.email || !data.password) {
            showMessage('E-posta ve şifre zorunludur.');
            return false;
        }
        if (!isLoginMode) {
            if (!data.firstName || !data.lastName || !data.phoneNumber) {
                showMessage('Tüm alanları doldurunuz.');
                return false;
            }
            const phoneRegex = /^[1-9][0-9]{9}$/;
            if (!phoneRegex.test(data.phoneNumber)) {
                showMessage('Telefon: 10 hane olmalı ve başında 0 olmamalıdır.');
                return false;
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;
            if (!passwordRegex.test(data.password)) {
                showMessage('Şifre: En az 8 karakter, büyük-küçük harf, rakam ve özel karakter içermelidir.');
                return false;
            }
        }
        return true;
    }

    function setSubmitting(loading) {
        isSubmitting = loading;
        submitBtn.disabled = loading;
        submitBtn.style.opacity = loading ? '0.7' : '1';
        submitBtn.style.cursor = loading ? 'not-allowed' : 'pointer';
        if (loading) {
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.textContent = 'İşleniyor...';
        } else {
            submitBtn.textContent = submitBtn.dataset.originalText || 'Giriş Yap';
        }
    }

    // --- Toggle ---
    toggleModeBtn.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        if (authMessage) authMessage.style.opacity = '0';

        if (isLoginMode) {
            loginCard.dataset.mode = 'login';
            registerFields.classList.add('hidden');
            loginTitle.textContent = 'Hoş Geldiniz';
            loginSubtitle.textContent = 'Premium sürüş deneyimine giriş yapın.';
            submitBtn.textContent = 'Giriş Yap';
            googleBtnText.textContent = 'Giriş Yap';
            footerText.textContent = 'Henüz hesabınız yok mu?';
            toggleModeBtn.textContent = 'Kayıt Olun';
        } else {
            loginCard.dataset.mode = 'register';
            registerFields.classList.remove('hidden');
            loginTitle.textContent = 'Hesap Oluşturun';
            loginSubtitle.textContent = 'Rentova dünyasına ilk adımınızı atın.';
            submitBtn.textContent = 'Kayıt Ol';
            googleBtnText.textContent = 'Kayıt Ol';
            footerText.textContent = 'Zaten hesabınız var mı?';
            toggleModeBtn.textContent = 'Giriş Yapın';
        }
    });

    if (socialAuthBtn) {
        socialAuthBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showMessage('Sosyal giriş geçici olarak kapalı. Lütfen e-posta ve şifre ile devam edin.');
        });
    }

    // --- Form Submission ---
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const phoneNumber = document.getElementById('phoneNumber')?.value.trim();

        const data = isLoginMode
            ? { email, password }
            : { firstName, lastName, phoneNumber, email, password };

        if (!validateForm(data)) return;
        setSubmitting(true);

        if (isLoginMode) {
            await handleLogin(data);
        } else {
            await handleSignUp(data);
        }
    });

    async function handleLogin(data) {
        try {
            const response = await fetch('/Login/UserLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('currentUser', JSON.stringify(user));
                showMessage('Giriş başarılı! Yönlendiriliyorsunuz...', false);
                setTimeout(() => { window.location.href = '/'; }, 1000);
            } else {
                const error = await response.text();
                showMessage(error || 'Giriş yapılamadı.');
                setSubmitting(false);
            }
        } catch (error) {
            showMessage('Sunucuya bağlanılamadı.');
            setSubmitting(false);
        }
    }

    async function handleSignUp(data) {
        try {
            const response = await fetch('/Login/UserSignUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                showMessage('Kayıt başarılı! Giriş yapabilirsiniz.', false);
                setTimeout(() => {
                    if (toggleModeBtn) toggleModeBtn.click();
                    authForm.reset();
                    setSubmitting(false);
                }, 1500);
            } else {
                const error = await response.text();
                showMessage(error || 'Kayıt sırasında bir hata oluştu.');
                setSubmitting(false);
            }
        } catch (error) {
            showMessage('Sunucuya bağlanılamadı.');
            setSubmitting(false);
        }
    }
});

