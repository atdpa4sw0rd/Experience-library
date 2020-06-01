function Search(objId, inputId) {
  /* 方法说明
      此方法依赖于 jquery 开发的，必须先导入 jquery

    *@param{String} objId 需要被搜索内容表格的id或class
    *@param{String} inputId 搜索框的id或class
   */



  // 表格搜索
  this.tableSearch = function () {
    $('#content-null').remove(); // 每次进入先移出掉上次搜索产生的tr
    this.objId.find('tr span').css({// 每次搜索开始，先把所有字体颜色恢复初始状态
      color: "black"
    });


    var tableTrTdContent = this.objId.find('tr td:contains("' + this.inpIdContents + '")'); // 获取所有含有搜索内容的td，类似于集合存储       
    // console.log(tableTrTdContent.length)
    if (tableTrTdContent.length == 0) {// 判断集合长度是否为0，为0则表示搜索的内容在表格里不存在

     
      this.objId.find('tr:not(:eq(0))').css({ // 先将所有tr隐藏
        display: "none"
      })

      var tableColspanNumber = this.objId.find('tr').eq(0).find('th').length || this.objId.find('tr').eq(0).find('td').length; // 获取表头的列数 
      var tr = $(`
  <tr id="content-null">
  <td colspan='${tableColspanNumber}' style="text-align: center;">暂无你搜索的内容</td>
  </tr>
  `); // 创建搜索不到时，显示的tr
      this.objId.append(tr)
    } else if (tableTrTdContent.length > 0) {// 集合长度不为0，则表示搜索的内容在表格里
      // console.log("我在")
      // console.log(tableTrTdContent)

      $('#content-null').remove();

      this.objId.find('tr:not(:eq(0))').css({ // 先将所有tr隐藏
        display: "none"
      })


      for (var a = 0; a < tableTrTdContent.length; a++) {// 遍历找到的td集合，进行每个渲染颜色
        // console.log(tableTrTdContent[a].parentNode)
        tableTrTdContent[a].parentNode.style.display = "table-row"; // 让含有搜索内容的 tr 进行显示
        var contents = tableTrTdContent.eq(a).text(); // 获取到含有搜索内容的td里的集体内容，即字符串
        var contentsArr = contents.split(this.inpIdContents); // 以搜索框中的内容将td的值进行分割成数组
        var contentArrFirst = contentsArr[0]; // 将数组里的第一个值取出
        for (var j = 1; j < contentsArr.length; j++) {// 将分割出来的内容进行染色后重新组合在一起
          contentArrFirst += "<span style='color:red;'>" + this.inpIdContents + "</span>" + contentsArr[j];
        };
        tableTrTdContent.eq(a).html(contentArrFirst); // 将td里的值从新解析成html
      }

    }

    if (this.inpIdContents.length == 0) {// 判断输入框的长度是否为空，为空就表示没有搜索，就要还原所有属性
      // console.log("空啊")
      this.objId.find('tr:not(:eq(0))').css({
        display: "table-row"
      });

      $('#content-null').remove();
    };


  }

  // 初始化，判断需要搜索标签的类型
  this.init = function () {
    if (typeof $ == "undefined") {// 判断是否引入 jquery
      throw new Error("该搜索功能依赖于jquery插件，需要引入jquery");
    }


    if (typeof objId[0] == "undefined") {// 判断是通过jquery获取的id还是原生获取的id,需要把原生的转换成jquery
      this.objId = $(objId); // 需要搜索的对象的id       

    } else {
      this.objId = objId; // 需要搜索的对象的id          

    }

    if (typeof inputId[0] == "undefined") {// 判断搜索框获取的方式，转换成jquery获取
      var inp = $(inputId);
    } else {
      var inp = inputId;
    }

    this.inpIdContents = inp.val().trim() // 获取搜索框里的值,去除首尾空格
    this.objType = this.objId[0].tagName; // 获取需要被搜索对象的标签类型,将jquey转化为原生js获取标签类型
    // console.log(this.objId.find("tr th").length)
    // if (this.objId.find("tr th").length == 0) {// 判断表格是否有表头,没有就创建错误信息
    //   throw new Error("你要搜索的表格没有表头 <th> 标签，请规范好表格");
    // }


    switch (this.objType) {// 判断搜索对象
      case 'TABLE': this.tableSearch(); break; // 对象是表格，进行表格搜索

    }
  }
  this.init()
}