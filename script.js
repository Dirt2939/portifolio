const container = document.querySelector('.maquina-escrever');
const words = ["Web Developer", "Software Engineer", "Full-stack Developer", "Data Analyst", "UI/UX Designer"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 150; // Velocidade ao digitar
const eraseSpeed = 100; // Velocidade ao apagar
const delayBetweenWords = 2000; // Tempo que a palavra fica exposta

function type() {
    const currentWord = words[wordIndex];

    // Dentro da função type()
    if (isDeleting) {
        // Se o charIndex for 0, mantemos uma string vazia, 
        // mas o min-height do CSS vai segurar o tranco.
        container.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Adiciona uma letra
        container.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Lógica de pausa e troca de estado
    let nextSpeed = isDeleting ? eraseSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        // Terminou de digitar a palavra toda
        nextSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Terminou de apagar, vai para a próxima palavra
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Volta ao início se acabar
        nextSpeed = 500;
    }

    setTimeout(type, nextSpeed);
}

// Inicia a animação quando a página carregar
window.onload = () => {
    setTimeout(type, 500); 
};