let fs = require("fs")
let path = require("path")
let _ = require("lodash");
let ergodicTree = require('./ergodicTree');
let common = require('./common');

let avoidList = ["node_modules", ".gitlab", "task", "test", "bin", "config"];

ergodicTree(path.join(__dirname, '../'), avoidList, (tree)=> {

  let ext = [".js", ".json", "xml"]

  //获取所有被引用过的文件路径集合
  let quotePath = common.getQuotePath(tree)
  //所有参与验证的文件路径
  let checkPath = common.getCheckPath(tree)

  //用参与验证的引用路径先排除文件路径中存在的路径
  let uncheckedQuotePath = _.difference(quotePath, checkPath);

  let checkedList = [];
  _.each(uncheckedQuotePath, (item)=> {

    //猜测可能是缺少后缀名(补全后缀重新匹配)
    //js、json、jsx后缀

    let res = item.match(/^[\S]+\.(js||json||jsx||css||xml)$/)
    if (!res) {
      _.each(ext, (extItem)=> {
        let newPath = item + extItem;
        let findIndex = _.findIndex(checkPath, (pa)=> {
          return pa == newPath
        })
        if (findIndex > -1) {
          checkedList.push(item);
        }
      })
    }

    //猜测可能是需要补全index.js文件
    if (!res) {
      let newPath2 = item + "/index.js";
      let findIndex = _.findIndex(checkPath, (pa)=> {
        return pa == newPath2
      })
      if (findIndex > -1) {
        checkedList.push(item);
      }
    }


  })
  uncheckedQuotePath = _.difference(uncheckedQuotePath, checkedList);

  let newCheckedList = [];
  //在文件系统中查找文件
  _.each(uncheckedQuotePath, (item)=> {
    let res = item.match(/^[\S]+\.(js||json||jsx||css||xml)$/)
    if (res) {
      fs.exists(item, function (exists) {
        exists && newCheckedList.push(item);
      });
    } else {
      _.each(ext, (extItem)=> {
        let newPath = item + extItem;
        fs.exists(newPath, function (exists) {
          exists && newCheckedList.push(item);
        });
      })

      let newPath2 = item + "/index.js";
      fs.exists(newPath2, function (exists) {
        exists && newCheckedList.push(item);
      });
    }
  })

  setTimeout(function () {

    uncheckedQuotePath = _.difference(uncheckedQuotePath, newCheckedList);

    //统计未通过验证的引用信息
    let invalidList = []
    _.each(tree, (treeItem)=>{
      let invalidQuote = _.intersection(treeItem.quote, uncheckedQuotePath);
      if(invalidQuote.length){
        invalidList.push({
          "文件": treeItem.path,
          "无效的引用": invalidQuote
        })
      }
    })
    console.log(invalidList);
  }, 2000)

})