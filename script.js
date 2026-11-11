/* ==========================================================================
   TechSarvjeet Portfolio — Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Mobile menu ---------------- */
    const menuList = document.getElementById('menuList');
    const menuToggleBtn = document.getElementById('menuToggleBtn');

    if (menuList) menuList.style.maxHeight = '0px';

    function toggleMenu() {
        const isOpen = menuList.style.maxHeight !== '0px';
        menuList.style.maxHeight = isOpen ? '0px' : '600px';
        if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', String(!isOpen));
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }

    if (menuList) {
        menuList.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuList.style.maxHeight = '0px';
                if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const hireBtn = document.getElementById('hireBtn');
    if (hireBtn) {
        hireBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuList.style.maxHeight = '0px';
        });
    }

    /* ---------------- Theme toggle (dark / light) ---------------- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            root.removeAttribute('data-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    const savedTheme = localStorage.getItem('ts-theme');
    if (savedTheme) applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('ts-theme', next);
        });
    }

    /* ---------------- Active nav link on scroll ---------------- */
    const sections = document.querySelectorAll('main section[id], section[id]');
    const navLinks = document.querySelectorAll('#menuList .cool-link');

    function setActiveLink() {
        let currentId = '';
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
                currentId = section.id;
            }
        });
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    /* ---------------- Contact form ---------------- */
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');
    const successToast = document.getElementById('successToast');
    const successToastClose = document.getElementById('successToastClose');

    let toastTimer = null;

    function showToast(isError) {
        if (!successToast) return;
        successToast.classList.toggle('error', !!isError);

        const icon = successToast.querySelector('.success-toast-icon i');
        const strongEl = successToast.querySelector('.success-toast-body strong');
        const spanEl = successToast.querySelector('.success-toast-body span');

        if (isError) {
            if (icon) icon.className = 'fa-solid fa-triangle-exclamation';
            if (strongEl) strongEl.textContent = "Couldn't send message";
            if (spanEl) spanEl.textContent = 'Something went wrong — please email techsarvjeet123@gmail.com directly.';
        } else {
            if (icon) icon.className = 'fa-solid fa-check';
            if (strongEl) strongEl.textContent = 'Message sent!';
            if (spanEl) spanEl.textContent = 'Thanks for reaching out — Sarvjeet will get back to you soon.';
        }

        successToast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => successToast.classList.remove('show'), 6000);
    }

    if (successToastClose) {
        successToastClose.addEventListener('click', () => {
            successToast.classList.remove('show');
            clearTimeout(toastTimer);
        });
    }

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !subject || !message) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill out every field before sending.';
                    formStatus.className = 'form-status error';
                }
                return;
            }

            if (formStatus) {
                formStatus.textContent = 'Sending your message...';
                formStatus.className = 'form-status';
            }
            if (contactSubmitBtn) contactSubmitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }
                    showToast(false);
                    form.reset();
                } else {
                    if (formStatus) {
                        formStatus.textContent = 'Something went wrong. Please try again or email directly.';
                        formStatus.className = 'form-status error';
                    }
                    showToast(true);
                }
            } catch (err) {
                if (formStatus) {
                    formStatus.textContent = 'Network error — please check your connection and try again.';
                    formStatus.className = 'form-status error';
                }
                showToast(true);
            } finally {
                if (contactSubmitBtn) contactSubmitBtn.disabled = false;
            }
        });
    }

    /* ---------------- Typewriter (role text) ---------------- */
    const appEl = document.getElementById('app');
    if (appEl && window.Typewriter) {
        const typewriter = new Typewriter(appEl, { loop: true });
        typewriter
            .typeString('Full Stack Web Developer')
            .pauseFor(2200)
            .deleteAll()
            .typeString('PHP & Laravel Developer')
            .pauseFor(2200)
            .deleteAll()
            .typeString('Full Stack Engineer')
            .pauseFor(2200)
            .start();
    }

    /* ---------------- Terminal typing animation ---------------- */
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) {
        const cmdEl = document.getElementById('termCmd');
        const cmdCursor = document.getElementById('termCursorCmd');
        const outLines = terminalBody.querySelectorAll('.t-out');
        const endLine = terminalBody.querySelector('.t-end');
        const fullCmd = cmdEl.dataset.text || 'whoami';
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let runId = 0;

        function showAllInstantly() {
            cmdEl.textContent = fullCmd;
            cmdCursor.classList.add('is-hidden');
            outLines.forEach((line) => line.classList.add('is-visible'));
            endLine.classList.add('is-visible');
        }

        async function playTerminal() {
            const id = ++runId;

            // reset to the empty state
            cmdEl.textContent = '';
            cmdCursor.classList.remove('is-hidden');
            outLines.forEach((line) => line.classList.remove('is-visible'));
            endLine.classList.remove('is-visible');

            await sleep(600);

            // type the command character by character
            for (const ch of fullCmd) {
                if (id !== runId) return;
                cmdEl.textContent += ch;
                await sleep(80 + Math.random() * 90);
            }

            // "press enter", then print the result line by line
            await sleep(450);
            if (id !== runId) return;
            cmdCursor.classList.add('is-hidden');
            await sleep(300);

            for (const line of outLines) {
                if (id !== runId) return;
                line.classList.add('is-visible');
                await sleep(340);
            }

            await sleep(250);
            if (id !== runId) return;
            endLine.classList.add('is-visible');
        }

        if (reduceMotion) {
            showAllInstantly();
        } else if ('IntersectionObserver' in window) {
            const termObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    playTerminal();
                    termObserver.disconnect();
                }
            }, { threshold: 0.4 });
            termObserver.observe(terminalBody);
        } else {
            playTerminal();
        }

        // click the terminal to replay the animation
        const terminalWindow = terminalBody.closest('.terminal');
        if (terminalWindow && !reduceMotion) {
            terminalWindow.style.cursor = 'pointer';
            terminalWindow.addEventListener('click', playTerminal);
        }
    }

    /* ---------------- Project access (PIN-protected GitHub links) ---------------- */
    // The GitHub links are stored AES-GCM encrypted in each button's data-enc attribute.
    // The PIN is the decryption key, so the links are not readable in the page source.
    // To change the PIN or the links, use pin-generator.html (keep that file on your computer only).
    const PIN_SALT = '4McP7fdgicewHFOGM0/LbQ==';
    const PIN_ITERATIONS = 120000;
    const PIN_LENGTH = 6;
    const MAX_ATTEMPTS = 5;
    const LOCK_SECONDS = 30;

    const pinOverlay = document.getElementById('pinOverlay');

    if (pinOverlay) {
        const pinBox = document.getElementById('pinBox');
        const pinDigits = Array.from(document.querySelectorAll('#pinInputs input'));
        const pinError = document.getElementById('pinError');
        const pinSubmit = document.getElementById('pinSubmit');
        const pinClose = document.getElementById('pinClose');
        const pinIcon = document.getElementById('pinIcon');
        const pinProjectName = document.getElementById('pinProjectName');
        const pinSuccessText = document.getElementById('pinSuccessText');
        const pinOpenLink = document.getElementById('pinOpenLink');
        const pinRequest = document.getElementById('pinRequest');
        const pinInputsWrap = document.getElementById('pinInputs');

        let activeBlob = null;
        let activeTrigger = null;
        let failedAttempts = 0;
        let lockedUntil = 0;
        let lockTimer = null;
        let busy = false;

        function b64ToBytes(b64) {
            return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        }

        async function decryptLink(blob, pin) {
            const enc = new TextEncoder();
            const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveKey']);
            const key = await crypto.subtle.deriveKey(
                { name: 'PBKDF2', salt: b64ToBytes(PIN_SALT), iterations: PIN_ITERATIONS, hash: 'SHA-256' },
                keyMaterial,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );
            const data = b64ToBytes(blob);
            const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: data.slice(0, 12) }, key, data.slice(12));
            return new TextDecoder().decode(plain);
        }

        const getPin = () => pinDigits.map((i) => i.value).join('');
        const setError = (msg) => { pinError.textContent = msg || ''; };

        function clearDigits() {
            pinDigits.forEach((i) => { i.value = ''; i.classList.remove('filled'); });
        }

        function shake() {
            pinInputsWrap.classList.remove('shake');
            void pinInputsWrap.offsetWidth; // restart the animation
            pinInputsWrap.classList.add('shake');
        }

        function resetPin() {
            pinBox.classList.remove('is-success');
            pinIcon.className = 'fa-solid fa-lock';
            pinOpenLink.hidden = true;
            pinSuccessText.textContent = 'Opening the repository on GitHub…';
            clearDigits();
            setError('');
            busy = false;
            pinSubmit.textContent = 'Unlock';
        }

        function updateLockMessage() {
            const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
            clearTimeout(lockTimer);
            if (remaining > 0) {
                setError('Too many attempts. Try again in ' + remaining + 's.');
                pinSubmit.disabled = true;
                lockTimer = setTimeout(updateLockMessage, 1000);
            } else {
                if (lockedUntil) {
                    lockedUntil = 0;
                    failedAttempts = 0;
                    setError('');
                }
                pinSubmit.disabled = false;
            }
        }

        function openPin(btn) {
            activeTrigger = btn;
            activeBlob = btn.getAttribute('data-enc');
            const card = btn.closest('.case-card');
            const nameEl = card && card.querySelector('.name');
            pinProjectName.textContent = nameEl ? nameEl.textContent.trim() : 'this project';
            resetPin();
            pinOverlay.classList.add('show');
            pinOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            updateLockMessage();
            setTimeout(() => pinDigits[0].focus(), 60);
        }

        function closePin(restoreFocus = true) {
            pinOverlay.classList.remove('show');
            pinOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            clearTimeout(lockTimer);
            clearDigits();
            if (restoreFocus && activeTrigger) activeTrigger.focus({ preventScroll: true });
        }

        function onSuccess(url) {
            failedAttempts = 0;
            pinBox.classList.add('is-success');
            pinIcon.className = 'fa-solid fa-lock-open';
            pinOpenLink.href = url;
            const win = window.open(url, '_blank');
            if (win) {
                win.opener = null;
                setTimeout(() => closePin(), 1300);
            } else {
                pinSuccessText.textContent = 'Your browser blocked the new tab. Use the button below.';
                pinOpenLink.hidden = false;
            }
        }

        async function submitPin() {
            if (busy || Date.now() < lockedUntil) return;
            const pin = getPin();

            if (pin.length !== PIN_LENGTH) {
                setError('Enter all ' + PIN_LENGTH + ' digits.');
                shake();
                return;
            }
            if (!(window.crypto && window.crypto.subtle)) {
                setError('PIN check needs a secure (https) connection.');
                return;
            }

            busy = true;
            pinSubmit.disabled = true;
            pinSubmit.textContent = 'Checking…';
            setError('');

            try {
                const url = await decryptLink(activeBlob, pin);
                if (!/^https:\/\/github\.com\//.test(url)) throw new Error('Unexpected link');
                onSuccess(url);
            } catch (err) {
                failedAttempts += 1;
                clearDigits();
                shake();
                if (failedAttempts >= MAX_ATTEMPTS) {
                    lockedUntil = Date.now() + LOCK_SECONDS * 1000;
                    updateLockMessage();
                } else {
                    const left = MAX_ATTEMPTS - failedAttempts;
                    setError('Incorrect PIN. ' + left + (left === 1 ? ' attempt' : ' attempts') + ' left.');
                }
                pinDigits[0].focus();
            } finally {
                busy = false;
                pinSubmit.textContent = 'Unlock';
                if (Date.now() >= lockedUntil) pinSubmit.disabled = false;
            }
        }

        pinDigits.forEach((input, idx) => {
            const last = pinDigits.length - 1;

            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '').slice(-1);
                input.classList.toggle('filled', !!input.value);
                if (input.value && idx < last) pinDigits[idx + 1].focus();
                if (pinDigits.every((i) => i.value)) submitPin();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && idx > 0) {
                    e.preventDefault();
                    pinDigits[idx - 1].value = '';
                    pinDigits[idx - 1].classList.remove('filled');
                    pinDigits[idx - 1].focus();
                } else if (e.key === 'ArrowLeft' && idx > 0) {
                    pinDigits[idx - 1].focus();
                } else if (e.key === 'ArrowRight' && idx < last) {
                    pinDigits[idx + 1].focus();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    submitPin();
                }
            });

            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = (e.clipboardData && e.clipboardData.getData('text')) || '';
                const digits = text.replace(/\D/g, '').slice(0, PIN_LENGTH);
                digits.split('').forEach((d, i) => {
                    pinDigits[i].value = d;
                    pinDigits[i].classList.add('filled');
                });
                pinDigits[Math.min(digits.length, last)].focus();
                if (digits.length === PIN_LENGTH) submitPin();
            });

            input.addEventListener('focus', () => input.select());
        });

        document.querySelectorAll('.proj-btn').forEach((btn) => {
            btn.addEventListener('click', () => openPin(btn));
        });

        pinSubmit.addEventListener('click', submitPin);
        pinClose.addEventListener('click', () => closePin());
        pinRequest.addEventListener('click', () => closePin(false));

        pinOverlay.addEventListener('click', (e) => {
            if (e.target === pinOverlay) closePin();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pinOverlay.classList.contains('show')) closePin();
        });

        // Keep keyboard focus inside the dialog while it is open
        pinOverlay.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const focusable = Array.from(pinBox.querySelectorAll('button, a[href], input'))
                .filter((el) => !el.disabled && !el.hidden && el.offsetParent !== null);
            if (!focusable.length) return;
            const first = focusable[0];
            const lastEl = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    /* ---------------- About reel video ---------------- */
    const reelVideo = document.getElementById('reelVideo');

    if (reelVideo) {
        const reelCard = document.getElementById('reelCard');
        const reelPlay = document.getElementById('reelPlay');
        const reelMute = document.getElementById('reelMute');
        const reelCenter = document.getElementById('reelCenter');
        const reelProgress = document.getElementById('reelProgress');
        const reelFill = document.getElementById('reelProgressFill');
        const reelFallback = document.getElementById('reelFallback');
        const reelPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let reelInView = false;
        let reelUserPaused = reelPrefersReducedMotion; // reduced motion: wait for the visitor to press play

        function setPlayUi(isPlaying) {
            const icon = reelPlay.querySelector('i');
            icon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
            reelPlay.setAttribute('aria-label', isPlaying ? 'Pause video' : 'Play video');
            reelCenter.hidden = isPlaying;
        }

        function playReel() {
            const attempt = reelVideo.play();
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(() => setPlayUi(false)); // autoplay blocked: show the big play button
            }
        }

        function pauseReel() {
            reelVideo.pause();
        }

        reelVideo.addEventListener('play', () => setPlayUi(true));
        reelVideo.addEventListener('pause', () => setPlayUi(false));

        // Countdown in the badge: shows the time left, ticking down with the video
        const reelTime = document.getElementById('reelTime');

        function formatReelTime(seconds) {
            const total = Math.max(0, Math.ceil(seconds));
            return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
        }

        function updateReelTime() {
            const duration = reelVideo.duration;
            if (!reelTime || !duration || !isFinite(duration)) return;
            const label = formatReelTime(duration - reelVideo.currentTime);
            if (reelTime.textContent !== label) reelTime.textContent = label;
        }

        reelVideo.addEventListener('loadedmetadata', updateReelTime);
        reelVideo.addEventListener('seeked', updateReelTime);

        reelVideo.addEventListener('timeupdate', () => {
            if (reelVideo.duration) {
                reelFill.style.width = (reelVideo.currentTime / reelVideo.duration) * 100 + '%';
            }
            updateReelTime();
        });

        function togglePlay() {
            if (reelVideo.paused) {
                reelUserPaused = false;
                playReel();
            } else {
                reelUserPaused = true;
                pauseReel();
            }
        }

        reelPlay.addEventListener('click', togglePlay);
        reelVideo.addEventListener('click', togglePlay);
        reelCenter.addEventListener('click', () => {
            reelUserPaused = false;
            playReel();
        });

        reelMute.addEventListener('click', () => {
            reelVideo.muted = !reelVideo.muted;
            reelMute.querySelector('i').className = reelVideo.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
            reelMute.setAttribute('aria-label', reelVideo.muted ? 'Unmute video' : 'Mute video');
            reelMute.classList.remove('reel-btn--hint');
        });

        reelProgress.addEventListener('click', (e) => {
            if (!reelVideo.duration) return;
            const rect = reelProgress.getBoundingClientRect();
            reelVideo.currentTime = ((e.clientX - rect.left) / rect.width) * reelVideo.duration;
        });

        // If the file is missing or can't play, show a tidy fallback instead of a broken player
        function showReelFallback() {
            reelCard.classList.add('is-broken');
            reelFallback.hidden = false;
        }
        reelVideo.addEventListener('error', showReelFallback);
        const reelSource = reelVideo.querySelector('source');
        if (reelSource) reelSource.addEventListener('error', showReelFallback);

        // Play only while the video is on screen (saves data and battery), pause when it leaves
        if ('IntersectionObserver' in window) {
            const reelObserver = new IntersectionObserver((entries) => {
                reelInView = entries[0].isIntersecting;
                if (reelInView && !reelUserPaused) {
                    playReel();
                } else if (!reelInView) {
                    pauseReel();
                }
            }, { threshold: 0.4 });
            reelObserver.observe(reelVideo);
        } else if (!reelUserPaused) {
            playReel();
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pauseReel();
            } else if (reelInView && !reelUserPaused) {
                playReel();
            }
        });

        setPlayUi(false);
    }

    /* ---------------- Scroll reveal ---------------- */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('in-view'));
    }

    /* ---------------- AOS init ---------------- */
    if (window.AOS) {
        AOS.init({ once: true });
    }
});
