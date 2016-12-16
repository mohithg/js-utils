'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCamelCaseToReadable = exports.diffObject = exports.deepExtend = exports.recursiveOmit = exports.compactObject = undefined;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * compactObject - deletes the empty valued properties from the object
 * @params {Object} - The object
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
 * recursiveOmit - Removes the empty valued properties from the object recursively
 * @params {Object} - The object
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
 * deepExtend - Similar to _.extend but does a deep extend
 * @params {Object} - The object
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
 * diffObject - Compares Object1 with Object2 and returns the different key-value pairs
 * @params {Object} - The object1
 * @params {Object} - The object2
 * @return {Object} - The diff of object1 and object2
 */
var diffObject = exports.diffObject = function diffObject(object1, object2) {
  return Object.keys(object1).concat(Object.keys(object2)).reduce(function (map, key) {
    if (object1[key] !== object2[key]) {
      map[key] = object2[key];
    }
    return map;
  }, {});
};

var _capitalize = function _capitalize(s) {
  return s[0] && s[0].toUpperCase() + s.slice(1);
};

var _replacer1 = function _replacer1(match, p1, p2, p3) {
  return '' + p1 + _capitalize(p2) + ' ' + p3;
};

var convertCamelCaseToReadable = exports.convertCamelCaseToReadable = function convertCamelCaseToReadable(s1) {
  return s1.replace(/(^|[^a-z])([a-z]+)([A-Z])/, _replacer1);
};

var utils = {
  compactObject: compactObject,
  recursiveOmit: recursiveOmit,
  deepExtend: deepExtend,
  diffObject: diffObject,
  convertCamelCaseToReadable: convertCamelCaseToReadable
};

exports.default = utils;