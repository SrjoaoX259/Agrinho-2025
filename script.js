document.addEventListener('DOMContentLoaded', () => {
    const sectionsToAnimate = document.querySelectorAll('#video-campo, #video-troca, #conclusao');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                const videoTextElement = entry.target.querySelector('.texto-central.video-texto');
                if (videoTextElement) {
                    videoTextElement.classList.add('is-visible');
                }
                const videoElement = entry.target.querySelector('.video-extra');
                if (videoElement) {
                    videoElement.classList.add('is-visible');
                }
            } else {
                entry.target.classList.remove('is-visible');
                const videoTextElement = entry.target.querySelector('.texto-central.video-texto');
                if (videoTextElement) {
                    videoTextElement.classList.remove('is-visible');
                }
                const videoElement = entry.target.querySelector('.video-extra');
                if (videoElement) {
                    videoElement.classList.remove('is-visible');
                }
            }
        });
    };

    const contentObserver = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToAnimate.forEach(section => {
        contentObserver.observe(section);
    });

    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let circles = [];
    const circleColor = '#3ddc84';

    class ExpandingCircle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 20;
            this.alpha = 1;
            this.growthRate = 2;
            this.fadeRate = 0.02;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = circleColor;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        }

        update() {
            this.radius += this.growthRate;
            this.alpha -= this.fadeRate;
            if (this.alpha < 0) this.alpha = 0;
        }
    }

    function createExpandingCircle(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        circles.push(new ExpandingCircle(mouseX, mouseY));
    }

    document.addEventListener('click', createExpandingCircle);

    function animateCircles() {
        requestAnimationFrame(animateCircles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles = circles.filter(circle => circle.alpha > 0);
        for (let i = 0; i < circles.length; i++) {
            circles[i].update();
            circles[i].draw();
        }
    }

    animateCircles();

    const body = document.body;
    const root = document.documentElement;

    const toggleContrastButton = document.getElementById('toggle-contrast');
    if (toggleContrastButton) {
        toggleContrastButton.addEventListener('click', () => {
            body.classList.toggle('high-contrast');
            localStorage.setItem('high-contrast', body.classList.contains('high-contrast'));
        });
        if (localStorage.getItem('high-contrast') === 'true') {
            body.classList.add('high-contrast');
        }
    }

    const aumentarFonteButton = document.getElementById('aumentar-fonte');
    const diminuirFonteButton = document.getElementById('diminuir-fonte');
    const resetarFonteButton = document.getElementById('resetar-fonte');

    let currentFontSizeMultiplier = parseFloat(localStorage.getItem('fontSizeMultiplier')) || 1;
    root.style.setProperty('--multiplicador-fonte', currentFontSizeMultiplier);

    function updateFontSize() {
        root.style.setProperty('--multiplicador-fonte', currentFontSizeMultiplier);
        localStorage.setItem('fontSizeMultiplier', currentFontSizeMultiplier);
        if (currentFontSizeMultiplier > 1) {
            body.classList.add('font-increased');
        } else {
            body.classList.remove('font-increased');
        }
    }

    if (aumentarFonteButton) {
        aumentarFonteButton.addEventListener('click', () => {
            if (currentFontSizeMultiplier < 1.5) {
                currentFontSizeMultiplier += 0.1;
                updateFontSize();
            }
        });
    }

    if (diminuirFonteButton) {
        diminuirFonteButton.addEventListener('click', () => {
            if (currentFontSizeMultiplier > 0.8) {
                currentFontSizeMultiplier -= 0.1;
                updateFontSize();
            }
        });
    }

    if (resetarFonteButton) {
        resetarFonteButton.addEventListener('click', () => {
            currentFontSizeMultiplier = 1;
            updateFontSize();
        });
    }

    const hamburgerButton = document.getElementById('hamburgerButton');
    const mainNav = document.getElementById('mainNav');

    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            hamburgerButton.classList.toggle('open');
            mainNav.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    hamburgerButton.classList.remove('open');
                    mainNav.classList.remove('active');
                }
            });
        });
    }
});