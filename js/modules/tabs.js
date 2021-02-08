function tabs (tabsSelector, tabsContentSelector, tabsParentSelectot, activeClass){

    ///////Tabs///////////////////////
    const   tabs = document.querySelectorAll(tabsSelector),
            Contants = document.querySelectorAll(tabsContentSelector),
            tabParent = document.querySelector(tabsParentSelectot);

    function hideTab (){
        Contants.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');

        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTab (i = 0){
        Contants[i].classList.add('show', 'animation');
        Contants[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTab ();
    showTab ();

    tabParent.addEventListener('click', (event)=>{

    if(event.target && event.target.classList.contains(tabsSelector.slice(1))){
        tabs.forEach((item, i)=>{
            if(event.target == item){
                hideTab ();
                showTab (i);
            }

        });
    }
    });

}

export default tabs;