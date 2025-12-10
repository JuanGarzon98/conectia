// CONECTIA - JavaScript para funcionalidades del sitio

document.addEventListener('DOMContentLoaded', function() {

    /* ===============================
       MENÚ MÓVIL
    =============================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');

        const spans = this.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    /* ===============================
       CONTADOR DE CARACTERES
    =============================== */
    const descripcion = document.getElementById('descripcion');
    const charCount = document.getElementById('charCount');

    if (descripcion && charCount) {
        descripcion.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength}/200 caracteres`;

            if (currentLength > 190) {
                charCount.classList.add('error');
            } else {
                charCount.classList.remove('error');
            }
        });
    }

    /* ===============================
       FORMULARIO → ENVÍO A WHATSAPP
    =============================== */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const pais = document.getElementById('pais').value;
            const celular = document.getElementById('celular').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();

            if (!nombre || !pais || !celular || !descripcion) {
                showMessage('Por favor completa todos los campos obligatorios.', 'error');
                return;
            }

            if (descripcion.length > 200) {
                showMessage('La descripción no puede exceder los 200 caracteres.', 'error');
                return;
            }

            const numero = "573135393011";

            const mensaje =
                `Hola CONECTIA,%0A%0A` +
                `Quiero solicitar un servicio.%0A%0A` +
                `👤 Nombre: ${nombre}%0A` +
                `🌎 País: ${pais}%0A` +
                `📱 Celular: ${celular}%0A` +
                `📝 Descripción: ${descripcion}%0A%0A` +
                `¡Quedo atento!`;

            const url = `https://wa.me/${numero}?text=${mensaje}`;

            window.open(url, "_blank");

            showMessage('Redirigiendo a WhatsApp...', 'success');

            contactForm.reset();
            if (charCount) charCount.textContent = '0/200 caracteres';
        });
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    /* ===============================
       SCROLL SUAVE
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '#inicio') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            e.preventDefault();
            const targetElement = document.querySelector(href);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===============================
       ANIMACIONES AL SCROLLEAR
    =============================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .form-container, .about-content');
    animateElements.forEach(element => {
        observer.observe(element);
    });

});

/* ===============================
   EFECTO DEL HEADER AL SCROLL
=============================== */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--color-negro)';
        header.style.backdropFilter = 'none';
    }
});
