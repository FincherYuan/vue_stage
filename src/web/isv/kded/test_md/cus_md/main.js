// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import CompoOne from './components/CompoOne.vue'
/*import router from './router'*/
import mavonEditor from 'mavon-editor'
/*import 'mavon-editor/dist/css/index.css'*/
import eventBus from '../../../../../../util/eventBus'

Vue.use(mavonEditor)
/*Vue.config.productionTip = false*/

/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})*/


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
    KDApi.loadFile('./css/index.css', model, () => {
      const { invoke, dom } = model
      const { data } = props
      const activeI = data ? data.avtiveIndex : -1
      new Vue({
        el: dom,
        template: '<CompoOne />',
        components: {
          CompoOne
        },
        data: {
          activeIndex: activeI,
          model: model
        },
        mounted () {
          const self = this
          this.updateSub = eventBus.sub(model, 'update', (props) => {
            const { data } = props
            self.activeIndex = data ? data.activeIndex : -1
          })
        },
        destroyed () {
          eventBus.unsub(this.updateSub)
        },
        methods: {
          invoke: (eventName, args) => {
            invoke(eventName, args)
          },
          getLangMsg: (key) => {
            return KDApi.getLangMsg(model, key)
          }
        }
      })
    })
  }

  // 注册自定义组件
  KDApi.register('cus_md', MyComponent, {
    isMulLang: true
  })
})(window.KDApi)