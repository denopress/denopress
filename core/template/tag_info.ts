// Copyright 2018-2019 chenshenhai. All rights reserved. MIT license.

// This code has been ported almost directly from  https://github.com/chenshenhai/html-schema-parser/blob/master/src/lib/tags.js
// Copyright 2017 The Authors. All rights reserved. MIT license.
// https://github.com/chenshenhai/html-schema-parser/blob/master/LICENSE

export const legalTags = [
  'html', 'head', 'title', 'base', 'link', 'meta', 'style', 'script',
  'noscript', 'body', 'section', 'nav', 'article', 'aside', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'hgroup', 'header', 'footer', 'address', 'main',
  'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd',
  'figure', 'figcaption', 'div', 'a', 'em', 'strong', 'small', 's', 'cite',
  'q', 'dfn', 'abbr', 'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub',
  'sup', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'span', 'br',
  'wbr', 'ins', 'del', 'img', 'iframe', 'embed', 'object', 'param', 'video',
  'audio', 'source', 'track', 'canvas', 'map', 'area', 'svg', 'math',
  'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr',
  'td', 'th', 'form', 'fieldset', 'legend', 'label', 'input', 'button',
  'select', 'datalist', 'optgroup', 'option', 'textarea', 'keygen',
  'output', 'progress', 'meter', 'details', 'summary', 'command', 'menu'
]

export const directiveKeys: {[key: string]: boolean} = {
  '@:if': true,
  '@:for': true,
  '@:index': true,
  // '@:key': true,
  // '@:item': true,
}

export const notClosingTags: {[key: string]: boolean} = {
  'area': true,
  'base': true,
  'br': true,
  'col': true,
  'hr': true,
  'img': true,
  'input': true,
  'link': true,
  'meta': true,
  'param': true,
  'embed': true
}

