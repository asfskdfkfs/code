document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const imagePreview = document.getElementById('imagePreview');

    // عرض الصورة قبل الإضافة
    document.getElementById('productImage').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // إضافة منتج جديد
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const phone = document.getElementById('productPhone').value.trim();
        const imageInput = document.getElementById('productImage');

        // التحقق من صحة المدخلات
        if (!name || !description || !price || !phone || !imageInput.files[0]) {
            alert("يرجى ملء جميع الحقول وإضافة صورة.");
            return;
        }

        // التحقق من صحة السعر
        if (isNaN(price) || parseFloat(price) <= 0) {
            alert("يرجى إدخال سعر صحيح.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                name,
                description,
                price: parseFloat(price), // تخزين السعر كرقم
                phone,
                image: e.target.result
            };

            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            storedProducts.push(newProduct);
            localStorage.setItem('products', JSON.stringify(storedProducts));

            alert("تم إضافة المنتج بنجاح!");
            addProductForm.reset();
            imagePreview.style.display = 'none';
        }
        reader.readAsDataURL(imageInput.files[0]);
    });
});
