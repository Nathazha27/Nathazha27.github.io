// Reducción del header al scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const newHeight = Math.max(50, 100 - scrollY / 10); // Mínimo 50vh
    header.style.height = newHeight + 'vh';
});

// Cursor reveal en el body
const main = document.getElementById('main');
const revealLayer = document.querySelector('.reveal-layer');
const revealLight = document.querySelector('.reveal-light');
const revealContent = document.querySelector('.reveal-content');
const lightDetailsOverlay = document.querySelector('.light-details-overlay');

// Aplicar estilos iniciales
revealLayer.style.opacity = '0';
revealLayer.style.transition = 'opacity 0.3s ease';
if (revealLight) {
    revealLight.style.opacity = '0';
    revealLight.style.transition = 'opacity 0.3s ease';
}
if (lightDetailsOverlay) {
    lightDetailsOverlay.style.opacity = '0';
    lightDetailsOverlay.style.transition = 'opacity 0.3s ease';
}

let pendingFrame = false;
let targetX = 0;
let targetY = 0;
const maskSize = 300; // Debe coincidir con mask-size en CSS
const lightMaskSize = 300; // Tamaño del light overlay

const updateMaskPosition = () => {
    revealLayer.style.maskPosition = `${targetX}px ${targetY}px`;
    if (revealLight) {
        revealLight.style.maskPosition = `${targetX}px ${targetY}px`;
    }
    revealContent.style.maskPosition = `${targetX}px ${targetY}px`;
    if (lightDetailsOverlay) {
        lightDetailsOverlay.style.maskPosition = `${targetX + (maskSize - lightMaskSize) / 2}px ${targetY + (maskSize - lightMaskSize) / 2}px`;
    }
    pendingFrame = false;
};

const showReveal = () => {
    revealLayer.style.opacity = '1';
    if (revealLight) {
        revealLight.style.opacity = '1';
    }
    if (lightDetailsOverlay) {
        lightDetailsOverlay.style.opacity = '1';
    }
};

const hideReveal = () => {
    revealLayer.style.opacity = '0';
    if (revealLight) {
        revealLight.style.opacity = '0';
    }
    if (lightDetailsOverlay) {
        lightDetailsOverlay.style.opacity = '0';
    }
};

main.addEventListener('mouseenter', showReveal);
main.addEventListener('mousemove', (e) => {
    const rect = main.getBoundingClientRect();
    targetX = e.clientX - rect.left - maskSize / 2;
    targetY = e.clientY - rect.top - maskSize / 2;

    if (!pendingFrame) {
        pendingFrame = true;
        requestAnimationFrame(updateMaskPosition);
    }
});

main.addEventListener('mouseleave', hideReveal);

// Glass shimmer animation para las features - Gradiente diagonal lineal
const shimmerDuration = 2500;

const setupFeatureHover = (feature) => {
    let animationId = null;
    let startTime = null;

    const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = (currentTime - startTime) % shimmerDuration;
        const progress = (elapsed / shimmerDuration) * 100;
        
        const offset = (progress * 2) - 50;
        const p1 = offset, p2 = offset + 25, p3 = offset + 50;

        feature.style.backgroundImage = `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.05) ${p1}%, 
            rgba(200, 230, 255, 0.3) ${p2}%, 
            rgba(255, 255, 255, 0.05) ${p3}%,
            rgba(255, 255, 255, 0.05) 100%)`;

        animationId = requestAnimationFrame(animate);
    };

    feature.addEventListener('mouseenter', () => {
        startTime = performance.now(); // Reiniciamos el tiempo para que empiece de cero
        animationId = requestAnimationFrame(animate);
    });

    feature.addEventListener('mouseleave', () => {
        cancelAnimationFrame(animationId); // Detenemos la animación
        // Opcional: Limpiamos el fondo al salir o lo dejamos en el estado base
        feature.style.backgroundImage = ''; 
    });
};

// Inicializamos todas
document.querySelectorAll('.feature, .btn-download').forEach(setupFeatureHover);

const logoFire = document.querySelector('.logo');
let phase = 0;

const animateFire = () => {
    phase += .05;
    const noise = (Math.sin(phase) + Math.sin(phase * .7) + Math.sin(phase * 1.3) / 3);
    const alpha = 0.1 + (noise * 0.1);

    logoFire.style.filter = `drop-shadow(0 0 10px rgba(255, 255, 200, ${alpha}))`;
    requestAnimationFrame(animateFire);
}

animateFire();

const cursor = document.querySelector('.main-page-cursor'); // Más directo que querySelectorAll
if (cursor) animateCursor(cursor);

function animateCursor(_cursor) {
    document.addEventListener('mousemove', (e) => {
        // 1. Posicionamiento
        requestAnimationFrame(() => {
            _cursor.style.left = `${e.clientX}px`;
            _cursor.style.top = `${e.clientY}px`;
        });

        // 2. Detección de Hover (DENTRO del evento para tener acceso a 'e')
        const isClickable = e.target.closest('a, button, .btn-download');

        if (isClickable) {
            _cursor.style.backgroundImage = "url('Resources/Img/PointerInteract.png')";
            _cursor.classList.add('cursor-hover');
        } else {
            _cursor.style.backgroundImage = "url('Resources/Img/PointerDefault.png')";
            _cursor.classList.remove('cursor-hover');
        }
    });
}

