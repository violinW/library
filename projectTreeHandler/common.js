let _ = require("lodash");
let getQuotePath = (tree)=> {
  //获取所有被引用过的文件路径集合
  let quotePath = [];
  _.each(tree, (treeItem)=> {
    quotePath = _.concat(quotePath, treeItem.quote)
  })
  quotePath = _.uniq(quotePath);
  return quotePath;
}

let getCheckPath = (tree)=>{
  let checkPath = _.map(tree, (treeItem)=> {
    return treeItem.path
  })

  return checkPath
}
module.exports = {
  getQuotePath,
  getCheckPath
}