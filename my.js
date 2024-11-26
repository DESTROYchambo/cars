function toggleCartStatus(){
    const cartWrapper=document.querySelector('.cart-wrapper');
    const cartEmptyBadge=document.querySelector('[data-cart-empty]');
    if(cartWrapper.children.length>0){
        cartEmptyBadge.classList.add('none')
    }else{
        cartEmptyBadge.classList.remove('none')
    }
}

function calcCartPrice1(){
    const cartWrapper=document.querySelector('.cart-wrapper');
    const priceElements=cartWrapper.querySelectorAll('.price_currency');

    const totalPriceEl=document.querySelector('.total-price');

    let priceTotal=0;

    priceElements.forEach(function(item){
        const amountEl=item.closest('.cart-item').querySelector('[data-counter]');
        priceTotal+=parseInt(item,innerText)*parseInt(amountEl.innerText); //визначення вартості замовлення
    });
    totalPriceEl.innerText=priceTotal;
}

window.addEventListener('click',function(event){
    const counterWrapper=event.target.closest('.counter-wrapper');
    const counter=counterWrapper.querySelector('[data-counter]');
    
    //+ товар
if(event.target.dataset.action=='plus'){
    counter.innerText=++counter.innerText;

}
if(event.target.closest('.cart-wrapper')&& parseInt(counter.innerText)===1){
    //видалення товару
    event.target.closest('.cart-item').remove();

    toggleCartStatus();
}
//- товар
if(event.target.dataset.action=='minus'){
    const counterWrapper=event.target.closest('.counter-wrapper');
    const counter=counterWrapper.querySelector('[data-counter]');
    if(counter.innerText>1) counter.innerText=--counter.innerText;

}});

const cartWrapper=document.querySelector('.cart-wrapper');
//наповнення кошика
window.addEventListener('click',function(event){
    if(event.target.hasAttribute('data-cart')){
        const card = event.target.closest('.card');
        const productInfo={
            id: card.dataset.id,
            title: card.querySelector('.details h2').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };
        const cartItemHTML= `
                        <div class="cart-item" data-id="02">
                            <div class="cart-item__top">
                                
                                <div class="cart-item__desc">
                                    <div class="cart-item__title">${productInfo.title}</div>
        
                                    <div class="cart-item__details">
        
                                        <div class="items items--small counter-wrapper">
                                            <div class="items__control" data-action="minus">-</div>
                                            <div class="items__current" data-counter="">1</div>
                                            <div class="items__control" data-action="plus">+</div>
                                        </div>
        
                                        <div class="price">
                                            <div class="price__currency" style="margin-top: 15px;">${productInfo.price}</div>
                                        </div>
        
                                    </div>
                                    <!-- // cart-item__details -->
        
                                </div>
                            </div>
                        </div>`;
        calcCartPrice1();   
        cartWrapper.insertAdjacentHTML('beforeend',cartItemHTML);

        toggleCartStatus();

    }
})

