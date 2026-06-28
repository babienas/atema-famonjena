// 1. DÉFINITION GLOBALE DE LA FONCTION DE QUIZ (Accessible par les boutons HTML)
window.checkAnswer = function(resultId, isCorrect, message, isLastQuestion = false) {
    const result = document.getElementById(resultId);
    if (!result) return;

    result.classList.remove("success-anim", "error-anim");
    void result.offsetWidth; // Force le recalcul pour rejouer l'animation
    result.innerText = message;

    if (isCorrect) {
        result.style.color = "#27ae60";
        result.classList.add("success-anim");
    } else {
        result.style.color = "#c0392b";
        result.classList.add("error-anim");
    }

    if (isLastQuestion) {
        const finalImage = document.getElementById("final-surprise");
        if (finalImage) {
            finalImage.style.display = "block";
        }
    }
};

// 2. LOGIQUE PRINCIPALE AU CHARGEMENT DE LA PAGE
document.addEventListener("DOMContentLoaded", () => {
    
    // --- MACHINE À ÉCRIRE (Page d'accueil) ---
    const textElement = document.getElementById("typewriter-text");
    const hiddenMessage = document.getElementById("hidden-message");
    
    if (textElement && hiddenMessage) {
        const messageText = hiddenMessage.innerText;
        let index = 0;
        function typeWriter() {
            if (index < messageText.length) {
                textElement.innerHTML += messageText.charAt(index);
                index++;
                setTimeout(typeWriter, 40);
            }
        }
        setTimeout(typeWriter, 800);
    }

    // --- CONFETTIS (Page d'accueil) ---
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let isConfettiActive = false;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function fireConfetti() {
            if (isConfettiActive) return;
            isConfettiActive = true;
            const colors = ['#d4af37', '#ffb6c1', '#a18cd1', '#ffffff', '#87CEEB'];
            for (let i = 0; i < 150; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height - canvas.height,
                    w: Math.random() * 10 + 5,
                    h: Math.random() * 10 + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speedY: Math.random() * 3 + 2,
                    speedX: Math.random() * 2 - 1,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5
                });
            }
            animateConfetti();
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activeParticles = 0;
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotationSpeed;
                ctx.save();
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
                if (p.y < canvas.height) activeParticles++;
            }
            if (activeParticles > 0) requestAnimationFrame(animateConfetti);
            else { isConfettiActive = false; particles = []; }
        }

        fireConfetti();
    }

    // --- PLUIE DE CŒURS (Page Anecdote) ---
    const heartCanvas = document.getElementById("heart-canvas");
    if (heartCanvas) {
        const ctxHeart = heartCanvas.getContext("2d");
        let hearts = [];
        let isHeartsActive = false;

        function resizeHeartCanvas() {
            heartCanvas.width = window.innerWidth;
            heartCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeHeartCanvas);
        resizeHeartCanvas();

        function fireHearts() {
            if (isHeartsActive) return;
            isHeartsActive = true;
            
            const heartEmojis = ['❤️', '💖', '💕', '✨', '🤍'];
            
            for (let i = 0; i < 70; i++) {
                hearts.push({
                    x: Math.random() * heartCanvas.width,
                    y: Math.random() * heartCanvas.height - heartCanvas.height,
                    size: Math.random() * 20 + 15,
                    emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
                    speedY: Math.random() * 10 + 5,
                    speedX: Math.random() * 1 - 0.5,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 2 - 1
                });
            }
            animateHearts();
        }

        function animateHearts() {
            ctxHeart.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
            let activeHearts = 0;
            
            for (let i = 0; i < hearts.length; i++) {
                let h = hearts[i];
                h.y += h.speedY; 
                h.x += h.speedX; 
                h.rotation += h.rotationSpeed;
                
                ctxHeart.save();
                ctxHeart.translate(h.x, h.y);
                ctxHeart.rotate(h.rotation * Math.PI / 180);
                ctxHeart.font = h.size + "px Arial";
                ctxHeart.textAlign = "center";
                ctxHeart.textBaseline = "middle";
                ctxHeart.fillText(h.emoji, 0, 0);
                ctxHeart.restore();
                
                if (h.y < heartCanvas.height + 50) activeHearts++;
            }
            
            if (activeHearts > 0) {
                requestAnimationFrame(animateHearts);
            } else { 
                isHeartsActive = false; 
                hearts = []; 
            }
        }
        fireHearts();
    }

    // --- MUSIQUE (Lancement au clic sur la page d'accueil) ---
    const music = document.getElementById("bg-music");
    function startMusicOnClick() {
        if (music) {
            music.play().then(() => {
                document.removeEventListener("click", startMusicOnClick);
            }).catch(e => console.log("Attente interaction..."));
        }
    }
    
    // Si la balise audio existe sur la page en cours, on active l'écouteur de clic
    if (music) {
        document.addEventListener("click", startMusicOnClick);
    }
});