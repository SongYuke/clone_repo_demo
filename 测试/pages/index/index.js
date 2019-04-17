// pages/draw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClear: false,
    penColor: 'red',
    lineWidth: 5,
    curContexts: [],
    pathCount: 0,
    contextCount: 0,
  },

  /**
   * 触摸开始
   */
  touchStart: function (e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createCanvasContext("myCanvas", this)
    var arr = new Array();
    this.data.curContexts[this.data.pathCount] = arr;
    this.setData({
      curContexts: this.data.curContexts,
      contextCount: 0,
    })
    if (this.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.setStrokeStyle('#ffffff') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果
      this.context.setLineCap('round') //设置线条端点的样式
      this.context.setLineJoin('round') //设置两线相交处的样式
      this.context.setLineWidth(20) //设置线条宽度
      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath() //开始一个路径
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形
      this.context.fill();  //对当前路径进行填充
      this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      // 设置画笔颜色
      this.context.setStrokeStyle(this.data.penColor);
      // 设置线条宽度
      this.context.setLineWidth(this.data.lineWidth);
      this.context.setLineCap('round') // 让线条圆润
      this.context.beginPath()
    }
  },

  /**
   * 手指触摸后移动
   */
  touchMove: function (e) {

    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y

    if (this.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY);  //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke();  //对当前路径进行描边
      this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息

      this.startX = startX1;
      this.startY = startY1;

    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()

      this.startX = startX1;
      this.startY = startY1;
    }

    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    var actions = this.context.getActions();
    this.data.curContexts[this.data.pathCount][this.data.contextCount] = actions;
    this.setData({
      curContexts: this.data.curContexts
    })
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: actions // 获取绘图动作数组
    });
    this.data.contextCount++;
  },

  /**
   * 触摸结束
   */
  touchEnd: function (e) {
    this.touchMove(e);
    this.setData({
      pathCount: (this.data.pathCount + 1),
      contextCount: 0
    });
  },

  /**
   * 画笔选择
   */
  penSelect: function (options) {
    var lineWidth = options.target.dataset.param;
    console.log("lineWidth:" + lineWidth);
    this.setData({
      isClear: false,
      lineWidth: lineWidth,
    });
  },

  /**
   * 颜色选择
   */
  colorSelect: function (options) {
    var penColor = options.target.dataset.param;
    console.log("penColor:" + penColor);
    this.setData({
      isClear: false,
      penColor: penColor,
    });
  },

  /**
   * 清除涂鸦信息
   */
  clearCanvas: function (options) {
    console.log("clearCanvas");
    this.setData({
      isClear: true
    });
  },

  /**
   * 回退一步
   */
  recoverCanvas: function (options) {
    this.context.clearRect(0, 0, 750, 1280);
    this.context.draw();
    if (this.data.pathCount > 0) {
      for (var i = 0; i < this.data.pathCount - 1; i++) {
        for (var j = 0; j < this.data.curContexts[i].length; j++) {
          wx.drawCanvas({
            canvasId: 'myCanvas',
            reserve: true,
            actions: this.data.curContexts[i][j] // 获取绘图动作数组
          });
        }
      }

      var pathCount = this.data.pathCount - 1;
      this.data.curContexts[pathCount] = null;
      this.setData({
        pathCount: pathCount,
        contextCount: 0,
      });
    }
  }
})
