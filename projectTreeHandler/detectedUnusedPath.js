let fs = require("fs")
let path = require("path")
let _ = require("lodash");
let ergodicTree = require('./ergodicTree');
let common = require('./common');

let avoidList = ["node_modules", ".gitlab"];

let exemptionPath = ["task", "swagger/v1/controller", "app.js", "projectTreeHandler"]

ergodicTree(path.join(__dirname, '../'), avoidList, (tree)=> {
  let ext = [".js", ".json", "xml"]

  let quotePath = common.getQuotePath(tree)
  //所有参与验证的文件路径
  let checkPath = common.getCheckPath(tree)

  //用参与验证的文件路径先排除引用文件路径中存在的路径
  let unQuoteCheckPath = _.difference(checkPath, quotePath);

  let extTree = [];
  _.each(quotePath, (item)=> {

    //猜测可能是缺少后缀名(补全后缀重新匹配)
    //js、json、jsx后缀
    let res = item.match(/^[\S]+\.(js||json||jsx||css||xml)$/)
    if (!res) {
      _.each(ext, (extItem)=> {
        let newPath = item + extItem;
        let findIndex = _.findIndex(unQuoteCheckPath, (pa)=> {
          return pa == newPath
        })
        if (findIndex > -1) {
          extTree.push(newPath);
        }
      })
    }

    //猜测可能是需要补全index.js文件
    if (!res) {
      let newPath2 = item + "/index.js";
      let findIndex = _.findIndex(unQuoteCheckPath, (pa)=> {
        return pa == newPath2
      })
      if (findIndex > -1) {
        extTree.push(newPath2);
      }
    }
  })

  unQuoteCheckPath = _.difference(unQuoteCheckPath, extTree);

  let unUsedPath = [];
  _.each(unQuoteCheckPath, (item)=> {
    let ind = _.findIndex(exemptionPath, (pa)=> {
      return !!item.match(path.join(__dirname, "../" + pa))
    })
    if (ind == -1) {
      unUsedPath.push(item);
    }
  })
  //console.log(unUsedPath);
})