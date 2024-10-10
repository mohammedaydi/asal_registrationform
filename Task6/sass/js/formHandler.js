const changeColor = (event) => {
  const id = event.target.id;
  const text = document.getElementById("header");
  text.style = `color: ${id};`;
};

const validator = (formData) => {
  console.log(formData);
  const date_limit = 8;
  let formValidity = true;
  let errorMsg = "";
  //name validation
  let fname = formData.get("fname").length >= 2;
  formValidity = fname && formValidity;
  errorMsg += fname ? "" : "first name should be longer than 2\n";

  let lname = formData.get("lname").length >= 2;
  formValidity = lname && formValidity;
  errorMsg += lname ? "" : "last name should be longer than 2\n";
  //email and mobile
  let email = formData.get("email");
  let emailValid =
    email.length > 6 && email.includes("@") && email.includes(".");
  formValidity = formValidity && emailValid;
  errorMsg += emailValid ? "" : "Invalid email\n";

  let phone = formData.get("phone");
  let phoneValid = phone.length === 10 && !isNaN(phone);
  formValidity = formValidity && phoneValid;
  errorMsg += phoneValid ? "" : "Invalid phone, it should be 10 digits\n";

  //birth date
  let bdate = formData.get("bdate");
  let curr = new Date().getFullYear().toString();
  let val = parseInt(bdate.split("-"[0]));
  formValidity = formValidity && curr - val > date_limit;
  errorMsg +=
    curr - val > date_limit ? "" : "Student must be at least 8 years old\n";

  //address city pin state
  let address = formData.get("address").length > 2;
  let city = formData.get("city").length > 2;
  let bin = formData.get("pin").length > 2;
  let state = formData.get("state").length > 2;

  formValidity = address && city && bin && state && formValidity;
  errorMsg +=
    curr - val > address && city && bin && state
      ? ""
      : "address, city, bin, state should be longer than 2\n";
  //spec
  let spec = formData.get("spec").length > 0;
  formValidity = spec && formValidity;
  errorMsg += spec ? "" : "choose a sepcialization\n";

  //password
  let passwrod = formData.get("password").length > 6;
  formValidity = formValidity && passwrod;
  errorMsg += passwrod ? "" : "password must be at least 6 characters\n";

  console.log(formValidity);
  if (!formValidity) {
    alert(errorMsg);
  } else {
    alert("Submitted the form successfully");
    setTimeout(() => {
      let name1 = formData.get("fname");
      let name2 = formData.get("lname");
      const url = `main.html?fname=${name1}&lname=${name2}`;
      window.location.href = url;
    }, 1000);
  }
};
const formHandler = (event) => {
  event.preventDefault();

  const form = document.getElementById("regForm");
  let formData = new FormData(form);

  validator(formData);
};

window.formHandler = formHandler;
window.changeColor = changeColor;
