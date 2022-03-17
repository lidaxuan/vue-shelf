/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-07 17:49:38
 * @FilePath: /vue-shelf/src/views/linked/index.js
 */
import { defaultEquals } from './util';
import { Node } from './models/linked-list-models'; // {1} 

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0; // {2}  它用来存储链表中的元素数量。
    this.head = undefined; // {3} 
    this.equalsFn = equalsFn; // {4} 
  }
  push(element) {
    const node = new Node(element); // {1} 
    let current; // {2} 
    if (this.head == null) { // {3} 
      this.head = node;
    } else {
      current = this.head; // {4} 
      while (current.next != null) { // {5} 获得最后一项
        current = current.next;
      }
      // 将其 next 赋为新元素，建立链接
      current.next = node; // {6} 
    }
    this.count++; // {7} 
  }

  removeAt(index) {
    // 检查越界值
    if (index >= 0 && index < this.count) { // {1} 
      let current = this.head; // {2} 
      // 移除第一项
      if (index === 0) { // {3} 
        this.head = current.next;
      } else {
        /* 
        let previous; // {4} 
        for (let i = 0; i < index; i++) { // {5} 
          previous = current; // {6} 
          current = current.next; // {7} 
        }
        previous.next = current.next;
         */
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        // 将 previous 与 current 的下一项链接起来：跳过 current，从而移除它
        previous.next = current.next; // {8} 
      }
      this.count--; // {9} 
      return current.element;
    }
    return undefined; // {10} 
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) { // {1} 
      let node = this.head; // {2} 
      for (let i = 0; i < index && node != null; i++) { // {3} 
        node = node.next;
      }
      return node; // {4} 
    }
    return undefined; // {5} 
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) { // {1} 
      const node = new Node(element);
      if (index === 0) { // 在第一个位置添加
        const current = this.head;
        node.next = current; // {2} 
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1); // {3} 
        const current = previous.next; // {4} 
        node.next = current; // {5} 
        previous.next = node; // {6} 
      }
      this.count++; // 更新链表的长度
      return true;
    }
    return false; // {7} 
  }
}