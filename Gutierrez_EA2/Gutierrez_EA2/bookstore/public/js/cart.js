document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const list = document.getElementById('cart-list');

  cart.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ₱${book.price}`;
    list.appendChild(li);
  });
});

function buy() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) return alert("Your cart is empty!");

  let total = 0;
  let order = "You ordered:\n";
  cart.forEach(book => {
    order += `- ${book.title} (₱${book.price})\n`;
    total += book.price;
  });
  order += `\nTotal: ₱${total}`;
  document.getElementById('summary').innerText = order;
  localStorage.removeItem('cart');
}
