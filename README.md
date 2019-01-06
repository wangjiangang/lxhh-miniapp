# KOL

## 预览

用[微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)打开`dist`目录（请注意，是dist目录，不是整个项目）

## 使用

- 请在`src`下的开发
- 通过命令`gulp`打包到`dist`在[微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)预览。
- 请配置`appid` gh_1a5bcae69c18

## 工程
- 使用less

## 注意

- 开发环境配置

```js
/**
 * path: config/config.js
 * 
 * @param prod 是否生成环境
 * @param mock 是否使用mock数据
 *
 * @param prodDomain 生成环境域名
 * @param testDomain 测试环境域名
 * @param mockUrl    mock数据地址
 */
const prod = false, mock = true;

const prodDomain = '';
const testDomain = '';
const mockUrl    = '';
``` 

## 页面结构模板
```html
<my-loading is-show="{{!pageShow}}"></my-loading>

<view class="page-container" wx:if="{{pageShow}}">
  
</view>
```
