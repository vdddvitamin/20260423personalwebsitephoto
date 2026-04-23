const images = document.querySelectorAll(".album img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let imageList = [];

// 收集所有图片
images.forEach((img, index) => {
  imageList.push(img.src);

  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.classList.add("active");
  });
});

// 显示图片
function showImage() {
  lightboxImg.src = imageList[currentIndex];
}

// 关闭
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// 下一张
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  showImage();
});

// 上一张
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  showImage();
});

// 键盘控制
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") {
    nextBtn.click();
  } else if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "Escape") {
    closeBtn.click();
  }
});



// ===== Gallery 动画 =====
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

images.forEach((img, index) => {
  observer.observe(img);
  img.style.transitionDelay = `${index * 0.1}s`;
});


// ===== Hero 渐变 + 文字淡出 =====
const hero = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  let fadeEnd = 300;
  let opacity = scrollY / fadeEnd;

  if (opacity > 1) opacity = 1;

  // 渐变强度
  hero.style.setProperty("--overlay-opacity", opacity);

  // 文字淡出
  heroText.style.opacity = 1 - opacity;
});