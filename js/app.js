const starsContainer = document.getElementById("stars");

const createStars = () => {
  const isMobile = window.innerWidth <= 768;
  const starsCount = isMobile ? 30 : 50;
  
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

const checkCentering = () => {
  if (window.innerWidth > 768) {
    const body = document.body;
    const calendar = document.querySelector('.calendar');
    
    if (body && calendar) {
      body.style.display = 'flex';
      body.style.alignItems = 'center';
      body.style.justifyContent = 'center';
      body.style.minHeight = '100vh';
    }
  }
};

window.addEventListener('load', function() {
  createStars();
  checkCentering();
});

window.addEventListener('resize', function() {
  if (window.innerWidth <= 768 && starsContainer.children.length === 0) {
    createStars();
  }
  checkCentering();
});
