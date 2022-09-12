import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

const datesFormForLocalStor = {
  email: '',
  message: '',
};

addContentForm();

function onFormInput(event) {
  datesFormForLocalStor[event.target.name] = event.target.value;

  saveCurrentValueInLocalStor(datesFormForLocalStor);
}

function saveCurrentValueInLocalStor(object) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(object));
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function addContentForm() {
  const valueKeyOfLocalStor = localStorage.getItem(STORAGE_KEY);
  if (valueKeyOfLocalStor) {
    const parseValueKey = JSON.parse(valueKeyOfLocalStor);
    inputRef.value = parseValueKey.email;
    textareaRef.value = parseValueKey.message;
  }
}
