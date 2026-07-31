document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('reservationPage');
    if (!root) return;

    const daysRoot = document.getElementById('reservationCalendarDays');
    const monthText = document.getElementById('reservationCurrentMonth');
    const prevBtn = document.getElementById('reservationPrevMonth');
    const nextBtn = document.getElementById('reservationNextMonth');

    const startDateText = document.getElementById('reservationStartDate');
    const endDateText = document.getElementById('reservationEndDate');
    const totalDaysText = document.getElementById('reservationTotalDays');
    const paymentLineText = document.getElementById('reservationPaymentLine');
    const totalPriceText = document.getElementById('reservationTotalPrice');
    const submitBtn = document.getElementById('reservationSubmitBtn');
    const messageText = document.getElementById('reservationMessage');

    const reservedRangesScript = document.getElementById('reservedRangesData');

    const carId = parseInt(root.dataset.carId || '0', 10);
    const dailyPrice = parseFloat(root.dataset.dailyPrice || '0');

    const DAY_MS = 24 * 60 * 60 * 1000;
    const today = normalizeDate(new Date());

    let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let startDate = null;
    let endDate = null;

    let reservedRanges = parseReservedRanges();
    let reservedDays = buildReservedDaysSet(reservedRanges);

    function parseReservedRanges() {
        if (!reservedRangesScript) return [];

        try {
            const raw = JSON.parse(reservedRangesScript.textContent || '[]');
            if (!Array.isArray(raw)) return [];
            return raw
                .map(item => ({
                    startDate: item.startDate || item.StartDate,
                    endDate: item.endDate || item.EndDate
                }))
                .filter(item => item.startDate && item.endDate);
        } catch {
            return [];
        }
    }

    function parseDateValue(value) {
        if (!value) return null;

        const text = String(value);
        if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            return normalizeDate(new Date(`${text}T00:00:00`));
        }

        return normalizeDate(new Date(text));
    }

    function toApiDateTime(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00`;
    }

    function buildReservedDaysSet(ranges) {
        const set = new Set();

        ranges.forEach(range => {
            const start = parseDateValue(range.startDate);
            const end = parseDateValue(range.endDate);

            if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
                return;
            }

            for (let time = start.getTime(); time <= end.getTime(); time += DAY_MS) {
                set.add(time);
            }
        });

        return set;
    }

    function normalizeDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function formatLongDate(timestamp) {
        return new Date(timestamp).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function formatCurrency(value) {
        return value.toLocaleString('tr-TR');
    }

    function setMessage(text, isError) {
        if (!messageText) return;
        messageText.textContent = text;
        messageText.className = isError
            ? 'text-sm font-semibold h-5 text-red-600'
            : 'text-sm font-semibold h-5 text-emerald-600';
    }

    function isReserved(timestamp) {
        return reservedDays.has(timestamp);
    }

    function isPast(timestamp) {
        return timestamp < today.getTime();
    }

    function isSelected(timestamp) {
        if (!startDate) return false;
        if (!endDate) return timestamp === startDate;
        return timestamp >= startDate && timestamp <= endDate;
    }

    function isRangeStart(timestamp) {
        return startDate === timestamp;
    }

    function isRangeEnd(timestamp) {
        return endDate !== null && endDate === timestamp;
    }

    function hasBlockedDayBetween(start, end) {
        for (let time = start; time <= end; time += DAY_MS) {
            if (isReserved(time) || isPast(time)) {
                return true;
            }
        }

        return false;
    }

    function renderCalendar() {
        if (!daysRoot || !monthText) return;

        monthText.textContent = currentMonth.toLocaleDateString('tr-TR', {
            month: 'long',
            year: 'numeric'
        });

        daysRoot.innerHTML = '';

        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1);
        const startOffset = (firstDay.getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startOffset; i++) {
            const empty = document.createElement('div');
            daysRoot.appendChild(empty);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = normalizeDate(new Date(year, month, day));
            const timestamp = date.getTime();

            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = String(day);

            const reserved = isReserved(timestamp);
            const past = isPast(timestamp);
            const selected = isSelected(timestamp);
            const selectedStart = isRangeStart(timestamp);
            const selectedEnd = isRangeEnd(timestamp);

            let className = 'aspect-square rounded-2xl flex items-center justify-center transition-all border text-lg font-display font-bold ';            

            if (reserved || past) {
                className += 'bg-brand-gray/10 border-brand-gray/5 text-brand-anthracite/20 cursor-not-allowed';
                button.disabled = true;
            } else if (selected) {
                className += 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20';
            } else {
                className += 'bg-brand-light border-brand-gray/10 text-brand-black hover:border-brand-black';
            }

            if (selectedStart || selectedEnd) {
                className += ' ring-2 ring-brand-black ring-offset-2';
            }

            button.className = className;

            if (!button.disabled) {
                button.addEventListener('click', () => handleDateClick(timestamp));
            }

            daysRoot.appendChild(button);
        }
    }

    function updateSummary() {
        if (!startDateText || !endDateText || !totalDaysText || !paymentLineText || !totalPriceText || !submitBtn) {
            return;
        }

        const totalDays = (startDate && endDate) ? Math.max(0, ((endDate - startDate) / DAY_MS) + 1) : 0;
        const totalPrice = totalDays * dailyPrice;

        startDateText.textContent = startDate ? formatLongDate(startDate) : 'Seçilmedi';
        endDateText.textContent = endDate ? formatLongDate(endDate) : 'Seçilmedi';
        totalDaysText.textContent = `${totalDays} Gün`;
        paymentLineText.textContent = `Günlük ${formatCurrency(dailyPrice)} TL x ${totalDays} Gün`;
        totalPriceText.textContent = `${formatCurrency(totalPrice)} TL`;

        submitBtn.disabled = totalDays <= 0;
    }

    function handleDateClick(timestamp) {
        setMessage('', false);

        if (!startDate || (startDate && endDate)) {
            startDate = timestamp;
            endDate = null;
            renderCalendar();
            updateSummary();
            return;
        }

        if (timestamp < startDate) {
            startDate = timestamp;
            endDate = null;
            renderCalendar();
            updateSummary();
            return;
        }

        if (hasBlockedDayBetween(startDate, timestamp)) {
            setMessage('Seçilen tarih aralığında dolu veya geçmiş gün bulunuyor.', true);
            startDate = timestamp;
            endDate = null;
            renderCalendar();
            updateSummary();
            return;
        }

        endDate = timestamp;
        renderCalendar();
        updateSummary();
    }

    async function refreshReservedRanges() {
        try {
            const response = await fetch(`/Reservation/ReservedRanges?carId=${carId}`);
            if (!response.ok) return;

            const data = await response.json();
            if (!Array.isArray(data)) return;

            reservedRanges = data.map(item => ({
                startDate: item.startDate || item.StartDate,
                endDate: item.endDate || item.EndDate
            }));

            reservedDays = buildReservedDaysSet(reservedRanges);
        } catch {
            // Keep existing ranges on refresh error.
        }
    }

    async function createReservation() {
        if (!startDate || !endDate || !submitBtn) return;

        const userJson = localStorage.getItem('currentUser');
        if (!userJson) {
            setMessage('Rezervasyon için önce giriş yapmalısınız.', true);
            setTimeout(() => {
                window.location.href = '/Login';
            }, 1000);
            return;
        }

        let user;
        try {
            user = JSON.parse(userJson);
        } catch {
            setMessage('Kullanıcı bilgisi okunamadı. Tekrar giriş yapın.', true);
            return;
        }

        if (!user || !user.appUserId) {
            setMessage('Kullanıcı kimliği bulunamadı. Tekrar giriş yapın.', true);
            return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Kaydediliyor...';

        const payload = {
            appUserId: user.appUserId,
            carId: carId,
            startDate: toApiDateTime(startDate),
            endDate: toApiDateTime(endDate)
        };

        try {
            const response = await fetch('/Reservation/Create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                setMessage(errorText || 'Rezervasyon sırasında bir hata oluştu.', true);
                return;
            }

            setMessage('Rezervasyon başarıyla oluşturuldu.', false);
            await refreshReservedRanges();

            startDate = null;
            endDate = null;
            renderCalendar();
            updateSummary();
        } catch {
            setMessage('Sunucuya bağlanılamadı.', true);
        } finally {
            submitBtn.textContent = originalText;
            updateSummary();
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
            renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
            renderCalendar();
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', createReservation);
    }

    renderCalendar();
    updateSummary();
});
