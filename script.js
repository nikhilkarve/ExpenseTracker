const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const overlay = document.getElementById('overlay');
const textArea = document.getElementById('desc');

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
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const currValue = +amount.value;
    const running = +total + currValue;

    const transaction = {
      id: generateID(),
      text: text.value,
      amount: currValue,
      category: category.value,
      date: date.value,
      running: running,
      description: textArea.value,
    };
    console.log(category.value);
    console.log(date.value);
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

// Overlay
function on(id) {
  document.getElementById('overlay').style.display = 'block';
  let transactionOne = localStorage.getItem('transactions');
  let parsedTransactions = JSON.parse(transactionOne);
  let currentTransaction;
  for (let item of parsedTransactions) {
    if (item['id'] == id) currentTransaction = item;
  }
  const card = document.createElement('div');
  console.log(currentTransaction);
  card.innerHTML = `
  <div class='card'>
  <h4>${currentTransaction['text']}</h4>
  <p>Amount Spent: ${currentTransaction['amount']}</p>
    <p>Date: ${currentTransaction['date']}</p>
   <p>Category ${currentTransaction['category']}</p>
   <p>Running Balance: ${currentTransaction['running']}</p>
   <p>Description - ${currentTransaction['description']}</p>
  </div>
  `;

  overlay.append(card);
}

function off() {
  document.getElementById('overlay').style.display = 'none';
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
  <button class="details-btn" onClick="on(${
    transaction.id
  })">Check details</button>
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

  //   Total expense
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -(1).toFixed(2);

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

//[{"id":27391781,"text":"ChickFilA","amount":10,"category":"Food","date":"2022-04-10","running":"0.00"},{"id":13011061,"text":"Notebook","amount":2,"category":"School","date":"2022-04-10","running":"10.00"},{"id":89207525,"text":"d","amount":-10,"category":"v","date":"2022-04-07","running":"12.00-10"},{"id":7322564,"text":"RA","amount":-4,"category":"z","date":"2022-04-30","running":"2.00-4"},{"id":10322017,"text":"Cash","amount":-3,"category":"p","date":"2022-04-15","running":"-2.00-3"},{"id":42827087,"text":"d","amount":-8,"category":"p","date":"2022-04-20","running":"-5.00-8"},{"id":32777798,"text":"xv","amount":-9,"category":"Food","date":"2022-04-22","running":-22}]
