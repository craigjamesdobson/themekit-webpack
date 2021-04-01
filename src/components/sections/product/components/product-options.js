import {post} from '../../../helpers/cart-fetch-api/cart-fetch-api';

const productData = productOptions;

export const preselectOptions = () => {
    const optionGroups = document.querySelectorAll('[data-option-group]');
    const optionsGroupArray = Array.from(optionGroups);

    const variantID = Number(document.getElementById('AddToCartBtn').value);
    const variantObject = productData.variants.find((obj) => obj.id === variantID);

    if (optionsGroupArray[0]) {
        optionsGroupArray[0].querySelectorAll('.js-swatch-selector').forEach((swatch) => {
            if (swatch.dataset.option === variantObject.option1) {
                swatch.classList.add('active');
            }
        });
    }

    if (optionsGroupArray[1]) {
        optionsGroupArray[1].querySelectorAll('.js-swatch-selector').forEach((swatch) => {
            if (swatch.dataset.option === variantObject.option2) {
                swatch.classList.add('active');
            }
        });
    }

    if (optionsGroupArray[2]) {
        optionsGroupArray[2].querySelectorAll('.js-swatch-selector').forEach((swatch) => {
            if (swatch.dataset.option === variantObject.option3) {
                swatch.classList.add('active');
            }
        });
    }
};

export const selectActiveSwatch = (event) => {
    if (!event.target.classList.contains('js-swatch-selector')) return;

    const currentOptionGroup = event.target.closest('[data-option-group]');
    currentOptionGroup
        .querySelectorAll('.js-swatch-selector')
        .forEach((el) => el.classList.remove('active'));
    event.target.classList.add('active');
};

export const getSelectedOptions = () => {
    const optionGroups = document.querySelectorAll('[data-option-group]');
    const optionsGroupArray = Array.from(optionGroups);

    return optionsGroupArray.map((el) => {
        const activeSwatch = el.querySelector('.js-swatch-selector.active');
        return activeSwatch?.dataset.option;
    });
};

export const getSelectedVariant = (selectedOptions, variants) => {
    let selectedVariant = null;

    for (const option of variants) {
        if (
            selectedOptions[0] === option.option1 &&
            selectedOptions[1] === option.option2 &&
            selectedOptions[2] === option.option3
        ) {
            selectedVariant = option;
            break;
        }
    }

    return selectedVariant;
};

export const getVariantPrice = (selectedVariant) => {
    return Intl.NumberFormat(Shopify.locale, {
        style: 'currency',
        currency: Shopify.currency.active,
    }).format(selectedVariant.price / 100);
};

const showErrorMessage = (errMsg) => {
    const errorContainer = document.querySelector('[data-error-message]');
    errorContainer.innerText = errMsg;
    errorContainer.classList.remove('hidden');
};

export const postProductData = async (event) => {
    event.preventDefault();
    const btn = document.getElementById('AddToCartBtn');
    let id = document.getElementById('AddToCartBtn').value;
    const quantity = document.getElementById('counterQty').value;

    id = getSelectedVariant(getSelectedOptions(), productData.variants);

    if (!id) {
        showErrorMessage('Please select a valid variant');
        return;
    }

    const response = await post('add.js', {id, quantity});

    if (response) {
        btn.textContent = 'ITEM ADDED';
        const successMsgContainer = document.querySelector('[data-cart-success-message]');
        successMsgContainer.innerText = `${response.title} has been added to your basket!`;
        successMsgContainer.classList.remove('hidden');
    }
};
