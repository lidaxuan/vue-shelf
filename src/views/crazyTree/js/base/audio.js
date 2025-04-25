import duang from "../../audio/duang.mp3";
import bg from "../../audio/bg.mp3";
import {IMAGES} from "@/views/crazyTree/js/base/config";
export default class AudioObj {

  constructor(ctx) {
    this.audio = null;
    this.isPlaying = false;
    this.audioSrc = {
      duang,bg
    }
  }
  createAudio(type) {
    this.audio = new Audio();
    this.audio.src = this.audioSrc[type];
    this.audio.addEventListener("ended", this.stopAudio);
  }
  playAudio(type) {
    if (!this.audio) {
      // 如果音频对象不存在，则创建一个新的音频对象
      this.createAudio(type);
    }
    this.audio.play();
    this.isPlaying = true;
  }
  stopAudio() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
};
