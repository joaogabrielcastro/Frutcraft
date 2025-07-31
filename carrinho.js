document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContent = document.getElementById('cart-content');
    const checkoutButton = document.getElementById('checkout-button');
    const clearCartButton = document.getElementById('clear-cart-button');
    const checkoutSuccessMessage = document.getElementById('checkout-success-message');

    function loadCart() {
        const cartData = localStorage.getItem('cart');
        console.log('Dados brutos do localStorage:', cartData); // Debug
        const cart = JSON.parse(cartData) || [];
        console.log('Carrinho parseado:', cart); // Debug
        return cart;
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function calculateTotal(cart) {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function formatPrice(price) {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }

    function renderCartItems() {
        const cart = loadCart();
        console.log('Renderizando carrinho:', cart); // Debug
        
        if (cart.length === 0) {
            console.log('Carrinho vazio'); // Debug
            emptyCartMessage.style.display = 'block';
            cartContent.style.display = 'none';
            checkoutSuccessMessage.style.display = 'none';
            return;
        }

        console.log('Carrinho tem', cart.length, 'itens'); // Debug

        emptyCartMessage.style.display = 'none';
        cartContent.style.display = 'block';
        checkoutSuccessMessage.style.display = 'none';

        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('tr');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <td class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </td>
                <td class="cart-item-name">
                    <strong>${item.name}</strong>
                </td>
                <td class="cart-item-description">
                    ${item.description}
                </td>
                <td class="cart-item-unit-price">
                    ${formatPrice(item.price)}
                </td>
                <td class="cart-item-quantity">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </td>
                <td class="cart-item-total-price">
                    ${formatPrice(item.price * item.quantity)}
                </td>
                <td class="cart-item-actions">
                    <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
                </td>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const total = calculateTotal(cart);
        cartTotalElement.textContent = formatPrice(total);
    }

    // Função para remover item do carrinho
    window.removeFromCart = function(index) {
        const cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCartItems();
    };

    window.updateQuantity = function(index, change) {
        const cart = loadCart();
        cart[index].quantity += change;
    
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        saveCart(cart);
        renderCartItems();
    };

    function clearCart() {
        if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
            localStorage.removeItem('cart');
            renderCartItems();
        }
    }

    function checkout() {
        const cart = loadCart();
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        if (confirm('Finalizar compra?')) {
            localStorage.removeItem('cart');
            emptyCartMessage.style.display = 'none';
            cartContent.style.display = 'none';
            checkoutSuccessMessage.style.display = 'block';
        }
    }


    checkoutButton.addEventListener('click', checkout);
    clearCartButton.addEventListener('click', clearCart);

    renderCartItems();
});
