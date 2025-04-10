export const verifyEnteredFields = (data) => {
  console.log("Data payload ", data);
  let errors = [];
  let isValid = false;

  let regexp_password = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
  let regexp_email = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // if (data?.email === "") {
  //   errors.push("Email adresa je obavezno polje!");
  // }

  if (!data?.email.match(regexp_email)) {
    errors.push("Email adresa je obavezno polje!");
    errors.push(
      "Email adresa nije validna, probajte nešto poput (test@test.com)"
    );
  }

  if (data?.password === "") {
    if (data?.password?.length < 8) {
      errors.push("Password je obavezno polje!");
      errors.push("Password bi trebao imati minimalno 8 karaktera");
    }
    if (!data?.password.match(regexp_password)) {
      errors.push(
        "Password bi trebao da se sastoji od slova, brojeva i specijalnih karaktera!"
      );
    }
  }

  if (errors.length > 0) {
    return [errors, isValid];
  }
  isValid = true;
  return [errors, isValid];
};

export const verifyLoginCredentials = (data) => {
  let errors = [];
  let isValid = false;

  let regexp_email = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (data.email === "" || data.email === undefined) {
    errors.push("Email adresa nije unešena. Molimo unesite email adresu");
  }

  if (!data.email.match(regexp_email)) {
    errors.push(
      "Email adresa nije validna, probajte nešto poput (test@test.com)"
    );
  }

  if (data.password === "" || data.password === undefined) {
    errors.push("Password nije unešen. Molimo unesite password");
  }

  if (errors.length > 0) {
    return [errors, isValid];
  }
  isValid = true;
  return [errors, isValid];
};
