//Traemos los elementos necesarios
const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

//Creo arrays para guardar los usuarios
const users = JSON.parse(localStorage.getItem("users")) || [];

//Funcion para guardar en LS
const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

//Funcion para validar que el campo no este vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

//Funcion para validar que el input este entre un min y max de caracteres
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

//Funcion para validar email
const isEmailValid = (input) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return regex.test(input.value.trim());
};
//Funcion para validar que el email ingresado no exista en el array de usuarios
const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};


//Funcion para validar Numero
const isPhoneValid = (input) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(input.value.trim());
};

//Funcion para mostrar un error en el HTML
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

//Funcion para mostrar exito input valido
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

//Función para validar un input de tipo texto
const checkTextInput = (input) => {
  let valid = false;
  minCharacteres = 3;
  maxCharacteres = 25;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, minCharacteres, maxCharacteres)) {
    showError(
      input,
      `Este campo debe tener entre ${minCharacteres} y ${maxCharacteres} caracteres`
    );
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//Funcion para validar email
const checkEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }
  if (!isEmailValid(input)) {
    showError(input, "El email no es válido");
    return;
  }
  if (isExistingEmail(input)) {
    showError(input, "El email ya se encuentra registrado");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//Funcion para validar numero
const checkPhone = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "El telefono es obligatorio");
    return;
  }
  if (!isPhoneValid(input)) {
    showError(input, "El telefono no es válido");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

const validateForm = (e) => {
  e.preventDefault();

  let isNameValid = checkTextInput(nameInput);
  let isLastNameValid = checkTextInput(lastNameInput);
  let isEmailValid = checkEmail(emailInput);
  let isPhoneValid = checkPhone(phoneInput);

  let isValidForm =
    isNameValid && isLastNameValid && isEmailValid && isPhoneValid;

  if (isValidForm) {
    users.push({
      name: nameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    });
    saveToLocalStorage(users);
    alert("Te registraste correctamente");
  }
};

export const register = () => {
  registerForm.addEventListener("submit", validateForm);
  nameInput.addEventListener("input", () => checkTextInput(nameInput));
  lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

