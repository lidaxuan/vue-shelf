/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-07 17:53:19
 * @FilePath: /vue-shelf/src/views/linked/models/linked-list-models.js
 */
export class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}