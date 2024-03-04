import _ from "lodash";

const areDifferent = (atlas1: { [key: string]: any}, atlas2: { [key: string]: any}) => {
  return !_.isEqual(atlas1, atlas2);
};

const findDiff = (obj1: { [key: string]: any}, obj2: { [key: string]: any}) => {
  const diff: { [key: string]: { obj1: any, obj2: any } } = {};

  // Function to check differences and update the 'diff' object
  const checkAndAddDiff = (key: string) => {
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
