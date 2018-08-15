let fs = require("fs")
let path = require("path")
let _ = require("lodash");

let jsPathList = [];
//let avoidList = ["node_modules", ".gitlab", "task"];

function readDir(myPath, avoidList) {
  fs.readdir(myPath, function (err, menu) {
    if (!menu)
      return;
    menu.forEach(function (ele) {
      if(ele == "@romensService")
        console.log(ele)
      fs.stat(myPath + "/" + ele, function (err, info) {
        if (info.isDirectory()) {
          //排除部分目录
          if (_.findIndex(avoidList, (item)=> {
                return item == ele
              }) == -1) {
            //console.log(ele);
            readDir(myPath + "/" + ele);
          }
        } else {
          //匹配js文件
          if (ele.match(/^[\S]+\.js$/)) {

            fs.readFile(path.join(myPath, ele), {encoding: "utf-8"}, function (err, fr) {
              if (err) {
                console.log(err);
                throw err;
              } else {
                let regExp = /require\((base[\s]*\+[\s]*|path.join\(__dirname,[\s]*)*?[\'\"][\.\/][\S]+?[\'\"]\)/g;
                let requireList = fr.match(regExp);
                if(path.join(myPath, ele) == "/Users/romens/Desktop/project/icrm-src/@usecase/kpi/scheduleCase/creator.js"){
                  //console.log(requireList)
                }
                let quoteList = _.map(requireList, (item)=> {
                  return path.join(myPath, item.replace(/require\([\s\S]*?[\'\"]([\S]+)[\'\"]\)/, '$1'));
                });
                if(path.join(myPath, ele) == "/Users/romens/Desktop/project/icrm-src/@usecase/kpi/scheduleCase/creator.js"){
                  //console.log(quoteList)
                }

                jsPathList.push({
                  path: path.join(myPath, ele),
                  quote: quoteList
                })
              }
            });
          }
        }
      })
    })
  })
}

module.exports = (root, avoidList, cb)=> {
  console.log("root dir: " + root);

  readDir(root, avoidList);

  setTimeout(()=> {
    cb(jsPathList)
  }, 2000);

}