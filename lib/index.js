'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _abcq = require('abcq');

var _abcq2 = _interopRequireDefault(_abcq);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _htmlElementAttributes = require('html-element-attributes');

var _htmlElementAttributes2 = _interopRequireDefault(_htmlElementAttributes);

var _domElements = require('./dom-elements');

var _domElements2 = _interopRequireDefault(_domElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hashCode = function hashCode(s) {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

var shortid = new _abcq2.default();

var createStyleBlock = function createStyleBlock(s) {
  return Object.keys(s).map(function (key) {
    return '.' + (key.split(':')[0] + '{') + s[key] + '}';
  }).join('').replace(/\s+/g, ' ');
};

var Styled = function () {
  function Styled() {
    _classCallCheck(this, Styled);

    this.__STYLES__ = {};
    this.STYLE_TAG = document.createElement('style');
  }

  _createClass(Styled, [{
    key: 'init',
    value: function init() {
      document.head.appendChild(this.STYLE_TAG);
    }
  }]);

  return Styled;
}();

var styled = new Styled();

_domElements2.default.forEach(function (domElement) {
  styled[domElement] = function () {
    for (var _len = arguments.length, _ = Array(_len), _key = 0; _key < _len; _key++) {
      _[_key] = arguments[_key];
    }

    return createComponent(_, { domElement: domElement });
  };
});

var createClassName = function createClassName(id, pString) {
  return shortid.encode(Math.abs(hashCode(id + pString)));
};

var createComponent = function createComponent(args, _ref) {
  var domElement = _ref.domElement;

  var _args = _slicedToArray(args, 1),
      strings = _args[0];

  args.shift();
  var css = void 0;
  var id = (0, _v2.default)();
  var component = function component(p) {
    var pp = _extends({}, p, { children: null });
    var pString = JSON.stringify(pp);
    css = strings.map(function (str, i) {
      var dynamic = args[i] || '';
      var addon = dynamic;
      if (typeof dynamic === 'function') {
        addon = dynamic(p) || '';
      }
      return '' + str + addon;
    }).join('').replace(/\n+/, '\n');
    var className = createClassName(id, pString);
    styled.__STYLES__[className] = css;
    if (!STYLE_TAG.innerHTML.match('.' + className + ' {')) {
      styled.STYLE_TAG.innerHTML = createStyleBlock(styled.__STYLES__);
    }
    return (0, _react.createElement)(domElement, _extends({}, p));
  };
  return component;
};

exports.default = styled;
//# sourceMappingURL=index.js.map