const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'fym-site-copy');
const routes = ['/', '/about/', '/our-work/', '/our-work/kelly-angelovic/', '/our-work/travelerlenz/', '/team/', '/get-involved/'];
const pages = Object.fromEntries(routes.map(route => [route,
  fs.readFileSync(path.join(source, route.slice(1), 'index.html'), 'utf8')
]));
const css = fs.readFileSync(path.join(source, 'styles.css'), 'utf8');
const bundle = { type: 'fym:render', pages, css };
fs.writeFileSync(path.join(root, 'src/public/fymEmbedContent.js'),
  '// Generated from fym-site-copy by scripts/build-wix-embed.cjs.\n' +
  'export const fymEmbedContent = ' + JSON.stringify(bundle) + ';\n');
console.log(`Bundled ${routes.length} existing pages and the original stylesheet.`);
