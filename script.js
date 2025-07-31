document.addEventListener("DOMContentLoaded", () => {
  // Arrow function para concisão

  // --- Carrossel ---
  const carousel = document.getElementById("img");
  const slides = carousel.querySelectorAll("img");
  let currentSlide = 0;
  let autoSlideInterval;

  const showNextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  const startAutoSlide = () => {
    if (slides.length > 1) {
      // Só inicia se houver mais de um slide
      autoSlideInterval = setInterval(showNextSlide, 2000);
    }
  };

  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  startAutoSlide(); // Inicia o carrossel

  // Pausar/Retomar ao passar o mouse
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // --- Pesquisa ---
  const searchInput = document.querySelector('.search-bar input[type="text"]');
  const products = document.querySelectorAll(".product"); // NodeList é iterável com forEach

  const filterProducts = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    products.forEach((product) => {
      const name = product.querySelector("h2").textContent.toLowerCase();
      const description = product.querySelector("p").textContent.toLowerCase();

      // Mostra ou esconde o produto
      product.style.display =
        name.includes(searchTerm) || description.includes(searchTerm)
          ? "flex"
          : "none";
    });
  };

  // Eventos de pesquisa
  searchInput.addEventListener("input", filterProducts); 
  
  // Função para rolar até os produtos
  const scrollToProducts = () => {
    filterProducts();
    document.getElementById('products-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  // Tornando a função global para uso no HTML
  window.scrollToProducts = scrollToProducts;
  
  document
    .querySelector('.search-bar button[type="button"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      scrollToProducts();
    });
  
  // --- Sistema de Carrinho ---
  
  // Função para adicionar produto ao carrinho
  function addToCart(productData) {
    console.log('Tentando adicionar produto:', productData); // Debug
    
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Carrinho atual:', cart); // Debug
      
      // Verifica se o produto já existe no carrinho
      const existingItemIndex = cart.findIndex(item => item.name === productData.name);
      
      if (existingItemIndex > -1) {
        // Se existe, aumenta a quantidade
        cart[existingItemIndex].quantity += 1;
        console.log('Produto existente, aumentando quantidade'); // Debug
      } else {
        // Se não existe, adiciona novo item
        const newItem = {
          name: productData.name,
          price: parseFloat(productData.price),
          image: productData.image,
          description: productData.description,
          quantity: 1
        };
        cart.push(newItem);
        console.log('Novo produto adicionado:', newItem); // Debug
      }
      
      // Salva no localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Carrinho salvo no localStorage:', JSON.parse(localStorage.getItem('cart'))); // Debug
      
      // Mostra mensagem de sucesso
      showAddToCartMessage(productData.name);
      
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho!');
    }
  }
  
  // Função para mostrar mensagem de produto adicionado
  function showAddToCartMessage(productName) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.cart-notification');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Cria nova mensagem
    const message = document.createElement('div');
    message.className = 'cart-notification';
    message.innerHTML = `
      <p>✅ ${productName} adicionado ao carrinho!</p>
      <a href="carrinho.html">Ver Carrinho</a>
    `;
    
    // Adiciona ao body
    document.body.appendChild(message);
    
    // Remove após 3 segundos
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
  
  // Torna a função global para uso nos botões
  window.addToCart = addToCart;
});
