<!--
 * @Description: 清风拂杨柳
 * @Author: 李大玄
 * @Date: 2021-11-12 10:44:46
 * @FilePath: /vue-shelf/src/components/resize/README.md
-->

一个div可以拖拽的组件,


| 参数     | 说明               | 必传 | 类型    | 默认                                                         |
| -------- | ------------------ | ---- | ------- | ------------------------------------------------------------ |
| min      | 最小尺寸           | 否   | Object, | {width: 0, height: 0}  两个参数的类型是Number                |
| max      | 最大尺寸           | 否   | Object, | {width: 0, height: 0}  两个参数的类型是Number                |
| move     | 那个边是否可以拖拽 | 否   | Object, | { <br /> "t": true,    // top <br /> "l": true,    // left<br /> "r": true,   // right <br /> "b": true,  // bottom<br /> "tl": true,  // top left <br /> "tr": true,  // top right <br /> "bl": true,  // bottom left <br /> "br": true  // bottom right<br />} |
| speed    | 步长 单位px        | 否   | Number  | 1px                                                          |
| disabled | 禁用               | 否   | Boolean | false                                                        |


使用
1. 无限放大拖拽
```html
  <Resize :speed="1" :move="{ t: false }" style="background: pink; width: 100px">
        起源于西周时期的宗法制对我国社会的发展产生了深远影响，尤其是对当今家族式企业的发展影响更不可忽视。随着国内创一代的逐渐老去，当年创一代所辛苦打下来的基业面前遇到后续如何传承的问题。这其中有以严介和之子严昊为代表的子承父业，也有以美的董事长何享健之子何剑锋另起炉灶。
      </Resize>
```
2. 尺寸限制拖拽 最大尺寸 最小尺寸
```html
<Resize :min="{width: 100, height: 200}" :max="{width: 1000, height: 600}" :move="{ t: false }" style="background: pink; width: 100px">
        起源于西周时期的宗法制对我国社会的发展产生了深远影响，尤其是对当今家族式企业的发展影响更不可忽视。随着国内创一代的逐渐老去，当年创一代所辛苦打下来的基业面前遇到后续如何传承的问题。这其中有以严介和之子严昊为代表的子承父业，也有以美的董事长何享健之子何剑锋另起炉灶。
      </Resize>
```
