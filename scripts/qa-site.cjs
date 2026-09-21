const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const site = path.join(root, 'fym-site-copy');
const pages = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    if (entry.isFile() && entry.name === 'index.html') pages.push(target);
  }
}

walk(site);

const failures = [];
const routes = new Set(pages.map(file => {
  const relative = path.relative(site, path.dirname(file)).replaceAll('\\', '/');
  return relative ? `/${relative}/` : '/';
}));

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(root, file);
  const relativePage = path.relative(site, file).replaceAll('\\', '/');
  const routeDirectory = relativePage === 'index.html' ? '/' : path.posix.dirname(`/${relativePage}`);

  for (const match of html.matchAll(/href="([^"]*)"/g)) {
    const href = match[1];
    if (!href || href === '#') failures.push(`${relativeFile}: dead href ${JSON.stringify(href)}`);
    if (/^(https?:|mailto:)/.test(href)) continue;
    if (/\.css(?:\?|$)/.test(href)) continue;

    const basePath = routeDirectory === '/' ? '/' : `${routeDirectory}/`;
    const resolved = new URL(href, `https://fym.invalid${basePath}`).pathname;
    const normalized = resolved === '/' ? '/' : (resolved.endsWith('/') ? resolved : `${resolved}/`);
    if (!routes.has(normalized)) failures.push(`${relativeFile}: missing internal route ${href} -> ${normalized}`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt="[^"]*"/.test(match[1])) failures.push(`${relativeFile}: image missing alt text`);
  }

  for (const match of html.matchAll(/<a\b([^>]*)>/g)) {
    const attributes = match[1];
    if (/target="_blank"/.test(attributes) && !/rel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(attributes)) {
      failures.push(`${relativeFile}: new-tab link missing rel="noopener noreferrer"`);
    }
  }

  if (/localhost|127\.0\.0\.1|http:\/\//i.test(html)) failures.push(`${relativeFile}: development or insecure URL found`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`QA passed for ${pages.length} pages and ${routes.size} routes.`);
}
