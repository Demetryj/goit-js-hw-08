import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';
const valueOfkeyLocalStor = localStorage.getItem(STORAGE_KEY);

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

addContentForm();

function onFormInput(event) {
  const {
    elements: { email, message },
  } = event.currentTarget;

  const valueInputEmail = email.value;
  const valueTextarea = message.value;

  const datesFormForLocalStor = {
    email: valueInputEmail,
    message: valueTextarea,
  };

  saveCurrentValueInLocalStor(datesFormForLocalStor);
}

function saveCurrentValueInLocalStor(object) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(object));
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(JSON.parse(valueOfkeyLocalStor));
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function addContentForm() {
  if (valueOfkeyLocalStor) {
    const parseValueKey = JSON.parse(valueOfkeyLocalStor);
    inputRef.value = parseValueKey.email;
    textareaRef.value = parseValueKey.message;
  }
}
