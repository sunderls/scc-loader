const loader = require('../index');

test('it component', () => {
  const str = loader(`
    Title {
      component: h1;
      font-size: 1.5em;
      text-align: center;
    }
  `);
  expect(str).toContain(`import styled from 'styled-components';`);
  expect(str).toContain('Title: styled.h1`font-size:1.5em;text-align:center;`');
});
