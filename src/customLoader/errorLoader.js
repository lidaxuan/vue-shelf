const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;
const t = require("@babel/types");


module.exports = function (content) {
  const ast = parser.parse(content);

  // const ast = content;
  traverse(ast, {
    'enter': function (path) {
      // 处理方法
      const opts = {async: true};
      const isAsyncFun = t.isFunctionDeclaration(path.node, opts) || t.isArrowFunctionExpression(path.node, opts) || t.isFunctionExpression(path.node, opts);
      // 判断是否是异步函数
      if (!isAsyncFun) { // 不是async函数就停止操作
        return;
      }
      console.log('isAsyncFun', isAsyncFun)
      const bodyNode = path.get("body");
      const FunNode = bodyNode.node.body;
      if (!t.isTryStatement(FunNode[0])) {
        // 说明没有try
        const code = `
                console.log(error);
           `;
        // 添加try的节点
        const resultAst = t.tryStatement(
            bodyNode.node,
            // catch的节点
            t.catchClause(t.identifier("error"),
                t.blockStatement(parser.parse(code).program.body)
            )
        )
        // 替换方法里面的内容
        bodyNode.replaceWithMultiple([resultAst]);
      }
    }
  })
  // 通过load的callback方法  返回处理过的code
  // this.callback(null,generate(ast).code,sourceMap,meta);

  return generate(ast).code
}