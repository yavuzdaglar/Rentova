document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('aiChatLauncher')) {
        return;
    }

    var body = document.body;
    if (!body) return;

    var launcher = document.createElement('button');
    launcher.id = 'aiChatLauncher';
    launcher.type = 'button';
    launcher.className = 'ai-chat-launcher';
    launcher.setAttribute('aria-label', 'AI chat ac');
    launcher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

    var widget = document.createElement('section');
    widget.id = 'aiChatWidget';
    widget.className = 'ai-chat-widget';
    widget.innerHTML = [
        '<header class="ai-chat-header">',
        '  <div class="ai-chat-title-wrap">',
        '    <span class="ai-chat-dot" aria-hidden="true"></span>',
        '    <div>',
        '      <p class="ai-chat-title">Rentova AI</p>',
        '      <p class="ai-chat-subtitle">Sorunu yaz, birlikte cozelim.</p>',
        '    </div>',
        '  </div>',
        '  <button type="button" class="ai-chat-close" id="aiChatClose" aria-label="Chati kapat">',
        '    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>',
        '  </button>',
        '</header>',
        '<div id="aiChatMessages" class="ai-chat-messages"></div>',
        '<form id="aiChatForm" class="ai-chat-form">',
        '  <input id="aiChatInput" class="ai-chat-input" type="text" maxlength="500" placeholder="Mesajinizi yazin..." autocomplete="off" />',
        '  <button class="ai-chat-send" type="submit">Gonder</button>',
        '</form>'
    ].join('');

    body.appendChild(launcher);
    body.appendChild(widget);

    var closeBtn = document.getElementById('aiChatClose');
    var form = document.getElementById('aiChatForm');
    var input = document.getElementById('aiChatInput');
    var messages = document.getElementById('aiChatMessages');
    var conversationHistory = [];
    var apiEndpoint = window.RENTOVA_AI_CHAT_ENDPOINT || '/api/AiChat/ask';

    function scrollToBottom() {
        if (!messages) return;
        messages.scrollTop = messages.scrollHeight;
    }

    function addMessage(role, text) {
        if (!messages) return;
        var row = document.createElement('div');
        row.className = 'ai-chat-row ' + role;

        var bubble = document.createElement('div');
        bubble.className = 'ai-chat-bubble';
        bubble.textContent = text;

        row.appendChild(bubble);
        messages.appendChild(row);
        scrollToBottom();

        if (role === 'user' || role === 'bot') {
            conversationHistory.push({
                role: role === 'bot' ? 'assistant' : 'user',
                content: text
            });

            if (conversationHistory.length > 16) {
                conversationHistory = conversationHistory.slice(conversationHistory.length - 16);
            }
        }
    }

    function addTyping() {
        if (!messages) return null;
        var typing = document.createElement('div');
        typing.className = 'ai-chat-typing';
        typing.textContent = 'Rentova AI yaziyor...';
        messages.appendChild(typing);
        scrollToBottom();
        return typing;
    }

    function isSystemRelatedMessage(message) {
        var text = message.toLowerCase();
        var systemKeywords = [
            'rentova', 'rezervasyon', 'kirala', 'arac', 'araba', 'fiyat', 'ucret',
            'odeme', 'kart', 'destek', 'mesaj', 'marka', 'vites', 'yakit', 'koltuk',
            'ariza', 'hata', 'iptal', 'tarih', 'teslim', 'iade'
        ];

        for (var i = 0; i < systemKeywords.length; i++) {
            if (text.includes(systemKeywords[i])) {
                return true;
            }
        }

        return false;
    }

    async function askApi(message) {
        var history = conversationHistory.slice(0, Math.max(0, conversationHistory.length - 1));
        var response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                history: history
            })
        });

        if (!response.ok) {
            throw new Error('AI endpoint error');
        }

        var data = await response.json();
        var reply = (data && data.reply ? String(data.reply) : '').trim();
        if (!reply) {
            throw new Error('Empty AI reply');
        }

        return reply;
    }

    function openWidget() {
        widget.classList.add('is-open');
        launcher.setAttribute('aria-label', 'AI chat kapat');
        if (input) {
            input.focus();
        }
    }

    function closeWidget() {
        widget.classList.remove('is-open');
        launcher.setAttribute('aria-label', 'AI chat ac');
    }

    launcher.addEventListener('click', function () {
        if (widget.classList.contains('is-open')) {
            closeWidget();
            return;
        }
        openWidget();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeWidget);
    }

    if (form && input) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var value = input.value.trim();
            if (!value) return;

            addMessage('user', value);
            input.value = '';

            if (!isSystemRelatedMessage(value)) {
                return;
            }

            var typingNode = addTyping();
            askApi(value)
                .then(function (reply) {
                    if (typingNode && typingNode.parentElement) {
                        typingNode.parentElement.removeChild(typingNode);
                    }
                    addMessage('bot', reply);
                })
                .catch(function () {
                    if (typingNode && typingNode.parentElement) {
                        typingNode.parentElement.removeChild(typingNode);
                    }
                    addMessage('bot', 'Su anda AI servisine ulasilamiyor. Lutfen tekrar deneyin.');
                });
        });
    }

    addMessage('bot', 'Merhaba, ben Rentova AI. Rezervasyon, odeme veya destek mesajlari konusunda yardimci olabilirim.');
});
