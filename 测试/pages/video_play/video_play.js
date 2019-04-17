Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_que:0,//控制问题面板/考核面板显示与隐藏 0隐藏 1显示问题面板 2显示考核面板 
    open_commentes:0,//控制评论面板显示与隐藏
    sel_que_ans:0,//选项的值 0为未选择
    que_ans_true:1,//问题的正确答案
    ans_check:true,//判断答案是否正确
    like_star:0,//判断点赞
    user_commentes:'',//存储用户输入的评论内容
    details:{//当前视频详情的模拟数据
      video_src:'',
      title:'习主席的公仆之路',
      sec_title:'习主席的公仆之路（原声）*读取视频介绍',
      date:'2018-11-20',
      count:40,
      study_num:10,
      isStar:false//是否被收藏
    },
    assessment:[//考核的模拟数据
      {
        title:'党章和党的基本知识教育；',//考核的名字
        isAnswer:false,//是否需要答题
        needStudy:[//需要学习的数据
          {
            title:'中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',//需要学习的名字
            type:0,//需要学习的类型 0为文章 1为视频
            isStudy:false//是否学习
          },
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 1,
            isStudy: false
          },
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 0,
            isStudy: true
          }
        ]
      },
      {
        title: '党章和党的基本知识教育；党章和党的基本知识教育；党章和党的基本知识教育；党章和党的基本知识教育；党章和党的基本知识教育；',
        isAnswer: false,
        needStudy: [
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 0,
            isStudy: false
          },
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 1,
            isStudy: false
          },
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 0,
            isStudy: true
          }
        ]
      },
      {
        title: '党章和党的基本知识教育；',
        isAnswer: true,
        needStudy: [
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 1,
            isStudy: true
          },
          {
            title: '中国特色社会主义共同理想和共产主义远大中国特色社会主义共同理想和共产主义远大...',
            type: 0,
            isStudy: true
          }
        ]
      }
    ],
    test:[//相关考核的模拟数据
      {
        title:'关于中共十九大开幕的考核(1.22)关于中共十九大开幕的考核(1.22)',
        complete:45,
        date:'03-02'
      },
      {
        title: '关于中共十九大开幕的考核（1.23）',
        complete: 45,
        date: '03-02'
      }
    ],
    commentes:[//评论的模拟数据
      {
        img_src:'../../images/flag_red.png',
        uname:'54Doctor',
        comm_detail: `“备豫不虞，为国常道”。在党的十九大报告中，防范化解重大风险被摆在打好三大攻坚战的首位。做好这一工作应遵循哪些原则？习近平总书记此次讲话中明确了“三个既要、三个也要”：既要高度警惕“黑天鹅”事件，也...`,
        star:0
      },
      {
        img_src: '../../images/flag_red.png',
        uname: '54Doctor',
        comm_detail: `为人民服务我们是专业的！[强][强][点赞]，脚踏实地，探索创新呢！`,
        star: 1
      },
      {
        img_src: '../../images/flag_red.png',
        uname: '54Doctor',
        comm_detail: `好好学，好好看，学到老活到老~`,
        star: 2
      },
      {
        img_src: '../../images/flag_red.png',
        uname: '54Doctor',
        comm_detail: `好好学，好好看，学到老活到老~`,
        star: 3
      },
      {
        img_src: '../../images/flag_red.png',
        uname: '54Doctor',
        comm_detail: `“备豫不虞，为国常道”。在党的十九大报告中，防范化解重大风险被摆在打好三大攻坚战的首位。做好这一工作应遵循哪些原则？习近平总书记此次讲话中明确了“三个既要、三个也要”：既要高度警惕“黑天鹅”事件，也...`,
        star: 0
      },
    ],
    recom:[//推荐的模拟数据
      {
        title:'习主席的公仆之路（原声录音）',
        time:'03:00',
        img_src:'../../images/recom_left.jpg'
      },
      {
        title: '中国共产党第十九届中央委员会第三次全体会议',
        time: '03:04',
        img_src:'../../images/recom_left.jpg'
      },
      {
        title: '中央军委举行慰问驻京部队老干部迎新春文艺演出 习近平向全军老同志祝贺新春中央军委举行慰问驻京部队老干部迎新春文艺演出 习近平向全军老同志祝贺新春中央军委举行慰问驻京部队老干部迎新春文艺演出 习近平向全军老同志祝贺新春',
        time: '04:12',
        img_src:'../../images/recom_left.jpg'
      }
    ],
    isOnClick:2//控制默认显示评论/推荐 1评论 2推荐
  },
  //获取用户输入的评论的值
  get_uCom_val:function(e){
    var that = this;
    that.setData({
      user_commentes: e.detail.value
    })
  },
  //评论弹窗的处理事件
  show_com_modal:function(e){
    if(e.currentTarget.dataset.cms == 1)
    {
      this.setData({
        open_commentes:1
      })
    }
    else if (e.target.dataset.cms == 3)
    {
      //对输入的值作处理
      this.setData({//关闭评论弹窗
        open_commentes: 0
      })
    }
    else if (e.currentTarget.dataset.cms == 2)
    {
      this.setData({//打开考核弹窗
        open_que:2
      })
    }
    else if (e.target.dataset.cms == 4)
    {
      this.setData({//关闭考核弹窗
        open_que: 0
      })
    }
    else
    {
      console.log('无触发');
    }
  },
  //收藏的处理事件
  star_video:function(e){
    let viedoStarState = `details.isStar`;
    this.setData({
      [viedoStarState]: !this.data.details.isStar
    })
  },
  //点赞的处理事件
  like_star:function(e){
    //暂时处理不了点赞状态
    // let starCount = `commentes[${e.currentTarget.dataset.like}].star`;
    // this.setData({
    //   [starCount]: this.data.commentes[e.currentTarget.dataset.like].star+1
    // })
  },
  //问题弹窗
  show_que:function(e){
    this.setData({
      open_que:1,
      sel_que_ans:0
    })
  },
  //提交答案
  submit_ans:function(e){
    this.setData({
      ans_check: this.data.sel_que_ans == this.data.que_ans_true
    })
    if (this.data.ans_check){
      this.setData({
        open_que:0
      })
    }
  },
  //判断选择的是第几个答案
  sel_answer:function(e){
    this.setData({
      ans_check:true,
      sel_que_ans:e.target.dataset.ans
    })
    console.log(this.data.sel_que_ans)
  },
  //评论 推荐的tab切换
  handleTap:function(e){
    switch (e.currentTarget.dataset.idx){
      case '1':this.setData({
                  isOnClick: e.currentTarget.dataset.idx
                })
                break;
      case '2': this.setData({
                  isOnClick: e.currentTarget.dataset.idx
                })
                break;
      default: this.setData({
                  isOnClick:2
                })
                break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})