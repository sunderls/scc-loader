const postcss = require('postcss');

module.exports = function loader(source) {
  const result = [];
  const ast = postcss.parse(source);

  ast.walkRules(rule => {
    const selector = rule.selector;
    const decls = [];

    let component = null;
    rule.walkDecls(decl => {
      // special prop: component
      if (decl.prop === 'component') {
        component = decl.value;
      } else {
        // if value is function
        if (/^\(.*\)$/.test(decl.value)) {
          decls.push(`${decl.prop}:\${props => ${decl.value}}`)
        } else {
          decls.push(`${decl.prop}:${decl.value};`);
        }
        decl.remove();
      }
    });

    result.push(`${selector}: styled.${component}\`${decls.join('')}\``);
  });

  return `
    import styled from 'styled-components';
    export default {
      ${result.join(',')}
    }
  `;
};
