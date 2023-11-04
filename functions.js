
document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;
    const arr = url.split('/');
    const currentPage = arr[arr.length - 1];
    
    if(currentPage === 'CartPage.html') {
        loadCartItemsToDom();
    }
})


function loadCartItemsToDom() {

    const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];

    const container = document.getElementById('m_container');

    container.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {

        total += +item.price;
        const div = document.createElement('div');

        const content = `
        <div class="cart_item_roww">
            <div class="cart-item-image">
                <img src="${item.imageUrl}" width="150">
            </div>
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <P style="font-size:18px; margin-top:20px; font-weight:700; color:rgb(184, 0, 0);"><img src="/media/poland-zloty-icon.png" width="18" height="18"/>${item.price}</p>
            </div>

            <div class="cart-delete-btn">
                <button onClick="deleteCartItem(${index})" data-item=${index}>X</button>
            </div>
        </div>    
        `;

        div.innerHTML = content;
        container.append(div);
    })

    const totalDiv = document.createElement('div');
    const totalDivContent = `
        <h4 class="sub_total">Sub total  :  ${total}</h4>
    `;

    totalDiv.innerHTML = totalDivContent;
    container.append(totalDiv);
}

function deleteCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];

    cartItems = cartItems.filter((item, i) => i !== index);

    localStorage.setItem('cart-items', JSON.stringify(cartItems));

    loadCartItemsToDom();
}






const addToCartBtns = document.querySelectorAll('.addToCart-btn');


addToCartBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        addItemToCart(e.target);
    })
})









function clickThisbtn(lbl,img)
{
   document.getElementById("newlbl").src = document.getElementById(img).src;
   document.getElementById("newlbl2").textContent = document.getElementById(lbl).innerText;


}

function displayNewPage(image,lbl,div,div2,price)
{
    const imageVal = document.getElementById(image).src;
    const lblValue = document.getElementById(lbl).innerText;
    const priceValue = document.getElementById(price).innerText;
    var divValue = document.getElementById(div).innerHTML;
    var divValue2 = document.getElementById(div2).innerHTML;

    localStorage.setItem('imageData',imageVal);
    localStorage.setItem('labelData',lblValue);
    localStorage.setItem('priceData',priceValue);
    localStorage.setItem('rating',divValue);
    localStorage.setItem('review',divValue2);

    window.location.href="newPage.html";

}




function addItemToCart(item) {
    const itemNumber = item.getAttribute('data-item_number');

    const title = document.getElementById(`titleID${itemNumber}`).innerText;
    const price = document.getElementById(`priceID${itemNumber}`).innerText;
    const image = document.getElementById(`imgID${itemNumber}`).src;

    const newCartItem = {
        title,
        price,
        imageUrl: image
    }

    const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
    console.log(cartItems);
    cartItems.push(newCartItem);
    console.log(cartItems);
    localStorage.setItem('cart-items', JSON.stringify(cartItems))
    window.location.href = 'CartPage.html';
}
