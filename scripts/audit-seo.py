"""Audit rendered production HTML after npm run build (standard library only)."""
import json
import sys
from urllib.request import urlopen
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

root = Path('.next/server/app')
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.h1 = 0; self.ids = set(); self.links = []; self.canonical = None; self.description = None; self.noindex = False; self.missing_alt = 0; self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'img' and 'alt' not in a: self.missing_alt += 1
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content')
        if tag == 'meta' and a.get('name') == 'robots': self.noindex = 'noindex' in a.get('content', '')

pages = {}
for file in root.rglob('*.html'):
    path = '/' + str(file.relative_to(root).with_suffix(''))
    pages['/' if path == '/index' else path] = Page(file.read_text())
if len(sys.argv) > 1:
    for route in ['/contact', '/join']:
        with urlopen(sys.argv[1].rstrip('/') + route, timeout=20) as response:
            pages[route] = Page(response.read().decode())
routes = {key.removesuffix('/page') or '/' for key in json.loads(Path('.next/server/app-paths-manifest.json').read_text()) if key.endswith('/page')}
errors = []
for path, page in pages.items():
    if path.startswith(('/preview-', '/_')) or path in ['/404', '/500', '/biet', '/foundation']: continue
    if page.h1 != 1: errors.append(f'{path}: {page.h1} H1 headings')
    if not page.canonical or not page.description or page.noindex: errors.append(f'{path}: missing canonical/description or unintended noindex')
    if page.missing_alt: errors.append(f'{path}: image without alt attribute')
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc or not url.path.startswith('/'): continue
        target = unquote(url.path).rstrip('/') or '/'
        if target in ['/conference', '/biet', '/foundation']: continue
        if target not in routes and target not in pages and not Path('public', target.lstrip('/')).exists(): errors.append(f'{path}: missing link {href}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids: errors.append(f'{path}: missing anchor {href}')
print('\n'.join(sorted(set(errors))) if errors else f'PASS: {len(pages)} rendered pages checked; public pages have one H1, metadata and valid internal link targets.')
raise SystemExit(bool(errors))
