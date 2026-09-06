export function getElement($w, selector) {
  try {
    return $w(selector);
  } catch {
    return null;
  }
}

export function setText($w, selector, value) {
  const element = getElement($w, selector);

  if (element && typeof element.text !== 'undefined') {
    element.text = value;
  }
}

export function setHtml($w, selector, value) {
  const element = getElement($w, selector);

  if (element && typeof element.html !== 'undefined') {
    element.html = value;
  }
}

export function revealIfPresent($w, selector) {
  const element = getElement($w, selector);

  if (!element) {
    return;
  }

  if (typeof element.expand === 'function') {
    element.expand();
  }

  if (typeof element.show === 'function') {
    element.show();
  }
}

export function setLink($w, selector, href, label) {
  const element = getElement($w, selector);

  if (!element) {
    return;
  }

  if (typeof element.label !== 'undefined' && label) {
    element.label = label;
  }

  if (typeof element.text !== 'undefined' && label) {
    element.text = label;
  }

  if (typeof element.link !== 'undefined') {
    element.link = href;
  }
}

export function setBackgroundColor($w, selector, color) {
  const element = getElement($w, selector);

  if (element && element.style && typeof element.style.backgroundColor !== 'undefined') {
    element.style.backgroundColor = color;
  }
}

export function setBorderColor($w, selector, color) {
  const element = getElement($w, selector);

  if (element && element.style && typeof element.style.borderColor !== 'undefined') {
    element.style.borderColor = color;
  }
}

export function collapseIfPresent($w, selector) {
  const element = getElement($w, selector);

  if (element && typeof element.collapse === 'function') {
    element.collapse();
  }
}

export function bindRepeater($w, selector, items, bindItem) {
  const repeater = getElement($w, selector);

  if (!repeater || typeof repeater.onItemReady !== 'function') {
    return;
  }

  repeater.data = items.map((item, index) => ({
    _id: `${selector.replace('#', '')}-${index}`,
    ...item,
  }));

  repeater.onItemReady(($item, itemData, index) => {
    bindItem($item, itemData, index);
  });
}
