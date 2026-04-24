gsap.registerPlugin(ScrollTrigger);

// --- 1. MÁQUINA DE ESCREVER ---
const containerTexto = document.querySelector('.maquina-escrever');
const words = ["Web Developer", "Software Engineer", "Full-stack Developer", "UI/UX Designer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        containerTexto.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        containerTexto.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let nextSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        nextSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        nextSpeed = 500;
    }
    setTimeout(type, nextSpeed);
}
window.onload = () => setTimeout(type, 500);


// --- 2. ANIMAÇÃO DA HERO (Abertura de Cortina) ---
const heroTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",      // <-- Gatilho correto
        start: "top top",
        end: "+=100%",         // <-- Cria 100% de tela de "falso scroll" para a animação durar mais
        scrub: 1,
        pin: true,             // Trava a hero na tela
    }
});

heroTl.to(".bg-left", { xPercent: -100, ease: "none" }, 0)
    .to(".bg-right", { xPercent: 100, ease: "none" }, 0)
    .to(".conteudo", { opacity: 0, scale: 0.8, ease: "none" }, 0);

