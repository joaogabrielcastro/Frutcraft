document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById("img");
    const images = container.querySelectorAll("img");
    let currentIndex = 0;
    
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }  
        const translateValue = -(currentIndex * 100);
        container.style.transform = `translateX(${translateValue}%)`;
    }
    
    setInterval(nextSlide, 3000);
});