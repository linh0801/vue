import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 此处不用class的原因是方便后续给Vue 的实例混入实例 成员，
// 用类的话，在后续中使用Vue.prototype 来挂载方法就显得很奇怪
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue) // this 不是vue 的实例 ，把Vue 当做普通函数来调用
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 调用 Vue 的_init
  this._init(options)
}
// 注册 vm 的 _init() 方法，初始化 vm
initMixin(Vue)
// 注册 vm 的 $data/$props/$set/$delete/$watch
stateMixin(Vue)
// 初始化事件相关方法
// $on/$once/$off/$emit
eventsMixin(Vue)
// 初始化生命周期相关的混入方法
// _update/$forceUpdate/$destroy
lifecycleMixin(Vue)
// 混入 render
// $nextTick/_render
renderMixin(Vue)

export default Vue
