'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepExtend = deepExtend;
exports.diffObject = diffObject;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * compactObject - deletes the empty valued properties from the object
 * @params {Object} - The object
 */
var compactObject = exports.compactObject = function compactObject(object) {
  var clone = _.clone(object);
  _.each(clone, function (value, key) {
    /** Not using _.isEmpty since false is also considered empty  */
    if (value === '' || value === undefined || _.isObject(value) && _.keys(value).length === 0) {
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
  _.each(compactObj, function (value, key) {
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
function deepExtend(target, source) {
  if (_.isObject(target) && _.isObject(source)) {
    _.keys(source).forEach(function (key) {
      if (_.isObject(source[key]) || source[key] === null) {
        if (!target[key]) {
          _.extend(target, _defineProperty({}, key, {}));
        }
        deepExtend(target[key], source[key]);
      } else {
        _.extend(target, _defineProperty({}, key, source[key]));
      }
    });
  }
  return target;
}

/**
 * diffObject - Compares Object1 with Object2 and returns the different key-value pairs
 * @params {Object} - The object1
 * @params {Object} - The object2
 * @return {Object} - The diff of object1 and object2
 */
function diffObject(object1, object2) {
  return Object.keys(object1).concat(Object.keys(object2)).reduce(function (map, key) {
    if (object1[key] !== object2[key]) {
      map[key] = object2[key];
    }
    return map;
  }, {});
}

var utils = {
  compactObject: compactObject,
  recursiveOmit: recursiveOmit,
  deepExtend: deepExtend,
  diffObject: diffObject
};

exports.default = utils;