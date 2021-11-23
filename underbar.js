(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    if (n > array.length) {
      return array;
    } else {
      return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
    }
  };

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  _.indexOf = function(array, target) {
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  _.filter = function(collection, test) {
    var result = [];

    _.each(collection, function(value) {
      if (test(value)) {
        result.push(value);
      }
    });

    return result;
  };

  _.reject = function(collection, test) {
    return _.filter(collection, function(value) {
      return !test(value);
    });
  };

  _.uniq = function(array, isSorted, iterator) {
    var result = [];
    var obj = {};

    iterator = iterator || _.identity;

    _.each(array, function (value) {
      var transformedValue = iterator(value);
      if (obj[transformedValue] === undefined) {
        obj[transformedValue] = value;
      }
    });

    _.each(obj, function(value) {
      result.push(value);
    });
    return result;
  };


  _.map = function(collection, iterator) {
    var result = [];

    _.each(collection, function(value) {
      result.push(iterator(value));
    });
    return result;
  };

  _.pluck = function(collection, key) {
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {
    var accumlatorBoolean = arguments.length === 2;

    _.each(collection, function(value) {
      if (accumlatorBoolean) {
        accumulator = value;
        accumlatorBoolean = false;
      } else {
        accumulator = iterator(accumulator, value);
      }
    });
    return accumulator;
  };

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;

    if (collection.length === 0) {
      return true;
    }

    return _.reduce(collection, function(isTrue, value) {
      if (isTrue && iterator(value)) {
        return true;
      } else {
        return false;
      }
    }, true);

  };

  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;

    return !_.every(collection, function(value) {
      if (iterator(value)) {
        return false;
      }
      return true;
    }, false);
  };

  _.extend = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  _.defaults = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };

  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  _.memoize = function(func) {
    var memoFunc = function() {
      var result;
      var stringifiedArgs = JSON.stringify(arguments);

      if (memoFunc.memo.hasOwnProperty(stringifiedArgs)) {
        result = memoFunc.memo[stringifiedArgs];
      } else {
        result = func.apply(null, arguments);
        memoFunc.memo[stringifiedArgs] = result;
      }
      return result;
    };

    memoFunc.memo = {};
    return memoFunc;
  };

  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(null, args);
    }, wait);
  };

  _.shuffle = function(array) {
    var newArr = array.slice();
    for ( var i = newArr.length - 1; i >= 0; i--) {
      var idx = Math.floor(Math.random() * i);
      var temp = newArr[i];
      newArr[i] = newArr[idx];
      newArr[idx] = temp;
    }
    return newArr;
  };