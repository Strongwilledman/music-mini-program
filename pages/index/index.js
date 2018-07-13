//index.js
//获取应用实例
Page({
  data: {
    num : 2,
    navlist:['推荐','排行榜','搜索'],
    musicdata:[],//存放推荐页数据
    rankdata:[],//存放排行榜数据
    active_search:false, //表示搜索页面取消按键的显示状态
    searchdata:[] //存放搜索数据
  },

  onLoad(){
    var c = this;
    //推荐页面请求
    wx.request({
        url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1531384523271',
        success:function(res){
          c.setData({
              musicdata:res.data.data
          })
        }
    })

    //排行榜页面请求
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1531446764395',
      success: function (res) {
        c.setData({
          rankdata: res.data.data.topList
        })
      }
    })
  },
  navclick:function(e){
    this.setData({
      num: e.currentTarget.dataset.index
    });
  },
  
  searchIsClick:function(){
      this.setData({
        active_search:true
      })
  },
  cancleIsClick: function () {
    this.setData({
      active_search:false
    })
  },
  search:function(event){
    var e = this
    var keyword = event.detail.value
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E4%BA%94%E6%9C%88%E5%A4%A9&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1531451028636',
      data: {
        w: keyword
      },
      success: function (res) {
        console.log(res.data)
        e.setData({
          searchdata: res.data.data
        })
      }
    })
    
  },
  playSong:function(event){
    var mid = event.currentTarget.dataset.mid
    wx.playBackgroundAudio({
      dataUrl: 'http://dl.stream.qqmusic.qq.com/C400'+mid+'.m4a?guid=2249120395&vkey=7111BBA426871748B02F00CEE3AD4BEDD2442571FF9E071779A3C9E1C72AEDBB2D3552D4C2FBBC2CE5F2390768993123182D2566C0395F44&uin=0&fromtag=38',
    })
  }
})
