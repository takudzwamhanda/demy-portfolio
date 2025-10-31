// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.skill-card, .certificate-card, .stat, .contact-item');
  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Contact Form Handling with Web3Forms
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Show success message
          showMessage('Your message has been sent successfully!', 'success');
          contactForm.reset();
        } else {
          // Show error message from Web3Forms
          const errorMsg = result.message || 'Failed to send message. Please try again later.';
          showMessage(errorMsg, 'error');
          console.error('Web3Forms Error:', result);
        }
      } catch (error) {
        // Show error message
        showMessage('Failed to send message. Please try again later.', 'error');
        console.error('Error:', error);
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show message function
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.success-message, .error-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `${type}-message`;
  messageDiv.textContent = message;
  
  // Insert after form
  const form = document.querySelector('.contact-form');
  form.appendChild(messageDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroIcon = document.querySelector('.hero-icon');
  if (heroIcon) {
    const rate = scrolled * -0.5;
    heroIcon.style.transform = `translateY(${rate}px)`;
  }
});

// Certificate image lightbox (optional enhancement)
document.querySelectorAll('.certificate-card img').forEach(img => {
  img.addEventListener('click', function() {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${this.src}" alt="${this.alt}">
        <button class="lightbox-close">&times;</button>
      </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    `;
    
    // Add to page
    document.body.appendChild(lightbox);
    
    // Show lightbox
    setTimeout(() => lightbox.style.opacity = '1', 10);
    
    // Close functionality
    const closeLightbox = () => {
      lightbox.style.opacity = '0';
      setTimeout(() => lightbox.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  });
});

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Hide loading screen after 3 seconds
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    // Remove from DOM after animation completes
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 3000);
});

// Enhanced Hero Animations
document.addEventListener('DOMContentLoaded', () => {
  // Animated counter for hero stats
  const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
  
  const animateStatNumbers = () => {
    statNumbers.forEach((stat, index) => {
      let target = parseInt(stat.getAttribute('data-target'));
      if (isNaN(target)) {
        const text = (stat.textContent || '').replace(/\D/g, '');
        target = parseInt(text) || 0;
      }
      if (!target || target < 0) {
        stat.textContent = (stat.textContent || '0').replace(/\D/g, '') + '+';
        return;
      }
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + '+';
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + '+';
        }
      }, 16);
    });
  };
  
  // Trigger animation when hero section is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateStatNumbers, 1000);
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroObserver.observe(heroSection);
  }
});

// Bar Chart Animation
document.addEventListener('DOMContentLoaded', () => {
  const chartBars = document.querySelectorAll('.chart-bar');
  
  const animateBars = () => {
    chartBars.forEach((bar, index) => {
      const value = parseInt(bar.getAttribute('data-value'));
      const fill = bar.querySelector('.bar-fill');
      
      setTimeout(() => {
        fill.style.height = value + '%';
        fill.style.setProperty('--bar-height', value + '%');
      }, index * 200);
    });
  };
  
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const chartsSection = document.querySelector('.data-visualization');
  if (chartsSection) {
    chartObserver.observe(chartsSection);
  }
});

// Timeline Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.3 });
  
  timelineItems.forEach(item => {
    item.style.animationPlayState = 'paused';
    timelineObserver.observe(item);
  });
});

// Enhanced Portfolio Hover Effects
document.addEventListener('DOMContentLoaded', () => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Add magnetic effect
      item.style.transform = 'translateY(-10px) scale(1.02)';
      item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add parallax effect on mouse move
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
  });
});

// Interactive Explainer Animations
document.addEventListener('DOMContentLoaded', () => {
  // Funnel animation
  const funnelStages = document.querySelectorAll('.funnel-stage');
  let currentStage = 0;
  
  const animateFunnel = () => {
    if (currentStage < funnelStages.length) {
      funnelStages[currentStage].style.animation = 'stagePulse 0.5s ease-out';
      currentStage++;
      setTimeout(animateFunnel, 800);
    } else {
      setTimeout(() => {
        currentStage = 0;
        funnelStages.forEach(stage => {
          stage.style.animation = 'stagePulse 3s ease-in-out infinite';
        });
      }, 2000);
    }
  };
  
  // A/B Testing animation
  const testButtons = document.querySelectorAll('.test-button');
  const winnerBadge = document.querySelector('.test-winner');
  
  const animateABTest = () => {
    testButtons.forEach((button, index) => {
      setTimeout(() => {
        button.style.animation = 'buttonTest 0.5s ease-out';
        setTimeout(() => {
          button.style.animation = 'buttonTest 3s ease-in-out infinite';
        }, 500);
      }, index * 1000);
    });
    
    setTimeout(() => {
      winnerBadge.style.animation = 'winnerGlow 0.5s ease-out';
      setTimeout(() => {
        winnerBadge.style.animation = 'winnerGlow 2s ease-in-out infinite';
      }, 500);
    }, 3000);
  };
  
  // Customer Journey animation
  const customerAvatar = document.querySelector('.customer-avatar');
  const journeySteps = document.querySelectorAll('.journey-step');
  
  const animateJourney = () => {
    journeySteps.forEach((step, index) => {
      setTimeout(() => {
        step.style.animation = 'stepHighlight 0.5s ease-out';
        setTimeout(() => {
          step.style.animation = 'stepHighlight 4s ease-in-out infinite';
        }, 500);
      }, index * 1000);
    });
  };
  
  // Trigger animations when explainer section is visible
  const explainerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateFunnel, 500);
        setTimeout(animateABTest, 2000);
        setTimeout(animateJourney, 4000);
        explainerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const explainerSection = document.querySelector('.explainer-animations');
  if (explainerSection) {
    explainerObserver.observe(explainerSection);
  }
});

// Social Media Mockup Interactions
document.addEventListener('DOMContentLoaded', () => {
  const mockupContainers = document.querySelectorAll('.mockup-container');
  
  mockupContainers.forEach(container => {
    container.addEventListener('click', () => {
      // Add click animation
      container.style.transform = 'scale(0.95)';
      setTimeout(() => {
        container.style.transform = 'scale(1)';
      }, 150);
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      `;
      
      container.style.position = 'relative';
      container.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation keyframes
let rippleStyle = document.getElementById('ripple-animation');
if (!rippleStyle) {
  rippleStyle = document.createElement('style');
  rippleStyle.id = 'ripple-animation';
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Enhanced Email Animation
document.addEventListener('DOMContentLoaded', () => {
  const emailButton = document.querySelector('.email-button');
  const emailStats = document.querySelectorAll('.email-stat .stat-number');
  
  if (emailButton) {
    emailButton.addEventListener('click', () => {
      // Animate stats
      emailStats.forEach((stat, index) => {
        setTimeout(() => {
          stat.style.animation = 'statFadeIn 0.5s ease-out';
        }, index * 200);
      });
      
      // Button click effect
      emailButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        emailButton.style.transform = 'scale(1)';
      }, 150);
    });
  }
});

// Advanced Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  // Parallax effect for hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
    
    // Floating shapes parallax
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const rate = scrolled * (0.1 + index * 0.05);
      shape.style.transform = `translateY(${rate}px)`;
    });
  });
});

// Interactive Chart Hover Effects
document.addEventListener('DOMContentLoaded', () => {
  const chartBars = document.querySelectorAll('.chart-bar');
  
  chartBars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      bar.style.transform = 'scale(1.05)';
      bar.style.transition = 'transform 0.3s ease';
    });
    
    bar.addEventListener('mouseleave', () => {
      bar.style.transform = 'scale(1)';
    });
  });
  
  const pieSlices = document.querySelectorAll('.pie-slice');
  
  pieSlices.forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      slice.style.transform = 'scale(1.1)';
      slice.style.transition = 'transform 0.3s ease';
    });
    
    slice.addEventListener('mouseleave', () => {
      slice.style.transform = 'scale(1)';
    });
  });
});

// Enhanced Button Animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedButtons = document.querySelectorAll('.btn-animated');
  
  animatedButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = this.querySelector('.btn-ripple');
      if (ripple) {
        ripple.style.animation = 'none';
        ripple.offsetHeight; // Trigger reflow
        ripple.style.animation = 'ripple 0.6s ease-out';
      }
    });
  });
});

// Portfolio Filtering
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Initialize all items as visible
  portfolioItems.forEach(item => {
    item.style.display = 'flex';
    item.style.opacity = '1';
  });

  // Set up click event for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter items with smooth transitions
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        // If 'all' is selected or item matches the filter
        if (filterValue === 'all' || category === filterValue) {
          // Show matching items with fade-in animation
          item.style.display = 'flex';
          // Force reflow to ensure the transition works
          void item.offsetHeight;
          item.style.opacity = '1';
        } else {
          // Hide non-matching items with fade-out animation
          item.style.opacity = '0';
          // Remove from layout after animation completes
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Show all items by default
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.click();
  }
}

// Initialize portfolio filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  
  // Add animation classes for portfolio items when they come into view
  const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.portfolio-item').forEach(item => {
    portfolioObserver.observe(item);
  });
});

// Add CSS animations for portfolio
let style = document.getElementById('portfolio-animations');
if (!style) {
  style = document.createElement('style');
  style.id = 'portfolio-animations';
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    .portfolio-item {
      opacity: 0;
      animation-fill-mode: forwards;
    }
  `;
  document.head.appendChild(style);
}

// Product Feature Carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.feature-carousel');
  if (!carousel) return;
  
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dots .dot');
  const prevBtn = carousel.querySelector('.prev-btn');
  const nextBtn = carousel.querySelector('.next-btn');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  const updateCarousel = () => {
    // Update track position
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active slide
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  };
  
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  };
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Auto-advance carousel
  setInterval(() => {
    if (currentSlide === totalSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateCarousel();
  }, 5000);
  
  // Initialize carousel
  updateCarousel();
  
  // Pause auto-advance on hover
  carousel.addEventListener('mouseenter', () => {
    carousel.dataset.paused = 'true';
  });
  
  carousel.addEventListener('mouseleave', () => {
    delete carousel.dataset.paused;
  });
  
  // Touch/swipe support
  let startX = 0;
  let endX = 0;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  const handleSwipe = () => {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };
});

// Add loading animation to page
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update icon based on current theme
  if (currentTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
  
  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });
});

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Event listeners for testimonial navigation
if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// Service card interactions
document.addEventListener('DOMContentLoaded', () => {
  const serviceButtons = document.querySelectorAll('.service-btn');
  
  serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceCard = button.closest('.service-card');
      const serviceName = serviceCard.querySelector('h3').textContent;
      
      // Scroll to contact form and pre-fill subject
      const contactSection = document.querySelector('#contact');
      const subjectInput = document.querySelector('#subject');
      
      if (contactSection && subjectInput) {
        subjectInput.value = `Interested in ${serviceName}`;
        contactSection.scrollIntoView({ behavior: 'smooth' });
        subjectInput.focus();
      }
    });
  });
});

// Portfolio project links
document.addEventListener('DOMContentLoaded', () => {
  const portfolioButtons = document.querySelectorAll('.portfolio-btn');
  
  portfolioButtons.forEach(button => {
    // Check if it's a link to external project
    if (button.tagName === 'A' && button.href.includes('canva.com')) {
      // Add click tracking for external links
      button.addEventListener('click', (e) => {
        // Track the click (you can add analytics here)
        console.log('Portfolio project clicked:', button.href);
        
        // Optional: Add a small delay for visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 150);
      });
    } else {
      // Handle as modal for case studies (if needed in future)
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create modal for case study
        const portfolioItem = button.closest('.portfolio-item');
        const title = portfolioItem.querySelector('h3').textContent;
        const description = portfolioItem.querySelector('p').textContent;
        const stats = portfolioItem.querySelectorAll('.portfolio-stats .stat');
        
        const modal = document.createElement('div');
        modal.className = 'case-study-modal';
        modal.innerHTML = `
          <div class="modal-overlay">
            <div class="modal-content">
              <button class="modal-close">&times;</button>
              <h2>${title}</h2>
              <p class="modal-description">${description}</p>
              <div class="modal-stats">
                ${Array.from(stats).map(stat => `<span class="stat-badge">${stat.textContent}</span>`).join('')}
              </div>
              <div class="modal-details">
                <h3>Project Overview</h3>
                <p>This project involved comprehensive digital marketing strategies that delivered exceptional results. Through data-driven approaches and creative execution, we achieved significant improvements in key performance indicators.</p>
                
                <h3>Key Strategies</h3>
                <ul>
                  <li>Comprehensive market research and competitor analysis</li>
                  <li>Strategic keyword targeting and content optimization</li>
                  <li>Multi-channel campaign management</li>
                  <li>Continuous performance monitoring and optimization</li>
                </ul>
                
                <h3>Results Achieved</h3>
                <p>The campaign exceeded all expectations, delivering measurable improvements in traffic, conversions, and overall business growth.</p>
              </div>
              <div class="modal-cta">
                <a href="#contact" class="btn btn-primary">Start Your Project</a>
              </div>
            </div>
          </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        
        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 2rem;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--text-secondary);
          transition: color 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.style.opacity = '1', 10);
        
        // Close functionality
        const closeModal = () => {
          modal.style.opacity = '0';
          setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) closeModal();
        });
        
        // Close on escape key
        const handleEscape = (e) => {
          if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
          }
        };
        document.addEventListener('keydown', handleEscape);
      });
    }
  });
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  const newsletterInput = document.querySelector('.newsletter-input');
  const newsletterBtn = document.querySelector('.newsletter-btn');
  
  if (newsletterForm && newsletterInput && newsletterBtn) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = newsletterInput.value.trim();
      
      if (!email) {
        showMessage('Please enter your email address.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Show loading state
      const originalText = newsletterBtn.innerHTML;
      newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      newsletterBtn.disabled = true;
      
      try {
        // Simulate subscription (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showMessage('Thank you for subscribing! You\'ll receive our latest insights soon.', 'success');
        newsletterInput.value = '';
        
      } catch (error) {
        showMessage('Sorry, there was an error subscribing. Please try again.', 'error');
      } finally {
        newsletterBtn.innerHTML = originalText;
        newsletterBtn.disabled = false;
      }
    });
  }
});

// Enhanced accessibility features
document.addEventListener('DOMContentLoaded', () => {
  // Add focus indicators for keyboard navigation
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--primary-color)';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
  
  // Add ARIA labels for better screen reader support
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item, index) => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View portfolio project ${index + 1}`);
    
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const button = item.querySelector('.portfolio-btn');
        if (button) button.click();
      }
    });
  });
  
  // Add skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content landmark
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.id = 'main-content';
    heroSection.setAttribute('role', 'main');
  }
  
  // Add navigation landmarks
  const nav = document.querySelector('.navbar');
  if (nav) {
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');
  }
  
  // Add section landmarks
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const heading = section.querySelector('h2');
    if (heading) {
      section.setAttribute('aria-labelledby', heading.id || `section-${Math.random().toString(36).substr(2, 9)}`);
      if (!heading.id) {
        heading.id = `section-${Math.random().toString(36).substr(2, 9)}`;
      }
    }
  });
});

// Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Preload critical images
  const criticalImages = [
    'imgs/demy.jpeg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
  
  // Performance monitoring
  if (performance && performance.timing) {
    // Check if the page has already loaded
    if (performance.timing.loadEventEnd > 0) {
      // Page has already loaded, calculate load time directly
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('Page load time:', loadTime + 'ms');
    } else {
      // Page is still loading, wait for load event
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
      });
    }
  } else {
    console.log('Performance timing is not supported in this browser');
  }
});

// Analytics and tracking
document.addEventListener('DOMContentLoaded', () => {
  // Google Analytics (replace with your tracking ID)
  const GA_TRACKING_ID = 'GA_MEASUREMENT_ID';
  
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'GA_MEASUREMENT_ID') {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
    
    // Track custom events
    const trackEvent = (action, category, label, value) => {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    };
    
    // Track portfolio clicks
    document.querySelectorAll('.portfolio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const project = btn.closest('.portfolio-item').querySelector('h3').textContent;
        trackEvent('click', 'Portfolio', project);
      });
    });
    
    // Track service clicks
    document.querySelectorAll('.service-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const service = btn.closest('.service-card').querySelector('h3').textContent;
        trackEvent('click', 'Services', service);
      });
    });
    
    // Track contact form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        trackEvent('submit', 'Contact', 'Contact Form');
      });
    }
    
    // Track newsletter subscriptions
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', () => {
        trackEvent('submit', 'Newsletter', 'Newsletter Subscription');
      });
    }
  }
  
  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll', {
          event_category: 'Engagement',
          event_label: `${scrollPercent}%`,
          value: scrollPercent
        });
      }
    }
  });
  
  // Track time on page
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'time_on_page',
        value: timeOnPage
      });
    }
  });
});