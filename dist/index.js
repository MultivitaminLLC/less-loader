'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _processResult = require('./processResult');

var _processResult2 = _interopRequireDefault(_processResult);

var _getOptions = require('./getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Forked "less-loader" version "4.1.0"

  Why fork?
  They adapted their plugin for webpack 3+, and removed 'this.cacheable()' call.
  Seems like webpack 3+ don't need that call.
  But webpack 1 need that to know, that it can cache modules.

  So the problem is:
  any changes in watch mode force webpack to recompile all less files, every time!

  Changed lines are marked with comment: // added this line
 */

var render = (0, _pify2.default)(_less2.default.render.bind(_less2.default));

function lessLoader(source) {
  var loaderContext = this;
  var options = (0, _getOptions2.default)(loaderContext);
  var done = loaderContext.async();
  var isSync = typeof done !== 'function';

  if (isSync) {
    throw new Error('Synchronous compilation is not supported anymore. See https://github.com/webpack-contrib/less-loader/issues/84');
  }

  // added this line
  if (this.cacheable) {
    this.cacheable();
  }

  (0, _processResult2.default)(loaderContext, render(source, options));
}

exports.default = lessLoader;