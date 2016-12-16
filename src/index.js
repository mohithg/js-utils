import _ from 'underscore';

/**
 * compactObject - deletes the empty valued properties from the object
 * @params {Object} - The object
 */
export const compactObject = (object) => {
  const clone = _.clone(object);
  _.each(clone, (value, key) => {
    /** Not using _.isEmpty since false is also considered empty  */
    if ((value === '') || value === undefined || (_.isObject(value) && _.keys(value).length === 0)) {
      delete clone[key];
    }
  });
  return clone;
};

/**
 * recursiveOmit - Removes the empty valued properties from the object recursively
 * @params {Object} - The object
 */
export const recursiveOmit = (object) => {
  const compactObj = compactObject(object);
  _.each(compactObj, (value, key) => {
    if (_.isObject(value)) {
      compactObj[key] = recursiveOmit(value);
    }
    if (_.isObject(compactObj[key]) && _.keys(compactObj[key]).length === 0) {
      delete compactObj[key];
    }
  });
  return compactObj;
};

/**
 * deepExtend - Similar to _.extend but does a deep extend
 * @params {Object} - The object
 */
export const deepExtend = (target, source) => {
  if (_.isObject(target) && _.isObject(source)) {
    _.keys(source).forEach(key => {
      if (_.isObject(source[key]) || source[key] === null) {
        if (!target[key]) {
          _.extend(target, { [key]: {} });
        }
        deepExtend(target[key], source[key]);
      } else {
        _.extend(target, { [key]: source[key] });
      }
    });
  }
  return target;
};

/**
 * diffObject - Compares Object1 with Object2 and returns the different key-value pairs
 * @params {Object} - The object1
 * @params {Object} - The object2
 * @return {Object} - The diff of object1 and object2
 */
export const diffObject = (object1, object2) => (
  Object.keys(object1).concat(Object.keys(object2)).reduce((map, key) => {
    if (object1[key] !== object2[key]) {
      map[key] = object2[key]; // eslint-disable-line no-param-reassign
    }
    return map;
  }, {})
);


const utils = {
  compactObject,
  recursiveOmit,
  deepExtend,
  diffObject,
};

export default utils;
