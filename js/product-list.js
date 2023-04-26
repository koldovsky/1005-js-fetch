const products = [
    {
        id: '1',
        title: 'Baby Yoda',
        price: 7.99,
        image: 'img/baby-yoda.svg',
        desciption: 'The cutest thing in the galaxy. This is the way.'
    },
    {
        id: '2',
        title: 'Banana',
        price: 8.99,
        image: 'img/banana.svg',
        desciption: 'A banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.'
    },
    {
        id: '3',
        title: 'Girl',
        price: 9.99,
        image: 'img/girl.svg',
        desciption: 'Girl sticker'
    },
    {
        id: '4',
        title: 'Viking',
        price: 9.59,
        image: 'img/viking.svg',
        desciption: 'Viking sticker'
    }
];

function renderProducts(products) {
    const productList = document.querySelector('.products__list');
    productList.innerHTML = '';
    for (const product of products ) {
        productList.innerHTML += createProductHtml(product) ;
    }
}

function createProductHtml(product) {
    return `<article class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3 class="product-card__h3">${product.title}</h3>
            <p class="product-card__description">
                ${product.desciption}
            </p>
            <div class="product-card__buttons">
                <button class="product-card__buttons-info button button-card">
                    Info
                </button>
                <button class="product-card__buttons-buy button button-card">
                    Buy - ${product.price}
                </button>
            </div>
    </article>`;
}

renderProducts(products);
