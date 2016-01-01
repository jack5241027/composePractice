
require('./support.js');
var _ = require('ramda');
var accounting = require('accounting');
// var compose = function(f,g) {
//   return function(x) {
//     return f(g(x));
//   };
// };
// var head = function(x) { return x[0]; };
// var reverse = Array.prototype.reduce.call(this,function(acc, x){ return [x].concat(acc); }, []);
// var last = compose(head, reverse);

// last(['jumpkick', 'roundhouse', 'uppercut']);
var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

//练习 1:
//============
//使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

isLastInStock = compose( _.prop('in_stock'), _.last);

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = undefined;

nameOfFirstCar = compose(_.prop('name'), _.head);

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动

var averageDollarValue = function(cars) {
  var dollar_values = map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};

averageDollarValue = _.compose(_average, _.map(function(c) { return c.dollar_value; }));

// // 练习 4:
// // ============
// // 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

var _underscore = replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它

// var sanitizeNames = undefined;

sanitizeNames =  _.map(_.compose( _underscore ,toLowerCase , _.prop('name')));

module . exports  = { CARS :  CARS ,
                   isLastInStock : isLastInStock,
                   nameOfFirstCar : nameOfFirstCar,
                   // fastestCar : fastestCar,
                   averageDollarValue : averageDollarValue,
                   // availablePrices : availablePrices,
                   sanitizeNames : sanitizeNames
                 };
