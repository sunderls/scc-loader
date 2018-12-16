import Module from 'module';
import * as babel from 'babel-core';
import * as path from 'path';

export const expectSameComponents = (A, B) => {
  expect(A.target).toEqual(B.target);
  expect(A.componentStyle.rules).toEqual(B.componentStyle.rules);
};

export const getModuleFromString = str => {
  const codeES5 = babel.transform(str, {
    presets: ['env'],
    plugins: ['babel-plugin-styled-components']
  }).code;
  const m = new Module();
  m.paths = Module._nodeModulePaths(path.dirname(''));
  m._compile(codeES5, '');
  return m.exports.default;
};
