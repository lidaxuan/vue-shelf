import duang from "../../audio/duang.mp3";
import bg from "../../audio/bg.mp3";

export default class AudioObj {

  constructor(volume) {
    this.audio = null;
    this.volume = volume || 1; // 这里兼容一下
    this.isPlaying = false;
    this.audioSrc = {
      duang, bg
    }
  }

  createAudio(type) {
    this.audio = new Audio();
    this.audio.volume = this.volume;
    this.audio.src = this.audioSrc[type];
    this.audio.addEventListener("ended", this.stopAudio);
  }

  async playAudio(type) {
    try {
      if (!this.audio) {
        // 如果音频对象不存在，则创建一个新的音频对象
        this.createAudio(type);
      }
      await this.audio.play();
      this.isPlaying = true;
    } catch (error) {
      // console.log(112233, error)
      throw error;
    }
  }

  stopAudio() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
};
