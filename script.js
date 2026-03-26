// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav when clicking a non-dropdown link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't close if it's a dropdown parent on mobile
      if (window.innerWidth <= 768 && link.closest('.nav-dropdown') && link.parentElement.classList.contains('nav-dropdown')) {
        return;
      }
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = trigger.parentElement;
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          if (d !== parent) d.classList.remove('open');
        });
        parent.classList.toggle('open');
      }
    });
  });
}

// ===== Form Submission via Formspree =====
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = quoteForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(quoteForm);

    fetch('https://formspree.io/f/xpwdzqkr', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        btn.textContent = 'Thank You! We\'ll Be In Touch.';
        btn.style.background = '#2d7a4f';
        quoteForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      btn.textContent = 'Oops! Try again.';
      btn.style.background = '#dc2626';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  });
}

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Image Skeleton Loading =====
document.querySelectorAll('.product-image img, .series-image img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    img.addEventListener('error', () => {
      img.classList.add('loaded'); // Remove skeleton even on error
    });
  }
});

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card, .feature-card, .category-card, .gallery-item, .testimonial-card').forEach(el => {
  el.classList.add('animate-target');
  observer.observe(el);
});

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
