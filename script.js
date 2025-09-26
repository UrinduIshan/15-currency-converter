
const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency)

async function fetchCurrencies() {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    console.log(data);
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = currencies[0];
    toCurrency.value = currencies[83];

}

async function convertCurrency(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount<0) {
        alert("Please enter valid amount");
        return;
    }

    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();

    const rate = data.rates[to];
    const result = (amount * rate).toFixed(2);

    resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;

}