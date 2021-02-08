function openModal(modalSelector, modalTimerId){
    const modalWindow = document.querySelector(modalSelector); 

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId){
        clearTimeout(modalTimerId);
    }
    
}

function closeModal(modalSelector){
    const modalWindow = document.querySelector(modalSelector); 

    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

function modal (triggerSelector, modalSelector, modalTimerId){

    let btnModals = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector); 

    btnModals.forEach(item =>{
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-modalclose') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && modalWindow.classList.contains('show')){
            closeModal(modalSelector);
        }
    });


    function showModalByScroll (){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {openModal};
export {closeModal};