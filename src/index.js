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

import less from 'less';
import pify from 'pify';

import processResult from './processResult';
import getOptions from './getOptions';

const render = pify(less.render.bind(less));

function lessLoader(source) {
  const loaderContext = this;
  const options = getOptions(loaderContext);
  const done = loaderContext.async();
  const isSync = typeof done !== 'function';

  if (isSync) {
    throw new Error(
      'Synchronous compilation is not supported anymore. See https://github.com/webpack-contrib/less-loader/issues/84'
    );
  }

  // added this line
  if (this.cacheable) {
    this.cacheable();
  }

  processResult(loaderContext, render(source, options));
}

export default lessLoader;
