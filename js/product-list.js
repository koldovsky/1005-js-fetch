let rate = 1;
let currencies;
let products;

async function loadData() {
    const response = await fetch('api/products.json');
    products = await response.json();
    renderProducts();
}
loadData();


function renderProducts() {
    const productList = document.querySelector('.products__list');
    productList.innerHTML = '';
    for (const product of products) {
        productList.innerHTML += createProductHtml(product);
    }
}

function createProductHtml(product) {
    return `<article class="product-card">
    <img src="${product.image}" alt="${product.title}">
    <h3 class="product-card__h3">${product.title}</h3>
    <p class="product-card__description">
    ${product.translatedDescription || product.description}
    </p>
    <div class="product-card__buttons">
                <button class="product-card__buttons-info button button-card">
                Info
                </button>
                <button class="product-card__buttons-buy button button-card">
                Buy - ${(product.price * rate).toFixed(2)}
                </button>
                </div>
    </article>`;
}

async function convertCurrency() {
    if (!currencies) {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        currencies = await response.json();
    }
    const convertTo = document.querySelector('.products__currency').value;
    rate = currencies.rates[convertTo];
    renderProducts();
}

async function translate() {
    const lang = document.querySelector('.products__translate').value;
    for (const product of products) {
        const message = `Please translate to ${lang}: ${product.description}`;
        const response = await fetch('api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({message})
        });
        if (response.ok) {
            const data = await response.json();
            product.translatedDescription = data.message;
        }
    }
    renderProducts();
}

document.querySelector('.products__currency').addEventListener('change', convertCurrency);

document.querySelector('.products__translate').addEventListener('change', translate);

// Інші варіанти робити запит:

// fetch('api/products.json')
//   .then( response => response.json() )
//   .then( products => renderProducts(products) );

// function loadDataXHR() {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             const products = JSON.parse(xhr.responseText);
//             renderProducts(products);
//         }
//     }
//     xhr.open('get', 'api/products.json');
//     xhr.send();
// }
// loadDataXHR();