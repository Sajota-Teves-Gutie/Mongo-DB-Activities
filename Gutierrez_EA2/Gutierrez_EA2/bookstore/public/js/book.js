document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('book-select');

  try {
    const res = await fetch('/api/books');
    const books = await res.json();
    console.log('📚 Loaded books:', books); // ✅ Check this in Console

    if (!Array.isArray(books)) throw new Error("Returned data is not an array.");

    books.forEach(book => {
      const option = document.createElement('option');
      option.value = JSON.stringify(book);
      option.textContent = `${book.title} - ₱${book.price}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('❌ Error fetching books:', error);
    const option = document.createElement('option');
    option.textContent = 'Error loading books';
    option.disabled = true;
    select.appendChild(option);
  }
});

function addToCart() {
  const select = document.getElementById('book-select');
  const selectedBook = JSON.parse(select.value);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(selectedBook);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${selectedBook.title} added to cart!`);
}
