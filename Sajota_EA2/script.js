const books = [
  { title: "Learn JavaScript", price: 250 },
  { title: "Backend Wizardry", price: 300 },
  { title: "Design Cleanly", price: 180 }
];

const cart = [];

function goTo(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

function populateBooks() {
  const select = document.getElementById("bookSelect");
  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.price;
    option.textContent = book.title;
    select.appendChild(option);
  });
}

function addToCart() {
  const select = document.getElementById("bookSelect");
  const selectedBook = select.options[select.selectedIndex];
  cart.push({ title: selectedBook.textContent, price: parseInt(selectedBook.value) });
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById("cartItems");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ₱${book.price}`;
    cartList.appendChild(li);
    total += book.price;
  });
  document.getElementById("totalPrice").textContent = `Total: ₱${total}`;
}

function showSummary() {
  if (cart.length === 0) return;
  let summary = "📦 You ordered:\n";
  cart.forEach(book => {
    summary += `• ${book.title} - ₱${book.price}\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  summary += `\n💰 Total Price: ₱${total}`;
  document.getElementById("summary").textContent = summary;
}

// Initialize dropdown
populateBooks();
