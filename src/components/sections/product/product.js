import './product.scss';
import {
    preselectOptions,
    selectActiveSwatch,
    postProductData,
    getSelectedVariant,
    getSelectedOptions,
    getVariantPrice,
} from './components/product-options';
import {getVariantImage} from './components/product-media';

const productData = productOptions;

document.getElementById('product-options-container').addEventListener('click', (event) => {
    event.preventDefault();

    // Select the active swatch
    selectActiveSwatch(event);

    const selectedVariant = getSelectedVariant(getSelectedOptions(), productOptions.variants);

    // Selected variant is null return
    if (!selectedVariant) return;

    // Get the selected variant image object from the selected variant
    const variantImage = getVariantImage(selectedVariant);
    const variantPrice = getVariantPrice(selectedVariant);

    document.querySelector('[data-product-image]').src = variantImage.src;
    document.querySelector('[data-product-price]').innerText = variantPrice;
});

document.getElementById('AddToCartForm').onsubmit = (event) => {
    postProductData(event);
};

// Only run selection if product has more than one variant
if (productData.variants.length > 1) {
    preselectOptions();
}
