/**
 * RUHI Applications - Shared Website Interactions
 * Theme: Lighter Glassmorphic Aurora
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('siteHeader');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const navDrawer = document.getElementById('navDrawer');

  if (mobileToggle && navDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const spans = mobileToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (
        !navDrawer.contains(e.target) &&
        !mobileToggle.contains(e.target) &&
        navDrawer.classList.contains('open')
      ) {
        navDrawer.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // 3. FAQ Accordion System
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.parentElement;
      const isActive = currentItem.classList.contains('active');
      currentItem.parentElement.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });

  // 4. Scroll-Reveal Animation (IntersectionObserver)
  const fadeElements = document.querySelectorAll(
    '.feature-box, .app-card-wrapper, .document-card, .faq-item, .about-section'
  );
  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition =
        'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
      fadeObserver.observe(el);
    });
  }

  // 5. Subtle Mouse-Move Aurora Parallax (Light-optimized, desktop only)
  const glowContainer = document.querySelector('.background-glow');
  if (glowContainer && window.innerWidth > 768) {
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const xShift = (e.clientX / window.innerWidth) * 14 - 7;
          const yShift = (e.clientY / window.innerHeight) * 14 - 7;
          glowContainer.style.transform = `translate(${xShift}px, ${yShift}px)`;
          glowContainer.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

});
