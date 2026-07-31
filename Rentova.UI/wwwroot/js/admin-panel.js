document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'rentova-admin-active-tab';
    let dragBound = false;

    function initHorizontalDragRails() {
        const rails = Array.from(document.querySelectorAll('[data-drag-scroll="true"]'));
        rails.forEach((rail) => {
            if (!(rail instanceof HTMLElement) || rail.dataset.dragReady === 'true') {
                return;
            }

            let isDown = false;
            let startX = 0;
            let scrollLeft = 0;

            rail.addEventListener('mousedown', (event) => {
                isDown = true;
                rail.classList.add('is-dragging');
                startX = event.pageX - rail.offsetLeft;
                scrollLeft = rail.scrollLeft;
            });

            rail.addEventListener('mouseleave', () => {
                isDown = false;
                rail.classList.remove('is-dragging');
            });

            rail.addEventListener('mouseup', () => {
                isDown = false;
                rail.classList.remove('is-dragging');
            });

            rail.addEventListener('mousemove', (event) => {
                if (!isDown) return;
                event.preventDefault();
                const x = event.pageX - rail.offsetLeft;
                const walk = (x - startX) * 1.2;
                rail.scrollLeft = scrollLeft - walk;
            });

            rail.dataset.dragReady = 'true';
        });

        if (!dragBound) {
            window.addEventListener('mouseup', () => {
                document.querySelectorAll('[data-drag-scroll="true"].is-dragging').forEach((element) => {
                    element.classList.remove('is-dragging');
                });
            });
            dragBound = true;
        }
    }

    function initFeatureEditor() {
        const typeInput = document.getElementById('featureUpdateType');
        const idInput = document.getElementById('featureUpdateId');
        const nameInput = document.getElementById('featureUpdateName');
        if (!(typeInput instanceof HTMLInputElement)
            || !(idInput instanceof HTMLInputElement)
            || !(nameInput instanceof HTMLInputElement)) {
            return;
        }

        const buttons = Array.from(document.querySelectorAll('[data-feature-edit-button="true"]'));
        buttons.forEach((button) => {
            if (!(button instanceof HTMLElement) || button.dataset.featureEditReady === 'true') {
                return;
            }

            button.addEventListener('click', () => {
                const featureType = button.getAttribute('data-feature-type') || '';
                const featureId = button.getAttribute('data-feature-id') || '';
                const featureName = button.getAttribute('data-feature-name') || '';

                typeInput.value = featureType;
                idInput.value = featureId;
                nameInput.value = featureName;
                nameInput.focus();
                nameInput.select();
            });

            button.dataset.featureEditReady = 'true';
        });
    }

    function initAdminMessageAiReply() {
        const aiButton = document.querySelector('[data-admin-ai-reply-button="true"]');
        const replyText = document.querySelector('[data-admin-reply-text="true"]');

        if (!(aiButton instanceof HTMLButtonElement) || !(replyText instanceof HTMLTextAreaElement)) {
            return;
        }

        if (aiButton.dataset.aiReady === 'true') {
            return;
        }

        aiButton.addEventListener('click', async () => {
            const title = aiButton.getAttribute('data-message-title') || '';
            const content = aiButton.getAttribute('data-message-content') || '';
            const user = aiButton.getAttribute('data-message-user') || 'kullanici';

            const previousText = aiButton.textContent;
            aiButton.disabled = true;
            aiButton.textContent = 'AI yaziyor...';

            try {
                const response = await fetch('/Admin/GenerateAiMessageReply', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        content: content,
                        user: user
                    })
                });

                if (!response.ok) {
                    throw new Error('AI request failed');
                }

                const data = await response.json();
                const generated = (data && data.reply ? String(data.reply) : '').trim();
                if (!generated) {
                    throw new Error('Empty AI text');
                }

                replyText.value = generated;
                replyText.focus();
            } catch (_error) {
                replyText.focus();
            } finally {
                aiButton.disabled = false;
                aiButton.textContent = previousText || 'AI';
            }
        });

        aiButton.dataset.aiReady = 'true';
    }

    function getCurrentTabFromUrl() {
        const currentUrl = new URL(window.location.href);
        return currentUrl.searchParams.get('tab') || 'overview';
    }

    function saveTab(tab) {
        try {
            localStorage.setItem(STORAGE_KEY, tab);
        } catch (_error) {
            // Ignore storage errors.
        }
    }

    function getSavedTab() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (_error) {
            return null;
        }
    }

    function attachSidebarHandlers() {
        const sidebar = document.getElementById('adminSidebarNav');
        if (!sidebar) return;

        const forms = Array.from(sidebar.querySelectorAll('form.admin-tab-form'));
        forms.forEach((form) => {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const tabInput = form.querySelector('input[name="tab"]');
                if (!(tabInput instanceof HTMLInputElement)) return;

                const tab = tabInput.value;
                await loadTab(tab, true);
            });
        });
    }

    function syncDomFromDocument(doc) {
        const nextSidebarMount = doc.getElementById('adminSidebarMount');
        const currentSidebarMount = document.getElementById('adminSidebarMount');

        const nextHeaderTitle = doc.getElementById('adminHeaderTitle');
        const currentHeaderTitle = document.getElementById('adminHeaderTitle');

        const nextContent = doc.getElementById('adminContentArea');
        const currentContent = document.getElementById('adminContentArea');

        if (!nextSidebarMount || !currentSidebarMount || !nextHeaderTitle || !currentHeaderTitle || !nextContent || !currentContent) {
            return false;
        }

        currentSidebarMount.innerHTML = nextSidebarMount.innerHTML;
        currentHeaderTitle.innerHTML = nextHeaderTitle.innerHTML;
        currentContent.innerHTML = nextContent.innerHTML;
        return true;
    }

    async function loadTab(tab, pushToHistory) {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('tab', tab);

        const app = document.getElementById('adminPanelApp');
        if (app) {
            app.style.opacity = '0.65';
            app.style.pointerEvents = 'none';
        }

        try {
            const response = await fetch(nextUrl.toString(), {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                window.location.href = nextUrl.toString();
                return;
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const synced = syncDomFromDocument(doc);
            if (!synced) {
                window.location.href = nextUrl.toString();
                return;
            }

            if (pushToHistory) {
                window.history.pushState({ tab }, '', nextUrl);
            }

            saveTab(tab);
            attachSidebarHandlers();
            initHorizontalDragRails();
            initFeatureEditor();
            initAdminMessageAiReply();
        } catch (_error) {
            window.location.href = nextUrl.toString();
        } finally {
            if (app) {
                app.style.opacity = '';
                app.style.pointerEvents = '';
            }
        }
    }

    window.addEventListener('popstate', async () => {
        const tab = getCurrentTabFromUrl();
        await loadTab(tab, false);
    });

    const currentTab = getCurrentTabFromUrl();
    saveTab(currentTab);

    const savedTab = getSavedTab();
    if (!new URL(window.location.href).searchParams.has('tab') && savedTab && savedTab !== currentTab) {
        loadTab(savedTab, true);
    }

    attachSidebarHandlers();
    initHorizontalDragRails();
    initFeatureEditor();
    initAdminMessageAiReply();
});
