import sccLoader from '../index';
import styled from 'styled-components';
import { expectSameComponents, getModuleFromString } from './util';

test('transform single component', () => {
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

test('default component should be div', () => {
  expectSameComponents(
    styled.div`
      font-size: 1.5em;
    `,

    getModuleFromString(
      sccLoader(`
      Title {
        font-size: 1.5em;
      }
    `)
    ).Title
  );
});
