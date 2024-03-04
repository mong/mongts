const validate = (invalidStates: { [key: string]: boolean }) => {
  return !Object.values(invalidStates).some((invalid) => invalid);
};

export { validate };
