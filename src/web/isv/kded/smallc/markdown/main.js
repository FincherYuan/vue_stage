// 在main.js上通过import引入Vue库和自己写的Vue组件库
import Vue from 'vue'
import CompoOne from './components/CompoOne.vue'
import eventBus from '../../../../../../util/eventBus'

/**
 * Vue实例在setHtml方法中声明，初始化执行init的时候就能够创建
 * 声明Vue实例对象时，在其挂载完毕的生命周期里声明一个订阅，用于订阅update方法中发布的消息，从而更新实例数据
 * update方法中，发布一个消息，让Vue实例接收消息，更新数据
 * 在Vue实例的destroyed中，结束订阅
 * 注意loadFile中index.css的引入路径，因为webpack打包后将其放在了css文件夹里，所以路径是./css/index.css
 */
(function (KDApi) {
  function MyComponent (model) {
    this._setModel(model)
  }

  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      console.log('-----init', this.model.style, props)
      setHtml(this.model, props)
    },
    update: function (props) {
      console.log('-----update', this.model, props)
      eventBus.pub(this.model, 'update', props)
    },
    destoryed: function () {
      console.log('-----destoryed', this.model)
    }
  }

  const setHtml = (model, props) => {
    const compodata = props.data ? props.data : {}
   // const configItems = props.data ? props.data : {}
    KDApi.loadFile('./css/index.css', model, () => {
      const { invoke, dom } = model
      const { data } = props
      const activeI = data ? data.avtiveIndex : -1
      new Vue({
        el: dom,
        template: '<CompoOne ref ="compoOne" @childInvoke="invokeAsync" :compodata = "compodata"/>',
        components: {
          CompoOne
        },
        data: {
          activeIndex: activeI,
          
          model: model,
          compodata : compodata || {
            value : "父标题一",
            imgPos : 0,
            configItems :{
              toolbarsFlag : false,
              defaultOpen : "edit",
              subfield : true
            }
          }
        },
        mounted () {
          const self = this
          this.updateSub = eventBus.sub(model, 'update', (props) => {
            const { data } = props
            self.activeIndex = data ? data.activeIndex : -1
            self.compodata.imgPos = data ? data.pos : -1
            if ("upload" == data.eventName) {
              self.gotoSetImgToPos(data.pos,data.tempImgUrl);
            }else if ("change" == data.eventName) {

            }
            
          })
        },
        destroyed () {
          eventBus.unsub(this.updateSub)
        },
        methods: {
           invoke: (eventName, args, callback) => { // callback 添加回调函数
              invoke(eventName, args)
              typeof callback === 'function' && callback(compodata)
            
          },
          async  invokeAsync (eventName, args ,callback){ // callback 添加回调函数
              await  invoke(eventName, args)
              console.log("invoke 执行完了，我要开始回调了");
              typeof callback === 'function' && callback(compodata)
              console.log("invoke 执行完了，回调也完成了");
            
          },
          getLangMsg: (key) => {
            return KDApi.getLangMsg(model, key)
          },
          gotoSetImgToPos(pos,url){
            this.$refs.compoOne.setImgUrl(pos,url)
          }
        }
      })
    })
  }

  // 注册自定义组件
  KDApi.register('markdown', MyComponent, {
    isMulLang: true
  })
})(window.KDApi)
