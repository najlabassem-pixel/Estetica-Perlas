const carousel = document.getElementById("carouselExample");

function setBackground() {
  const activeSlide = carousel.querySelector(".carousel-item.active img");
  
  if (activeSlide) {
    const url = activeSlide.src;
    const item = carousel.querySelector(".carousel-item.active");

    item.style.setProperty("--bg-image", `url('${url}')`);
    item.querySelector(":scope").style.backgroundImage = `url('${url}')`;
  }
}

carousel.addEventListener("slid.bs.carousel", () => {
  const active = carousel.querySelector(".carousel-item.active");
  const img = active.querySelector("img").src;

  active.style.setProperty("--bg-image", `url(${img})`);
  active.style.backgroundImage = `url(${img})`;
});

// Al cargar por primera vez
setBackground();