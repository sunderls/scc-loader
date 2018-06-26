import sccLoader from '../index';
import Module from 'module';
import * as babel from 'babel-core';
import * as path from 'path';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

const expectSameComponents = (A, B) => {
  expect(A.componentStyle.rules).toEqual(B.componentStyle.rules);
};

const getModuleFromString = str => {
  const codeES5 = babel.transform(str, {
    presets: ['env'],
    plugins: ['babel-plugin-styled-components']
  }).code;
  const m = new Module();
  m.paths = Module._nodeModulePaths(path.dirname(''));
  m._compile(codeES5, '');
  return m.exports.default;
};

test('transofrm single component', () => {
  expectSameComponents(
    styled.h1`
      font-size: 1.5em;
      text-align: center;
    `,

    getModuleFromString(
      sccLoader(`
      Title {
        component: h1;
        font-size: 1.5em;
        text-align: center;
      }
    `)
    ).Title
  );
});
