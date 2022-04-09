const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const amount = document.getElementById('amount');

// Working with localStorage
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null
    ? localStorageTransactions
    : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    console.log(typeof transaction.amount);
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  updateLocalStorage();
  init();
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add Transations to the Dom List
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  list.appendChild(item);
}

// Update the balance income and expense
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );

  //   Total amount
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // Total income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  console.log(income);

  //   Total expense
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -(1).toFixed(2);
  console.log(expense);

  //   Setting the values in the dom
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Update localStorage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();

form.addEventListener('submit', addTransaction);
