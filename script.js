document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.getElementById('productItems');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // التحقق مما إذا كانت هناك منتجات لعرضها
    if (products.length === 0) {
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'لا توجد منتجات لعرضها.';
        noProductsMessage.style.textAlign = 'center';
        noProductsMessage.style.fontSize = '18px';
        noProductsMessage.style.color = '#888';
        productItems.appendChild(noProductsMessage);
    } else {
        products.forEach(product => {
            const productCard = createProductCard(product);
            productItems.appendChild(productCard);
        });
    }
});

// دالة لإنشاء بطاقة المنتج
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p class="price">سعر: ${product.price} ر.س</p>
        <p>رقم الهاتف: <strong>${product.phone}</strong></p>
        <button class="btn">أضف إلى السلة</button>
    `;
    
    return productCard;
}
