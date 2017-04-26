import _ from 'underscore';

/**
 * @function compactObject
 * @desc compactObject         - deletes the empty valued properties from the object
 * @param {Object}             - The object
 * @return {object} compactobj - object free from empty valued properties.
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
 * @function recursiveOmit
 * @desc Removes the empty valued properties from the object recursively
 * @param {Object}             - The object.
 * @return {object} compactobj - object free from empty valued properties deep.
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
 * @function deepExtend
 * @desc Similar to _.extend but does a deep extend
 * @param {object} target    - The target object to which source object properties to be merged.
 * @param {object} source    - The source object properties which need's to be merged to target.
 * @return {object} target   - Returns the target object which has the source object properties after merging it.
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
 * @function diffobject
 * @desc Compares Object1 with Object2 and returns the different key-value pairs
 * @param {string} object1     - Enter object1 to compare with object2
 * @param {string} object2     - Enter object2 to compare with object1
 * @return {object} diffobject - Returns the different key-value pairs in object1 and object2.
 */
export const diffObject = (object1, object2) => (
  Object.keys(object1).concat(Object.keys(object2)).reduce((map, key) => {
    if (object1[key] !== object2[key]) {
      map[key] = object2[key];
    }
    return map;
  }, {})
);


/**
 * @function _capitalize
 * @ignore
 * @desc - It will convert the first letter in a given string to uppercase.
 */
const _capitalize = (s) => (
    s[0] && s[0].toUpperCase() + s.slice(1)
);


/**
 * @function _replacer1
 * @ignore
 * @desc - We will pass three strings to this function and it will returns the first string as it is
 * and converts the first letter in second string to uppercase.
 * and returns the third string with an additional space.
 */
const _replacer1 = (match, p1, p2, p3) => (
    `${p1}${_capitalize(p2)} ${p3}`
);


/**
 * @function convertCamelCaseToReadable
 * @param {string} s1 - Enter camel case string to convert to readable.  
 * @return s1         - Returns the each and every string by separating with spaces in between it.
 * @desc              - If you combine more than two strings without any spaces between in it. It will make it readable by providing space between each and every string.
 */
export const convertCamelCaseToReadable = (s1) => (
  s1.replace(/(^|[^a-z])([a-z]+)([A-Z])/, _replacer1)
);

/**
 * @function move
 * @desc Moves the element from fromIndex to toIndex in the array
 * @param {array} array - The array in which element is to be moved
 * @param {number} fromIndex - The element index which it has to be moved
 * @param {number} toIndex - The index where the element is to be moved
 * @return {array} array - The array with moved element.
 */
export const move = (array, fromIndex, toIndex) => {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}

const utils = {
  compactObject,
  recursiveOmit,
  deepExtend,
  diffObject,
  convertCamelCaseToReadable,
  move,
};

export default utils;