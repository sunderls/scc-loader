import Module from 'module';
import * as babel from 'babel-core';
import * as path from 'path';
export const getModuleFromString = str => {
  const codeES5 = [
    babel.transformSync(str, {
      presets: ['@babel/preset-env']
    }).code
  ].join('\n');
  const m = new Module();
  m.paths = Module._nodeModulePaths(path.dirname(''));
  m._compile(codeES5, '');
  return m.exports.default;
};
