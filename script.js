document.addEventListener('DOMContentLoaded', () => {

  const sections   = document.querySelectorAll('.section');
  const navLinks   = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function setActiveLink(id) {
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
  }

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActiveLink(e.target.id);
    });
  }, { threshold: 0.35 });

  sections.forEach(s => spy.observe(s));

  [...navLinks, ...mobileLinks].forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
      }
    });
  });

  const toggle     = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  const revealEls = document.querySelectorAll(
    '.cert-card, .timeline-item, .about-text, .skill-group, .section-label, .section-title'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = `${(i % 6) * 0.08}s`;
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));

  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards  = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      certCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 40px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });

  const homeVisual = document.querySelector('.home-visual');

  if (homeVisual) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      homeVisual.style.transform = `translateY(${y * 0.08}px)`;
    }, { passive: true });
  }

  const homeTag = document.querySelector('.home-tag');
  if (homeTag) {
    const statuses = [
      '✦ Available for work',
      '✦ Open to projects',
      '✦ Let\'s collaborate'
    ];
    let idx = 0;

    setInterval(() => {
      idx = (idx + 1) % statuses.length;
      homeTag.style.opacity = '0';
      homeTag.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        homeTag.lastChild.textContent = ' ' + statuses[idx].replace('✦ ', '');
        homeTag.style.opacity = '1';
      }, 300);
    }, 3500);
  }

});
