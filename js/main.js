const Slide = class {
  constructor({ slide, duration, auto }) {
    this.slide = this.sa(slide);
    this.duration = duration || 5000;
    this.auto = auto;
    this.count = 0;
  }
  s(e) {
    return document.querySelector(e);
  }
  sa(e) {
    return document.querySelectorAll(e);
  }
  changeActive(i) {
    this.slide.forEach((e) => e.classList.remove('active'));
    this.slide[i].classList.add('active');
  }
  previousS() {
    const max = this.slide.length;
    if (this.count < max - 1) this.count += 1;
    else { this.count = 0 }
    this.changeActive(this.count);
    return this.count;
  }
  bindEvents() {
    this.previousS = this.previousS.bind(this);
  }
  init() {
    this.bindEvents();
    console.log('%c Item', 'color: green; font-weight: bold');
    this.changeActive(0);
    const timer = setInterval(this.previousS, this.duration);
  }
}

const scrollToT = (target) => {
  const element = document.querySelector(target);
  const top = element.offsetTop;
  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}

const smoothScroll = () => {
  const targets = document.querySelectorAll('[data-target]');
  targets.forEach((t) => {
    const target = t.getAttribute('data-target');
    t.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToT(target);
    });
  })
}

smoothScroll();

window.onload = function() {
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
  const slide = new Slide({
    slide: '[data-slide] > *',
    duration: 6000,
    auto: true,
  });
  slide.init();
}
