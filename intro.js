function gets() {
    window.location = "create.html";
}

let index = 0;

function moveSlide(step) {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slide').length;
  index = (index + step + totalSlides) % totalSlides;
  slides.style.transform = `translateX(${-index * 100}%)`;
}
setInterval(() => moveSlide(1), 3000);

function cg(){
    window.location = "index.html"
}

function turn_mode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
