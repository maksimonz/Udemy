'use strict';

///////Tabs///////////////////////

window.addEventListener('DOMContentLoaded', ()=>{

        const   tabParent = document.querySelector('.tabheader__items'),
                tabs = document.querySelectorAll('.tabheader__item'),
                Contants = document.querySelectorAll('.tabcontent');

        function hideTab (){
            Contants.forEach((item) => {
                item.classList.add('hide');
                item.classList.remove('show');

            });

            tabs.forEach((item) => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTab (i = 0){
            Contants[i].classList.add('show', 'animation');
            Contants[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTab ();
        showTab ();
        

        tabParent.addEventListener('click', (event)=>{
            
            if(event.target && event.target.classList.contains('tabheader__item')){
                tabs.forEach((item, i)=>{
                    if(event.target == item){
                        hideTab ();
                        showTab (i);
                    }

                });
            }
        });


    //////////////////////Timer /////////////////


    let deadline = '2020-10-11';

    function getTimeRemaining (endTime){
        const t = new Date(endTime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
            
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };        

    }

    function setZero(num){
        if(num >= 0 && num <= 9){
            return '0' + num; 
        } else{
            return num;
        }
    }

    function getClock (endTime){

        const timer = document.querySelector('.timer'),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock(){
            let t = getTimeRemaining (endTime);
            
            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
                timer.style.color = 'red';
            }
        }

        
    }

    getClock (deadline);


    // Modal

    let btnModals = document.querySelectorAll('[data-modal]'),
        ModalWindow = document.querySelector('.modal'); 

    function openModal(){
        ModalWindow.classList.add('show');
        ModalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(ModalTimerId);
    }

    btnModals.forEach(item =>{
        item.addEventListener('click', openModal);
    });

    function closeModal(){
            ModalWindow.classList.remove('show');
            ModalWindow.classList.add('hide');
            document.body.style.overflow = '';
    }



    ModalWindow.addEventListener('click', (e) => {
        if (e.target === ModalWindow || e.target.getAttribute('data-modalclose') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && ModalWindow.classList.contains('show')){
            closeModal();
        }
    });

    const ModalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll (){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек



    class MenuCard {
        constructor(src, alt, title, text, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.rateUAH = 27;
            this.ExchangeToUAH();

        }

        ExchangeToUAH() {
            this.price = this.price * this.rateUAH;
        }

        render (){
            const elem = document.createElement('div');
            if(this.classes.length === 0){
                elem.classList.add('menu__item');
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }
            
            elem.innerHTML = `                

                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                    </div>

            `;
        this.parent.append(elem);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error (`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container", 'menu__item').render();
            });
        });

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     14,
    //     ".menu .container",
    //     'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     21,
    //     ".menu .container",
    //     'menu__item'
    // ).render();


//         let person = {
//             name: 'Alex',
//             age: 25,
//             parents:{
//                 mom: 'Olga',
//                 papa: 'Sam'
//             }
//         };

//         // console.log(JSON.stringify(person));
//         // console.log(JSON.parse(JSON.stringify(person)));

//         let clone = JSON.parse(JSON.stringify(person));
//         clone.parents.mom = 'Luba';
//         console.log(person);

//         console.log(clone);




///// Forms


//    const forms = document.querySelectorAll('form');

//     const message = {
//         loading: "Загрузка",
//         success: "Мы Вам перезвоним!",
//         failue: "Ошибка"
//     };

//     forms.forEach(item => {
//         postData(item);
//     });

//     function postData (form){
//         form.addEventListener('submit', (e)=>{
//             e.preventDefault();

//             const statusMessage = document.createElement('div');
//             statusMessage.classList.add('status');
//             statusMessage.textContent = message.loading;
//             form.append(statusMessage);

//             let request = new XMLHttpRequest();
//             request.open('POST', 'server.php');

//             request.setRequestHeader('Content-type', 'multipart/form-data');
//             const formData = new FormData(form);

//             const object = {};
//                 formData.forEach(function(value, key){
//                     object[key] = value;
//                 });

//             const json = JSON.stringify(object);

//             request.send(json);

//             request.addEventListener('load', ()=>{
//                 if(request.status === 200){
//                     console.log(request.response);
//                     statusMessage.textContent = showThanksModal(message.success);
//                     form.reset();
//                     statusMessage.remove();
//                 } else {
//                     statusMessage.textContent = showThanksModal(message.failue);
//                 }
//             });

//         });

//     }

//     function showThanksModal(message) {
//         const prevModalDialog = document.querySelector('.modal__dialog');

//         prevModalDialog.classList.add('hide');
//         openModal();

//         const thanksModal = document.createElement('div');
//         thanksModal.classList.add('modal__dialog');
//         thanksModal.innerHTML = `
//             <div class="modal__content">
//                 <div class="modal__close" data-close>×</div>
//                 <div class="modal__title">${message}</div>
//             </div>
//         `;
//         document.querySelector('.modal').append(thanksModal);
//         setTimeout(() => {
//             thanksModal.remove();
//             prevModalDialog.classList.add('show');
//             prevModalDialog.classList.remove('hide');
//             closeModal();
//         }, 4000);
//     }

const forms = document.querySelectorAll('form');

    const message = {
        loading: "Загрузка",
        success: "Мы Вам перезвоним!",
        failue: "Ошибка"
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: data
        });
        return await res.json();
    };

    function bindpostData (form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            postData('http://localhost:3000/requests', JSON.stringify(object))
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });

    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-modalclose>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


    fetch(' http://localhost:3000/menu')
    .then(data => data.json())
    .then(result => console.log(result));




    // SLIDER

    const   slides = document.querySelectorAll('.offer__slide'),
            slider = document.querySelector('.offer__slider'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            width = window.getComputedStyle(slidesWrapper).width,
            slidesField = document.querySelector('.offer_slider-inner');
            

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
        }else {
            current.textContent = slideIndex;
        }
    }


    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }


    // function showSlides(n){
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     } 

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.classList.add('hide'));

    //     // slides[slideIndex - 1].classList.add('show');
    //     // slides[slideIndex - 1].classList.remove('hide');


    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block'; 

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex += n);
    // }


    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });




    // calculation

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function setActiveClass (selector, activeClass){
        let elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            } 
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            } 
        });
    }

    setActiveClass ('#gender', 'calculating__choose-item_active');
    setActiveClass ('.calculating__choose_big', 'calculating__choose-item_active');

    function caclTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '___';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }


    caclTotal();
    
    function getStaticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach( elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);

                    e.target.classList.add(activeClass);
                });
                caclTotal();
                
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation (selector){

        let input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else{
                input.style.border = 'none';
            }
            
            switch(input.getAttribute('id')){
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }
            caclTotal();
        });
        
    }

    getDynamicInformation ('#height');
    getDynamicInformation ('#weight');
    getDynamicInformation ('#age');

});




