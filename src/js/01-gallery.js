// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);
const galleryRef = document.querySelector('.gallery');

const arrayMarkupOfItems = galleryItems.map(item => {
  const { preview, original, description } = item;
  return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
});

galleryRef.innerHTML = arrayMarkupOfItems.join('');

const lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animationSpeed: 250,
});
