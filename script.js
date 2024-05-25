
"use strict";

// -----------create div----------------------
let productsContainer = document.getElementById('products-container');
let paginationContainer = document.getElementById('pagination');

let itemsPerPage = 3;
let currentPage = 1;
let products = [];

// ------------------api fetch-----------------
function fetchProducts() {
    return fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => data.products)
        .catch(error => console.error('Error fetching products:', error));
}

// ----------------product page in display----------------
function displayProducts(page, products) {
    productsContainer.innerHTML = '';
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = Math.min(startIndex + itemsPerPage, products.length);
    let productsToDisplay = products.slice(startIndex, endIndex);

    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function displayPagination() {
    paginationContainer.innerHTML = '';
      
        let totalPages = Math.ceil(products.length / itemsPerPage);
        let maxButtons = 4;
    
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
        if (endPage - startPage < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            let button = createPaginationButton(i, () => changePage(i));
            if (i === currentPage) {
                button.classList.add('active');
            }
            paginationContainer.appendChild(button);
        
    }
    displayProducts(currentPage, products);
}

function createPaginationButton(text, onClick) {
    let button = document.createElement('button');
    button.textContent = text;
    button.classList.add('pagination-button');
    button.addEventListener('click', onClick);
    return button;
}

function changePage(page) {
    currentPage = Math.min(Math.max(page, 1), Math.ceil(products.length / itemsPerPage));
    displayPagination();
}

(() => {
    fetchProducts().then(fetchedProducts => {
        products = fetchedProducts.slice(0, 12);
        displayPagination();
    });
})();


displayPagination();

