'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move = exports.convertCamelCaseToReadable = exports.diffObject = exports.deepExtend = exports.recursiveOmit = exports.compactObject = undefined;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @function compactObject
 * @desc compactObject         - deletes the empty valued properties from the object
 * @param {Object}             - The object
 * @return {object} compactobj - object free from empty valued properties.
 */
var compactObject = exports.compactObject = function compactObject(object) {
  var clone = _underscore2.default.clone(object);
  _underscore2.default.each(clone, function (value, key) {
    /** Not using _.isEmpty since false is also considered empty  */
    if (value === '' || value === undefined || _underscore2.default.isObject(value) && _underscore2.default.keys(value).length === 0) {
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
var recursiveOmit = exports.recursiveOmit = function recursiveOmit(object) {
  var compactObj = compactObject(object);
  _underscore2.default.each(compactObj, function (value, key) {
    if (_underscore2.default.isObject(value)) {
      compactObj[key] = recursiveOmit(value);
    }
    if (_underscore2.default.isObject(compactObj[key]) && _underscore2.default.keys(compactObj[key]).length === 0) {
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
var deepExtend = exports.deepExtend = function deepExtend(target, source) {
  if (_underscore2.default.isObject(target) && _underscore2.default.isObject(source)) {
    _underscore2.default.keys(source).forEach(function (key) {
      if (_underscore2.default.isObject(source[key]) || source[key] === null) {
        if (!target[key]) {
          _underscore2.default.extend(target, _defineProperty({}, key, {}));
        }
        deepExtend(target[key], source[key]);
      } else {
        _underscore2.default.extend(target, _defineProperty({}, key, source[key]));
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
var diffObject = exports.diffObject = function diffObject(object1, object2) {
  return Object.keys(object1).concat(Object.keys(object2)).reduce(function (map, key) {
    if (object1[key] !== object2[key]) {
      map[key] = object2[key];
    }
    return map;
  }, {});
};

/**
 * @function _capitalize
 * @ignore
 * @desc - It will convert the first letter in a given string to uppercase.
 */
var _capitalize = function _capitalize(s) {
  return s[0] && s[0].toUpperCase() + s.slice(1);
};

/**
 * @function _replacer1
 * @ignore
 * @desc - We will pass three strings to this function and it will returns the first string as it is
 * and converts the first letter in second string to uppercase.
 * and returns the third string with an additional space.
 */
var _replacer1 = function _replacer1(match, p1, p2, p3) {
  return '' + p1 + _capitalize(p2) + ' ' + p3;
};

/**
 * @function convertCamelCaseToReadable
 * @param {string} s1 - Enter camel case string to convert to readable.  
 * @return s1         - Returns the each and every string by separating with spaces in between it.
 * @desc              - If you combine more than two strings without any spaces between in it. It will make it readable by providing space between each and every string.
 */
var convertCamelCaseToReadable = exports.convertCamelCaseToReadable = function convertCamelCaseToReadable(s1) {
  return s1.replace(/(^|[^a-z])([a-z]+)([A-Z])/, _replacer1);
};

/**
 * @function move
 * @desc Moves the element from fromIndex to toIndex in the array
 * @param {array} array - The array in which element is to be moved
 * @param {number} fromIndex - The element index which it has to be moved
 * @param {number} toIndex - The index where the element is to be moved
 * @return {array} array - The array with moved element.
 */
var move = exports.move = function move(array, fromIndex, toIndex) {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
};

var utils = {
  compactObject: compactObject,
  recursiveOmit: recursiveOmit,
  deepExtend: deepExtend,
  diffObject: diffObject,
  convertCamelCaseToReadable: convertCamelCaseToReadable,
  move: move
};

exports.default = utils;