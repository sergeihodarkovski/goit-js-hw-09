const formData = {
  email: '',
  message: '',
};

const feedbackForm = document.querySelector('.feedback-form');

// Перевіряємо, чи є дані в локальному сховищі і заповнюємо форму
window.addEventListener('DOMContentLoaded', () => {
  const storedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (storedData) {
    formData.email = storedData.email;
    formData.message = storedData.message;
    populateForm();
  }
});

// Відстежуємо введення в поля форми і зберігаємо дані у локальному сховищі
feedbackForm.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveFormDataToLocalStorage();
});

// Обробляємо подію сабміту форми
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  if (isFormValid()) {
    console.log(formData);
    clearFormDataAndLocalStorage();
  } else {
    alert('Fill please all fields');
  }
});

// Функція для збереження даних у локальне сховище
function saveFormDataToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Функція для заповнення форми даними з об’єкта formData
function populateForm() {
  feedbackForm.elements.email.value = formData.email;
  feedbackForm.elements.message.value = formData.message;
}

// Функція для очищення об’єкта formData та локального сховища
function clearFormDataAndLocalStorage() {
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  localStorage.removeItem('feedback-form-state');
  feedbackForm.reset();
}

// Функція для перевірки, чи обидва елементи форми заповнені
function isFormValid() {
  return formData.email && formData.message;
}
