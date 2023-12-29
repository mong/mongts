"use strict";

const validate = (invalidStates) => {
  return !Object.values(invalidStates).some((invalid) => invalid);
};

export { validate };
