const FYM_PROJECT_APPLICATION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd2fAH3XpnudyaP8Pn4JMCnjhFr3pEanikX0TLwIOoX3VpvDw/viewform?usp=publish-editor';

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
