export function getBooksHtml(ids, books) {
  if (!ids.length) return '<li>Nothing books</li>';
  let html = '';
  for (const id of ids) {
    const book = books.get(String(id));
    if (!book) continue;
    html += `\n<li>${book.name}, ${book.author}</li>`;
  }
  return html.trim();
}