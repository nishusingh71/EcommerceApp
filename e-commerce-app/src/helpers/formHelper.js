export const modifyFormData = (formData) => {
  let modifyObject = {};
  let isFormValid = false;

  console.log(formData);

  for (const formControl of formData) {
    modifyObject[formControl.name] = formControl.value;

    if (formControl.required && formControl.value !== "") {
      isFormValid = true;
    } else {
      isFormValid = false;
    }
  }

  return {
    isFormValid,
    modifyObject,
  };
};
