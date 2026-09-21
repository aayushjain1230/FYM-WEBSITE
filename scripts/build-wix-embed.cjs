const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'fym-site-copy');
const routes = ['/', '/projects/', '/projects/scholarship-opportunity-finder/', '/about/', '/our-work/', '/our-work/kelly-angelovic/', '/our-work/travelerlenz/', '/team/', '/get-involved/', '/submit-an-idea/'];
const pages = Object.fromEntries(routes.map(route => [route,
  fs.readFileSync(path.join(source, route.slice(1), 'index.html'), 'utf8')
]));
const css = fs.readFileSync(path.join(source, 'styles.css'), 'utf8');
const config = JSON.parse(fs.readFileSync(path.join(source, 'site-config.json'), 'utf8'));
const bundle = { type: 'fym:render', pages, css, config };
fs.writeFileSync(path.join(root, 'src/public/fymEmbedContent.js'),
  '// Generated from fym-site-copy by scripts/build-wix-embed.cjs.\n' +
  'export const fymEmbedContent = ' + JSON.stringify(bundle) + ';\n');
console.log(`Bundled ${routes.length} existing pages and the original stylesheet.`);

// The canvas must render without waiting for Velo's Preview-only handshake.
const bootstrap = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style id="fym-style"></style></head><body><div id="app"></div><script>(() => {
let bundle = ${JSON.stringify(bundle).replace(/</g, '\\u003c')};
let route = '/';
let memberLoggedIn = false;
const parentOrigin = (() => { try { return new URL(document.referrer).origin; } catch { return ''; } })();
const sendParent = message => { if (parentOrigin) parent.postMessage(message, parentOrigin); };
const app = document.getElementById('app');
function show(next) {
  if (!Object.prototype.hasOwnProperty.call(bundle.pages, next)) return;
  route = next;
  const doc = new DOMParser().parseFromString(bundle.pages[route], 'text/html');
  doc.querySelectorAll('script').forEach(el => el.remove());
  document.getElementById('fym-style').textContent = bundle.css;
  document.title = doc.title;
  app.replaceChildren(...doc.body.childNodes);
  const reportHeight = () => sendParent({type:'fym:height', route, height:Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)});
  const primaryNav = app.querySelector('.nav');
  if (primaryNav && bundle.pages['/submit-an-idea/'] && !primaryNav.querySelector('[data-submit-idea-link]')) {
    const submitIdea = document.createElement('a'); submitIdea.textContent = 'Submit an Idea'; submitIdea.href = '/submit-an-idea/'; submitIdea.dataset.submitIdeaLink = '';
    primaryNav.insertBefore(submitIdea, primaryNav.querySelector('.join'));
  }
  app.querySelectorAll('a[href]').forEach(a => {
    const url = new URL(a.getAttribute('href'), 'https://fym.invalid' + route);
    if (url.origin === 'https://fym.invalid' && bundle.pages[url.pathname]) {
      a.href = '#' + url.pathname;
      a.addEventListener('click', event => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey) return;
        event.preventDefault(); sendParent({type:'fym:navigate', route:url.pathname}); show(url.pathname);
      });
    } else { a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  });
  app.querySelectorAll('[data-project-apply]').forEach(link => {
    const destination = bundle.config && bundle.config.projectApplicationUrl;
    if (destination && memberLoggedIn) {
      link.href = destination;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.removeAttribute('href');
      link.setAttribute('role', 'button');
      link.title = destination ? 'Create or sign in to your FYM account before applying.' : 'Applications are not configured.';
      link.addEventListener('click', event => {
        event.preventDefault();
        if (destination) sendParent({type:'fym:member-login'});
      });
    }
  });
  app.querySelectorAll('[data-member-action]').forEach(link => {
    link.removeAttribute('href'); link.setAttribute('role', 'button');
    link.addEventListener('click', event => { event.preventDefault(); sendParent({type:'fym:member-login'}); });
  });
  window.scrollTo(0, 0);
  requestAnimationFrame(reportHeight);
  setTimeout(reportHeight, 250);
  Promise.all(Array.from(app.querySelectorAll('img')).map(img => img.complete ? Promise.resolve() : new Promise(resolve => {img.addEventListener('load', resolve, {once:true}); img.addEventListener('error', resolve, {once:true});}))).then(reportHeight);
}
window.addEventListener('message', event => {
  if (event.source !== parent || !event.data || (parentOrigin && event.origin !== parentOrigin)) return;
  if (event.data.type === 'fym:render') {
    if (!event.data.pages || typeof event.data.css !== 'string') return;
    bundle = event.data; memberLoggedIn = Boolean(event.data.memberLoggedIn); show(bundle.route || '/');
  }
  if (event.data.type === 'fym:member-state') { memberLoggedIn = Boolean(event.data.loggedIn); show(route); }
});
show('/');
sendParent({type:'fym:ready'});
})();</script></body></html>`;
fs.writeFileSync(path.join(source, 'wix-embed.generated.txt'), bootstrap);
fs.writeFileSync(path.join(source, 'wix-embed-transfer.generated.html'),
  '<!doctype html><html><head><title>FYM Wix embed transfer</title></head><body><textarea aria-label="Wix embed code">' +
  bootstrap.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea></body></html>');

// Each Wix canvas starts on its own page before Preview initializes Velo.
const transfers = routes.map(route => {
  const html = bootstrap.replace("let route = '/';", `let route = ${JSON.stringify(route)};`)
    .replace("show('/');", 'show(route);');
  return `<label>${route}<textarea aria-label="${route}">${html.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</textarea></label>`;
});
fs.writeFileSync(path.join(source, 'wix-pages-transfer.generated.html'),
  '<!doctype html><html><head><title>FYM Wix page transfer</title></head><body>' + transfers.join('\n') + '</body></html>');
