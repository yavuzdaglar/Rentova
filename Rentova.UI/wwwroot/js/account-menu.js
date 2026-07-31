document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = Array.from(document.querySelectorAll('.account-tab-btn[data-account-tab]'));
    const tabPanels = Array.from(document.querySelectorAll('.account-tab-panel[data-tab-panel]'));

    const reservationsListElement = document.getElementById('accountReservationsList');
    const deleteConfirmToastElement = document.getElementById('accountDeleteConfirmToast');
    const deleteConfirmTextElement = document.getElementById('accountDeleteConfirmText');
    const deleteConfirmYesButton = document.getElementById('accountDeleteConfirmYes');
    const deleteConfirmNoButton = document.getElementById('accountDeleteConfirmNo');

    const messagesMasterElement = document.getElementById('accountMessagesMaster');
    const messagesDetailElement = document.getElementById('accountMessagesDetail');
    const messagesBackButton = document.getElementById('accountMessagesBackBtn');
    const messagesListElement = document.getElementById('accountMessagesList');
    const messageComposeFormElement = document.querySelector('.account-message-compose');
    const messageSendButtonElement = document.getElementById('accountMessageSendBtn');

    const messageDetailTitleElement = document.getElementById('accountMessageDetailTitle');
    const messageDetailDateElement = document.getElementById('accountMessageDetailDate');
    const messageThreadElement = document.getElementById('accountMessageThread');

    let pendingDeleteForm = null;
    let isMessageSubmitting = false;

    const statusMeta = {
        answered: { label: 'Cevaplandi', supportText: 'Mesajiniz destek ekibi tarafindan yanitlandi.' },
        pending: { label: 'Cevap Bekleniyor', supportText: 'Mesajiniz alindi. En kisa surede yanitlanacaktir.' },
        toxic: { label: 'Toksik', supportText: 'Mesajiniz icerigi nedeniyle incelemeye alinmistir.' }
    };

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatDateTime(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '-';

        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function activateTab(tabName) {
        tabButtons.forEach((button) => {
            const buttonTab = button.getAttribute('data-account-tab');
            button.classList.toggle('is-active', buttonTab === tabName);
        });

        tabPanels.forEach((panel) => {
            const panelTab = panel.getAttribute('data-tab-panel');
            panel.classList.toggle('is-active', panelTab === tabName);
        });

        if (tabName === 'messages') {
            showMessagesMaster();
        }
    }

    function hideDeleteConfirmToast() {
        if (deleteConfirmToastElement) {
            deleteConfirmToastElement.classList.remove('is-open');
        }

        pendingDeleteForm = null;
    }

    function showDeleteConfirmToast(formElement) {
        if (!deleteConfirmToastElement) {
            formElement.submit();
            return;
        }

        pendingDeleteForm = formElement;

        const vehicleName = formElement?.dataset?.vehicleName || '';
        if (deleteConfirmTextElement) {
            deleteConfirmTextElement.textContent = vehicleName
                ? `"${vehicleName}" rezervasyonunu silmek istediginize emin misiniz?`
                : 'Bu rezervasyonu silmek istediginize emin misiniz?';
        }

        deleteConfirmToastElement.classList.add('is-open');
    }

    function showMessagesMaster() {
        if (messagesMasterElement) {
            messagesMasterElement.classList.remove('is-hidden');
        }

        if (messagesDetailElement) {
            messagesDetailElement.classList.add('is-hidden');
        }

        if (messagesBackButton) {
            messagesBackButton.classList.add('is-hidden');
        }
    }

    function openMessageDetail(button) {
        if (!button || !(button instanceof HTMLElement)) return;

        const title = button.dataset.messageTitle || 'Mesaj';
        const content = button.dataset.messageContent || '';
        const reply = button.dataset.messageReply || '';
        const statusCode = button.dataset.messageStatusCode || 'pending';
        const createdAt = button.dataset.messageCreatedAt || '';

        const state = statusMeta[statusCode] || statusMeta.pending;
        const formattedDate = formatDateTime(createdAt);

        if (messageDetailTitleElement) {
            messageDetailTitleElement.textContent = title;
        }

        if (messageDetailDateElement) {
            messageDetailDateElement.textContent = formattedDate;
        }

        if (messageThreadElement) {
            const supportMessage = reply.trim().length > 0
                ? reply
                : 'Mesajiniza en yakin zamanda cevap verilecektir.';

            messageThreadElement.innerHTML = `
                <div class="account-thread-row from-user">
                    <article class="account-thread-bubble">
                        <p class="account-thread-sender">Siz</p>
                        <p class="account-thread-text">${escapeHtml(content)}</p>
                        <p class="account-thread-time">${escapeHtml(formattedDate)}</p>
                    </article>
                </div>
                <div class="account-thread-row">
                    <article class="account-thread-bubble">
                        <p class="account-thread-sender">Rentova Destek</p>
                        <p class="account-thread-text">${escapeHtml(supportMessage)}</p>
                        <p class="account-thread-time">${escapeHtml(formattedDate)}</p>
                    </article>
                </div>
            `;
        }

        if (messagesMasterElement) {
            messagesMasterElement.classList.add('is-hidden');
        }

        if (messagesDetailElement) {
            messagesDetailElement.classList.remove('is-hidden');
        }

        if (messagesBackButton) {
            messagesBackButton.classList.remove('is-hidden');
        }
    }

    function setMessageButtonLoadingState(isLoading) {
        if (!messageSendButtonElement) return;

        if (!messageSendButtonElement.dataset.originalText) {
            messageSendButtonElement.dataset.originalText = messageSendButtonElement.textContent || 'Gonder';
        }

        if (isLoading) {
            messageSendButtonElement.disabled = true;
            messageSendButtonElement.classList.add('is-loading');
            messageSendButtonElement.textContent = 'Yukleniyor...';
            return;
        }

        messageSendButtonElement.disabled = false;
        messageSendButtonElement.classList.remove('is-loading');
        messageSendButtonElement.textContent = messageSendButtonElement.dataset.originalText;
    }

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-account-tab');
            if (!tabName) return;
            activateTab(tabName);
        });
    });

    if (messagesBackButton) {
        messagesBackButton.addEventListener('click', showMessagesMaster);
    }

    if (messagesListElement) {
        messagesListElement.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const cardButton = target.closest('[data-message-id]');
            if (!(cardButton instanceof HTMLElement)) return;

            openMessageDetail(cardButton);
        });
    }

    if (messageComposeFormElement && messageSendButtonElement) {
        messageComposeFormElement.addEventListener('submit', (event) => {
            if (isMessageSubmitting) {
                event.preventDefault();
                return;
            }

            isMessageSubmitting = true;
            setMessageButtonLoadingState(true);
        });

        // Browser geri/ileri cache'inden donulurse buton normal haline gelsin.
        window.addEventListener('pageshow', () => {
            isMessageSubmitting = false;
            setMessageButtonLoadingState(false);
        });
    }

    if (reservationsListElement) {
        reservationsListElement.addEventListener('submit', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLFormElement)) return;

            if (!target.classList.contains('account-reservation-delete-form')) return;

            event.preventDefault();
            showDeleteConfirmToast(target);
        });
    }

    if (deleteConfirmYesButton) {
        deleteConfirmYesButton.addEventListener('click', () => {
            if (!pendingDeleteForm) {
                hideDeleteConfirmToast();
                return;
            }

            const form = pendingDeleteForm;
            hideDeleteConfirmToast();
            form.submit();
        });
    }

    if (deleteConfirmNoButton) {
        deleteConfirmNoButton.addEventListener('click', hideDeleteConfirmToast);
    }

    const queryTab = new URLSearchParams(window.location.search).get('tab');
    const initialTab = queryTab === 'messages' || queryTab === 'settings' || queryTab === 'reservations'
        ? queryTab
        : 'reservations';

    activateTab(initialTab);
});
