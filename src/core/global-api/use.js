/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      // Vue 的构造函数中已经安装过此插件，代码执行结束不做处理
      return this
    }

    // additional parameters
    // 转成真实的数组，并且取出除了第一个参数plugin 外的其他的参数
    const args = toArray(arguments, 1)
    // 把 this(Vue) 添加到第一个元素的位置
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
