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

    /* ---------------- Welcome modal ---------------- */
    const modal = document.getElementById('welcomeModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCloseBtn2 = document.getElementById('modalCloseBtn2');
    const modalViewProjects = document.getElementById('modalViewProjects');

    function showModal() {
        if (modal && !sessionStorage.getItem('modalSeen')) {
            // Small delay so the entrance animation is noticeable rather than instant
            setTimeout(() => modal.classList.add('show'), 400);
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            sessionStorage.setItem('modalSeen', 'true');
        }
    }

    showModal();
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseBtn2) modalCloseBtn2.addEventListener('click', closeModal);
    if (modalViewProjects) {
        modalViewProjects.addEventListener('click', () => {
            closeModal();
            const projSection = document.getElementById('proj');
            if (projSection) projSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
        });
    }

    /* ---------------- Project access popup ---------------- */
    let projectLinkToOpen = null;
    const projectButtons = document.querySelectorAll('.proj-btn');
    const projectAccessPopup = document.getElementById('projectAccessPopup');
    const projUserName = document.getElementById('projUserName');
    const projErrorMsg = document.getElementById('proj-error-msg');
    const projSubmitBtn = document.getElementById('projSubmitBtn');
    const projCloseBtn = document.getElementById('projCloseBtn');

    projectButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            projectLinkToOpen = this.getAttribute('data-link');
            if (projectAccessPopup) projectAccessPopup.style.display = 'flex';
            if (projUserName) projUserName.focus();
        });
    });

    if (projSubmitBtn) {
        projSubmitBtn.addEventListener('click', () => {
            const userName = projUserName ? projUserName.value.trim() : '';

            if (userName === '') {
                if (projErrorMsg) projErrorMsg.textContent = 'Please enter your full name.';
                return;
            }

            if (projErrorMsg) projErrorMsg.textContent = '';
            if (projectAccessPopup) projectAccessPopup.style.display = 'none';

            if (projectLinkToOpen) {
                window.open(projectLinkToOpen, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (projCloseBtn) {
        projCloseBtn.addEventListener('click', () => {
            if (projectAccessPopup) projectAccessPopup.style.display = 'none';
            if (projUserName) projUserName.value = '';
            if (projErrorMsg) projErrorMsg.textContent = '';
        });
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
