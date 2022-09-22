import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

const datesFormForLocalStor = {};

const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

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

    Object.entries(parseValueKey).forEach(([name, value]) => {
      datesFormForLocalStor[name] = value;
      formRef.elements[name].value = value;
    });

    // inputRef.value = parseValueKey.email;
    // textareaRef.value = parseValueKey.message;
  }
}

///////////////////////////////////////
// ('use strict');
// import throttle from 'lodash.throttle';
// const formRef = document.querySelector('.js-contact-form');
// const LOCALE_STORAGE_KEY = 'contact-form-key';
// import { save, load, remove } from './storage';

// initPage();

// const onFormInput = event => {
//   const { name, value } = event.target;

//   let saveData = load(LOCALE_STORAGE_KEY);
//   saveData = saveData ? saveData : {};

//   saveData[name] = value;

//   save(LOCALE_STORAGE_KEY, saveData);
// };

// const throttledOnFormInput = throttle(onFormInput, 300);
// formRef.addEventListener('input', throttledOnFormInput);

// function initPage() {
//   const saveData = load(LOCALE_STORAGE_KEY);

//   if (!saveData) {
//     return;
//   }
//   Object.entries(saveData).forEach(([name, value]) => {
//     formRef.elements[name].value = value;
//   });
// }

// const handleSubmit = event => {
//   event.preventDefault();

//   const {
//     elements: { name, email, message },
//   } = event.currentTarget;

//   console.log({ name: name.value, email: email.value, message: message.value });
//   event.currentTarget.reset();
//   remove(LOCALE_STORAGE_KEY);
// };

// formRef.addEventListener('submit', handleSubmit);

// export const save = (key, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// };

// export const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };
// export const remove = key => {
//   try {
//     localStorage.removeItem(key);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };
