import _ from "lodash";

const areDifferent = (atlas1, atlas2) => {
  return !_.isEqual(atlas1, atlas2);
};

const findDiff = (obj1, obj2) => {
  const diff = {};

  // Function to check differences and update the 'diff' object
  const checkAndAddDiff = (key) => {
    if (areDifferent(obj1[key], obj2[key])) {
      diff[key] = { obj1: obj1[key], obj2: obj2[key] };
    }
  };

  // Checking all keys from both objects
  Object.keys(obj1).forEach(checkAndAddDiff);
  Object.keys(obj2).forEach(checkAndAddDiff);

  return diff;
};

export { areDifferent, findDiff };
