import sccLoader from '../index';
import React from 'react';
import styled from 'styled-components';
import { expectSameComponents, getModuleFromString } from './util';
import { create } from 'react-test-renderer';
import 'jest-styled-components';

test('should support new rule: component ', () => {
  const SccTitle = getModuleFromString(
    sccLoader(`
      Title {
        component: h1;
      }
    `)
  ).Title;
  const tree = create(<SccTitle>title</SccTitle>).toJSON();
  expect(tree.type).toBe('h1');
});

test('rule: component should have default value of div', () => {
  const SccTitle = getModuleFromString(
    sccLoader(`
      Title {
      }
    `)
  ).Title;
  const tree = create(<SccTitle>title</SccTitle>).toJSON();
  expect(tree.type).toBe('div');
});

test('should transform to styled component', () => {
  const transformedCode = sccLoader(`
    Title {
      component: h3;
      font-size: calc((props) => props.size);
      color: red;
    }
  `);
  expect(transformedCode).toContain('styled.h3');
  expect(transformedCode).toContain('font-size:${(props)=>props.size}');
  expect(transformedCode).toContain('color:red;');
});
