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
      autoSlideInterval = setInterval(showNextSlide, 3000);
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
  searchInput.addEventListener("input", filterProducts); // Pesquisa em tempo real
  document
    .querySelector('.search-bar button[type="submit"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      filterProducts();
      
    });
});
