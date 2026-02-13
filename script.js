document.addEventListener('DOMContentLoaded', () => {
    
    const slidesData = [
        { 
            src: "premier.jpg", 
            text: "Merci d'être là pour moi" 
        },
        { 
            src: "deuxieme.jpg", 
            text: "D'être aussi rayonante et précieuse" 
        },
        { 
            src: "troisieme.jpg", 
            text: "Ta présence est une bénédiction et un don du ciel" 
        },
        { 
            src: "quatrieme.jpg", 
            text: "Jamais, je ne cesserai de t'aimer, tant qu'il y a de la vie en moi " 
        }
    ];

    const heartContainer = document.getElementById('heart-container');
    const cardContainer = document.getElementById('card-container');
    const card = document.querySelector('.card');
    const floatingElementsContainer = document.getElementById('floating-elements-container');
    const btnNo = document.getElementById('btn-no');
    const btnNoWrapper = document.getElementById('btn-no-wrapper');
    const btnYes = document.getElementById('btn-yes');
    const btnYesWrapper = document.getElementById('btn-yes-wrapper');
    const finalCardContainer = document.getElementById('final-card-container');
    const btnOpenSlideshow = document.getElementById('btn-open-slideshow');
    const slideshowOverlay = document.getElementById('slideshow-overlay');
    const btnCloseSlideshow = document.getElementById('btn-close-slideshow');
    const slideImg = document.getElementById('slide-img');
    const slideText = document.getElementById('slide-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let noInteractionCount = 0;
    const maxDodges = 5;
    let isButtonBroken = false;
    let currentSlideIndex = 0;

    const moves = [
        { x: -50, y: -40, rot: -10 },
        { x: 50, y: -40, rot: 10 },
        { x: -40, y: 40, rot: -5 },
        { x: 40, y: 40, rot: 5 },
        { x: 0, y: 0, rot: 0 }
    ];

    heartContainer.addEventListener('click', () => {
        heartContainer.style.animation = 'none';
        void heartContainer.offsetWidth;
        heartContainer.classList.add('zoomed-in');
        setTimeout(() => { document.body.style.background = 'var(--stripe-red)'; }, 200);
        setTimeout(() => {
            heartContainer.style.display = 'none';
            cardContainer.classList.remove('hidden');
            setTimeout(() => card.classList.add('visible'), 50);
            floatingElementsContainer.classList.remove('hidden');
            setTimeout(() => floatingElementsContainer.classList.add('visible'), 50);
        }, 800);
    });

    btnNo.addEventListener('mouseover', () => {
        if (isButtonBroken || noInteractionCount >= maxDodges) return;
        const move = moves[noInteractionCount];
        btnNo.style.transform = `translate(${move.x}px, ${move.y}px) rotate(${move.rot}deg)`;
        noInteractionCount++;
    });

    btnNo.addEventListener('click', () => {
        if (noInteractionCount >= maxDodges && !isButtonBroken) breakTheButton();
    });

    function breakTheButton() {
        isButtonBroken = true;
        btnNo.style.opacity = '0';
        const shards = btnNoWrapper.querySelectorAll('.shard');
        shards[0].classList.add('animate-shatter-left');
        shards[1].classList.add('animate-shatter-right');
        setTimeout(() => {
            btnNoWrapper.style.display = 'none';
            btnYes.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btnYes.style.transform = 'scale(1.2)';
            btnYesWrapper.style.flex = '1';
        }, 500);
    }

    btnYes.addEventListener('click', () => {
        card.style.transform = 'scale(0.8)'; card.style.opacity = '0';
        setTimeout(() => {
            cardContainer.classList.add('hidden');
            document.body.style.background = '#ffebee'; 
            finalCardContainer.classList.remove('hidden');
            const finalCard = finalCardContainer.querySelector('.card');
            if(finalCard) finalCard.classList.add('fade-in-up');
        }, 500);
    });

    function updateSlide(index) {
        slideImg.style.opacity = 0; slideText.style.opacity = 0;
        setTimeout(() => {
            if (slidesData[index]) {
                slideImg.src = slidesData[index].src;
                slideText.textContent = slidesData[index].text;
            }
            slideImg.style.opacity = 1; slideText.style.opacity = 1;
        }, 200);
    }

    btnOpenSlideshow.addEventListener('click', () => {
        slideshowOverlay.classList.remove('hidden');
        setTimeout(() => slideshowOverlay.classList.add('open'), 10);
        updateSlide(currentSlideIndex);
    });

    btnCloseSlideshow.addEventListener('click', () => {
        slideshowOverlay.classList.remove('open');
        setTimeout(() => slideshowOverlay.classList.add('hidden'), 300);
    });

    nextBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slidesData.length;
        updateSlide(currentSlideIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
        updateSlide(currentSlideIndex);
    });

    document.addEventListener('keydown', (e) => {
        if (slideshowOverlay.classList.contains('open')) {
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'Escape') btnCloseSlideshow.click();
        }
    });
});