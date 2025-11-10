const starsContainer = document.getElementById("stars");

const createStars = () => {
  const starsCount = 50;
  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 0.1875 + 0.0625;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;

    star.style.width = `${size}rem`;
    star.style.height = `${size}rem`;
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.animationDelay = `${delay}s`;

    starsContainer.appendChild(star);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  createStars();
  console.log('Stars initialized');
});
