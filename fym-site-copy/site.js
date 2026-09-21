const FYM_PROJECT_APPLICATION_URL = '';

document.querySelectorAll('[data-project-apply]').forEach((link) => {
  if (FYM_PROJECT_APPLICATION_URL) {
    link.href = FYM_PROJECT_APPLICATION_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return;
  }

  link.removeAttribute('href');
  link.setAttribute('aria-disabled', 'true');
  link.classList.add('button-disabled');
  link.title = 'Applications will open when the official form is ready.';
});
