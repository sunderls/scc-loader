import sccLoader from '../index';
import Module from 'module';
import * as babel from 'babel-core';
import * as path from 'path';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

const expectSameComponents = (A, B, props) => {
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


test('transofrm multiple components and function as value', () => {
  const m = getModuleFromString(
    sccLoader(`
    Title {
      component: h1;
      font-size: 1.5em;
      text-align: center;
    }
    Wrapper {
      component: section;
      padding: 4em;
      background: papayawhip;
      font-size: (props.size === 'large' ? '14px': '12px')
    }
  `)
  );

  expectSameComponents(
    styled.h1`
      font-size: 1.5em;
      text-align: center;
    `,
    m.Title
  );

  expectSameComponents(
    styled.h1`
      padding: 4em;
      background: papayawhip;
      font-size: ${props => props.size === 'large' ? '14px': '12px'}
    `,
    m.Wrapper,
    {
      size: 'large'
    }
  );
});
