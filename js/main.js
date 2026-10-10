/* Plain JavaScript. All page content remains readable without this file. */
(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = (returnFocus = false) => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    if (returnFocus) toggle.focus();
  };
  if (toggle && nav) {
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    const desktop = window.matchMedia('(min-width: 1001px)');
    desktop.addEventListener('change', () => closeMenu());
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const steps = [
    ['Understand', 'Start with your business.', 'We listen to your team, understand your objectives, and observe how work happens today.', 'A shared understanding of the business and the challenge.'],
    ['Diagnose', 'Find the cause, not just the symptom.', 'We trace friction across people, processes, technology, and data to identify the issues that matter most.', 'A prioritised diagnosis and a clear starting point.'],
    ['Design', 'Make the path forward clear.', 'We develop a solution around your operating reality, with a practical plan, ownership, and success measures.', 'A tailored solution and an actionable roadmap.'],
    ['Build & Implement', 'Put the solution to work.', 'We work with your team to introduce the new processes and systems, test the details, and support delivery.', 'A working solution integrated into daily operations.'],
    ['Measure', 'Know what is changing.', 'We compare agreed measures with the baseline, review performance, and use the findings to guide decisions.', 'Visibility into progress and areas needing attention.'],
    ['Enable', 'Give your team the confidence to own it.', 'We provide practical training, documentation, and support so your people can maintain the new way of working.', 'A team equipped to sustain the improvements.'],
    ['Improve', 'Keep making the system better.', 'We establish feedback loops and review routines to refine the solution as your organisation evolves.', 'A repeatable approach to continuous improvement.']
  ];
  const stepButtons = [...document.querySelectorAll('[data-step]')];
  stepButtons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.step);
    const step = steps[index];
    if (!step) return;
    stepButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelector('[data-step-number]').textContent = String(index + 1).padStart(2, '0');
    ['label', 'title', 'description', 'output'].forEach((key, i) => {
      document.querySelector(`[data-step-${key}]`).textContent = step[i];
    });
  }));

  const search = document.querySelector('#insight-search');
  if (search) {
    const cards = [...document.querySelectorAll('[data-article]')];
    const filters = [...document.querySelectorAll('[data-filter]')];
    let category = 'all';
    const filterArticles = () => {
      const query = search.value.trim().toLowerCase();
      let count = 0;
      cards.forEach(card => {
        const visible = (category === 'all' || card.dataset.category === category) && card.dataset.search.includes(query);
        card.hidden = !visible;
        if (visible) count++;
      });
      document.querySelector('[data-results]').textContent = `${count} insight${count === 1 ? '' : 's'}`;
      document.querySelector('[data-empty]').hidden = count !== 0;
    };
    filters.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.filter;
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      filterArticles();
    }));
    search.addEventListener('input', filterArticles);
    document.querySelector('[data-reset]').addEventListener('click', () => {
      category = 'all';
      search.value = '';
      filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
      filterArticles();
      search.focus();
    });
  }

  const form = document.querySelector('[data-contact]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const service = form.querySelector('#service');
    const selectedService = new URLSearchParams(window.location.search).get('service');
    if ([...service.options].some(option => option.value === selectedService)) service.value = selectedService;
    const recipient = 'admin@goevysolutions.org';
    const makeEnquiry = () => {
      const data = new FormData(form);
      return ['Hello Goevy,', '', 'I would like to discuss the following enquiry:', '',
        `Name: ${String(data.get('Name')).trim()}`,
        `Email: ${String(data.get('Email')).trim()}`,
        `Organisation: ${String(data.get('Organisation')).trim()}`,
        `Role: ${String(data.get('Role') || '').trim() || 'Not specified'}`,
        `Area of interest: ${service.selectedOptions[0].textContent}`,
        '', 'What I would like to improve:', String(data.get('Challenge')).trim(), '',
        'I agree to Goevy using these details to respond to this enquiry.'].join('\n');
    };
    const validate = () => {
      form.querySelectorAll('input[required]:not([type="checkbox"]), textarea[required]').forEach(field => {
        field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
      });
      const message = form.querySelector('#message');
      if (message.value.trim() && message.value.trim().length < 15) message.setCustomValidity('Please describe your challenge in at least 15 characters.');
      return form.reportValidity();
    };
    form.querySelectorAll('input,textarea').forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
    const showCopy = text => {
      const fallback = form.querySelector('.copy-fallback');
      fallback.hidden = false;
      const textarea = fallback.querySelector('textarea');
      textarea.value = text;
      textarea.focus();
      textarea.select();
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!validate()) return;
      const subject = `Website enquiry — ${form.querySelector('#organisation').value.trim()}`;
      const body = makeEnquiry();
      status.textContent = `Your enquiry is ready. Your email app should open; review and send it there. If it does not open, copy your enquiry and email ${recipient}.`;
      // The visitor reviews and sends the email. This site never claims delivery.
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    form.querySelector('[data-copy]').addEventListener('click', async () => {
      if (!validate()) return;
      const text = makeEnquiry();
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        status.textContent = `Enquiry copied. Paste it into an email to ${recipient}. Nothing has been sent yet.`;
      } catch {
        showCopy(text);
        status.textContent = `Select and copy the enquiry below, then email it to ${recipient}.`;
      }
    });
  }
})();
