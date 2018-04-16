import { polyfill } from 'smoothscroll-polyfill';
import Vivus from 'vivus';

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger
  const links = document.querySelector('.links');
  document.querySelector('.hamburger').addEventListener('click', e => {
    e.preventDefault();
    links.classList.toggle('is-visible');
    ga('send', 'event', 'click', 'hamburger');
  });

  // Links
  polyfill();
  const navbarLinks = document.querySelectorAll('.navbar .link');
  navbarLinks.forEach(el => {
    const target = document.querySelector(el.getAttribute('href'));
    el.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 96, behavior: 'smooth' });
      links.classList.remove('is-visible');
      ga('send', 'event', 'click', 'navigate', el.getAttribute('href'));
    });
  });

  let elInView;
  function handleLinksHighlighting() {
    for (let i = 0; i < navbarLinks.length; i++) {
      const el = navbarLinks[i];
      const target = document.querySelector(el.getAttribute('href'));
      if (
        target.offsetTop - 96 <= window.pageYOffset + window.innerHeight &&
        target.offsetTop - 96 + target.offsetHeight > window.pageYOffset
      ) {
        if (el !== elInView) {
          el.classList.add('is-active');
          elInView && elInView.classList.remove('is-active');
          elInView = el;
          ga('send', 'event', 'scrollTo', 'section', el.id);
        }
        return;
      }
    }
  }
  window.addEventListener('scroll', handleLinksHighlighting);

  // Navbar visibility
  const navbar = document.querySelector('.navbar');
  let scrollPosition = window.pageYOffset;
  function handleNavbarVisibility() {
    if (window.pageYOffset < 32) {
      navbar.classList.add('is-transparent');
    } else {
      navbar.classList.remove('is-transparent');
    }
    if (scrollPosition >= window.pageYOffset) {
      navbar.classList.remove('is-hidden');
    } else {
      navbar.classList.add('is-hidden');
      links.classList.remove('is-visible');
    }
    scrollPosition = window.pageYOffset;
  }
  window.addEventListener('scroll', handleNavbarVisibility);
  handleNavbarVisibility();

  // Scroll Animation
  document.querySelectorAll('main > *').forEach(el => {
    el.classList.add('is-hidden');
  });
  let nodeList = document.querySelectorAll('main > .is-hidden');
  function handleAppearAnimation() {
    nodeList.forEach(el => {
      if (
        el.offsetTop <= window.pageYOffset + window.innerHeight &&
        el.offsetTop + el.offsetHeight > window.pageYOffset
      ) {
        nodeList = document.querySelectorAll('main > .is-hidden');
        el.classList.remove('is-hidden');
      }
    });
    if (nodeList.length === 0) {
      window.removeEventListener('scroll', handleAppearAnimation);
    }
  }
  window.addEventListener('scroll', handleAppearAnimation);
  handleAppearAnimation();

  // SVG Animation
  const outro = document.querySelector('.hero .outro');
  const contact = document.querySelector('.hero .contact');
  outro.classList.add('is-hidden');
  contact.classList.add('is-hidden');
  new Vivus('logo', { duration: 200, type: 'oneByOne' }, () => {
    outro.classList.remove('is-hidden');
    contact.classList.remove('is-hidden');
  });
});
