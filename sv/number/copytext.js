function copy_text(element) {
  const texts = Array.from(element.children)
    .map(child => child.textContent.trim())
    .join(' ');
  navigator.clipboard.writeText(texts)
    .then(() => console.log('Copied to clipboard:', texts))
    .catch(err => console.error('Clipboard error:', err));
}
