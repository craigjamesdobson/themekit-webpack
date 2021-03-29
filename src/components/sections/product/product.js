import './product.scss';
import {post} from '../../helpers/cart-fetch-api/cart-fetch-api';

const selectActiveSwatch = (event) => {
    const swatchSelector = '[data-swatch-selector]';
    if (event.target.matches(swatchSelector)) {
        Array.from(document.querySelectorAll(swatchSelector)).forEach((el) =>
            el.classList.remove('active')
        );
        event.target.classList.add('active');
    }
};

const getProductData = async (event) => {
    event.preventDefault();
    const btn = document.getElementById('AddToCartBtn');
    const id = document.getElementById('AddToCartBtn').value;
    const quantity = document.getElementById('counterQty').value;

    const productData = productOptions;

    const optionOne = document.getElementById('option-1')
        ? document.getElementById('option-1').value
        : null;
    const optionTwo = document.getElementById('option-2')
        ? document.getElementById('option-2').value
        : null;
    const optionThree = document.getElementById('option-3')
        ? document.getElementById('option-3').value
        : null;

    let selectedOption = id;

    for (const option of productData.variants) {
        if (
            optionOne === option.option1 &&
            optionTwo === option.option2 &&
            optionThree === option.option3
        ) {
            selectedOption = option;
            return;
        }
    }

    const response = await post('add.js', {id: selectedOption, quantity});

    if (response) {
        btn.textContent = 'ITEM ADDED';
    }
};

document.getElementById('AddToCartForm').onsubmit = (event) => getProductData(event);

// const swatchContainer = document.querySelector('[data-swatch-container]');

document.addEventListener('click', (event) => selectActiveSwatch(event));
