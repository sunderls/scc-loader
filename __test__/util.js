import Module from 'module';
import * as babel from 'babel-core';
import * as path from 'path';

export const expectSameComponents = (A, B, props) => {
  const rulesA = A.componentStyle.rules;
  const rulesB = B.componentStyle.rules;
  for (let i = 0, total = rulesA.length; i < total; i++) {
    if (typeof rulesA[i] === 'string') {
      expect(rulesA[i]).toEqual(rulesB[i]);
    } else if (typeof rulesA[i] === 'function') {
      expect(rulesA[i](props)).toEqual(rulesB[i](props));
    }
  }
};

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
