import React from 'react';

interface isEmptyTypes {
  clinicName?: string;
  email: string;
  mobile?: string;
  password: string;
  identifier?: string;
  cf_password?: string;
  address?: string;
}

interface isValidTypes {
  email: string;
  password: string;
  cf_password?: string | undefined;
}

export const isEmpty: React.FC<isEmptyTypes> = ({
  clinicName,
  email,
  identifier,
  mobile,
  password,
  cf_password,
  address,
}) => {
  let errors: any = {};
  if (clinicName === '') errors.clinicName = 'clinicName must not be empty';
  if (email === '') errors.email = 'Email must not be empty';
  if (mobile === '') errors.mobile = 'Mobile must not be empty';
  if (identifier === '') errors.identifier = 'identifier must not be empty';
  if (password === '') errors.password = 'Password must not be empty';
  if (cf_password === '') errors.cf_password = 'Password must not be empty';
  if (address === '') errors.address = 'Address must not be empty';

  if (Object.keys(errors).length > 0) return errors;
};

export const isValid: React.FC<isValidTypes> = ({
  email,
  password,
  cf_password,
}) => {
  let errors: any = {};
  if (!validateEmail(email)) errors.email = 'Enter valid email';
  if (password.length < 6) errors.password = 'Must be at least 6 characters';
  if (cf_password && password !== cf_password)
    errors.cf_password = 'Passwords do not match';

  if (Object.keys(errors).length > 0) return errors;
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
