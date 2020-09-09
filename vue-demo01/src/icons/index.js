import Vue from "vue"
import SvgIcon from "./svgIcon.vue";
//自定义全局组件
Vue.component('svg-icon',SvgIcon);
/**
 * require.context 读取指定目录所有文件
 * 第一个参数 目录
 * 第二个参数 是否遍历子级目录
 * 第三个参数 定义遍历文件的规则
 */
const req = require.context("./svg", false, /\.svg$/)//读取结尾为svg文件
const requireAll = requireContext => {
    return requireContext.keys().map(requireContext)
}
requireAll(req)