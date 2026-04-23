const images = document.querySelectorAll(".album img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});


//下滑渐变
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

const hero = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  // 控制渐变出现的范围（可以调）
  let fadeStart = 0;
  let fadeEnd = 200;

  let opacity = scrollY / fadeEnd;

  if (opacity > 1) opacity = 1;

  hero.style.setProperty("--overlay-opacity", opacity);
//   heroText.style.opacity = 1 - opacity;
  heroText.style.opacity = Math.max(1 - opacity, 0.2);
});



//gallery动画
const galleryImages = document.querySelectorAll(".album img");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

galleryImages.forEach((img, index) => {
  observer.observe(img);
  img.style.transitionDelay = `${index * 0.1}s`;
});
