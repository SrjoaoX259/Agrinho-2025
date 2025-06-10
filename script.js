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
});
