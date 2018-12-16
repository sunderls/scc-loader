const postcss = require('postcss');

module.exports = function loader(source) {
  const result = [];
  const ast = postcss.parse(source);

  ast.walkRules(rule => {
    const selector = rule.selector;
    const decls = [];

    // component default to 'div'
    let component = 'div';
    const regPropsValue = /^calc\((\(props\)=>.*)\)$/;
    // find the component
    rule.walkDecls(decl => {
      const { prop, value } = decl;
      if (prop === 'component') {
        component = value;
      } else {
        // find the props calculation
        const match = value.replace(/\s/g, '').match(regPropsValue);
        if (match) {
          decls.push(`${prop}:$\{${match[1]}\}`);

          // keep others the same
        } else {
          decls.push(`${prop}:${value};`);
          decl.remove();
        }
      }
    });

    result.push(`${selector}: styled.${component}\`${decls.join('')}\``);
  });

  return `
    import styled from 'styled-components';
    export default {
      ${result.join('')}
    }
  `;
};
