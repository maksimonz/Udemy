function slider ({container, slide, preArrow, nextArrow, totalCounter, currentCounter, wrapper, sliderField}){
        // SLIDER

    const   slides = document.querySelectorAll( container),
    slider = document.querySelector( slide),
    prev = document.querySelector( preArrow),
    next = document.querySelector( nextArrow),
    total = document.querySelector( totalCounter),
    current = document.querySelector( currentCounter),
    slidesWrapper = document.querySelector( wrapper),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector( sliderField);
            

    let slideIndex = 1;
    let offset = 0;

    // DOTS

    let indicators = document.createElement('ol'),
        dots = [];
        
    indicators.classList.add('carousel-indicators');
    slider.appendChild(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        indicators.appendChild(dot);

        if(i == 0){
            dot.style.opacity = '1';
        }

        dots.push(dot);
    }

    // 

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.transition = '0.5s all';
    slidesField.style.display = 'flex';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slidesWrapper.style.overflow = 'hidden';


    next.addEventListener('click', () => {
        if(offset == +width.replace(/\D/g, '') * (slides.length - 1)){
            offset = 0;
        } else{
            offset += +width.replace(/\D/g, '');
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlideNum ();

        opacity ();


    });


    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else{
            offset -= +width.replace(/\D/g, '');
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlideNum ();

        opacity ();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {

            let slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.replace(/\D/g, '') * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            opacity ();
            
            currentSlideNum ();

        });
    });

    function opacity (){
        dots.forEach(dot => dot.style.opacity = '0.5') ;
        dots[slideIndex - 1].style.opacity = '1';
    }


    function currentSlideNum (){
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
}

export default slider;