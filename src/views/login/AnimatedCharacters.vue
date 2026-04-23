<template>
  <div class="scene">
    <div ref="purpleRef" class="char purple" :style="purpleStyle">
      <div class="eyes purple-eyes" :style="purpleEyesStyle">
        <div class="eye" :class="{ blink: isPurpleBlinking }">
          <div class="pupil" :style="pupilFollow(purpleForce)" />
        </div>
        <div class="eye" :class="{ blink: isPurpleBlinking }">
          <div class="pupil" :style="pupilFollow(purpleForce)" />
        </div>
      </div>
    </div>

    <div ref="blackRef" class="char black" :style="blackStyle">
      <div class="eyes black-eyes" :style="blackEyesStyle">
        <div class="eye small" :class="{ blink: isBlackBlinking }">
          <div class="pupil tiny" :style="pupilFollow(blackForce)" />
        </div>
        <div class="eye small" :class="{ blink: isBlackBlinking }">
          <div class="pupil tiny" :style="pupilFollow(blackForce)" />
        </div>
      </div>
    </div>

    <div ref="orangeRef" class="char orange" :style="orangeStyle">
      <div class="eyes plain" :style="orangeEyesStyle">
        <div class="dot" />
        <div class="dot" />
      </div>
    </div>

    <div ref="yellowRef" class="char yellow" :style="yellowStyle">
      <div class="eyes plain yellow-eyes" :style="yellowEyesStyle">
        <div class="dot" />
        <div class="dot" />
      </div>
      <div class="mouth" :style="yellowMouthStyle" />
    </div>
  </div>
</template>
<script>
export default {
  name: "AnimatedCharacters",
  props: {
    isTyping: { type: Boolean, default: false },
    showPassword: { type: Boolean, default: false },
    passwordLength: { type: Number, default: 0 },
  },
  data() {
    return {
      purplePos: { faceX: 0, faceY: 0, bodySkew: 0 },
      blackPos: { faceX: 0, faceY: 0, bodySkew: 0 },
      orangePos: { faceX: 0, faceY: 0, bodySkew: 0 },
      yellowPos: { faceX: 0, faceY: 0, bodySkew: 0 },
      isPurpleBlinking: false,
      isBlackBlinking: false,
      isLookingAtEachOther: false,
      isPurplePeeking: false,
      timers: [],
      peekLoopToken: 0,
    };
  },
  computed: {
    isPasswordVisible() {
      return this.passwordLength > 0 && this.showPassword;
    },
    isHidingPassword() {
      return this.passwordLength > 0 && !this.showPassword;
    },
    purpleStyle() {
      return {
        height: this.isTyping || this.isHidingPassword ? "440px" : "400px",
        transform: this.isPasswordVisible
                ? "skewX(0deg)"
                : this.isTyping || this.isHidingPassword
                        ? `skewX(${this.purplePos.bodySkew - 12}deg) translateX(40px)`
                        : `skewX(${this.purplePos.bodySkew}deg)`,
      };
    },
    purpleEyesStyle() {
      if (this.isPasswordVisible) {
        return { left: "20px", top: "35px" };
      }
      if (this.isLookingAtEachOther) {
        return { left: "55px", top: "65px" };
      }
      return {
        left: `${45 + this.purplePos.faceX}px`,
        top: `${40 + this.purplePos.faceY}px`,
      };
    },
    blackStyle() {
      return {
        transform: this.isPasswordVisible
                ? "skewX(0deg)"
                : this.isLookingAtEachOther
                        ? `skewX(${this.blackPos.bodySkew * 1.5 + 10}deg) translateX(20px)`
                        : this.isTyping || this.isHidingPassword
                                ? `skewX(${this.blackPos.bodySkew * 1.5}deg)`
                                : `skewX(${this.blackPos.bodySkew}deg)`,
      };
    },
    blackEyesStyle() {
      if (this.isPasswordVisible) {
        return { left: "10px", top: "28px" };
      }
      if (this.isLookingAtEachOther) {
        return { left: "32px", top: "12px" };
      }
      return {
        left: `${26 + this.blackPos.faceX}px`,
        top: `${32 + this.blackPos.faceY}px`,
      };
    },
    orangeStyle() {
      return {
        transform: this.isPasswordVisible
                ? "skewX(0deg)"
                : `skewX(${this.orangePos.bodySkew}deg)`,
      };
    },
    orangeEyesStyle() {
      if (this.isPasswordVisible) {
        return { left: "50px", top: "85px" };
      }
      return {
        left: `${82 + this.orangePos.faceX}px`,
        top: `${90 + this.orangePos.faceY}px`,
      };
    },
    yellowStyle() {
      return {
        transform: this.isPasswordVisible
                ? "skewX(0deg)"
                : `skewX(${this.yellowPos.bodySkew}deg)`,
      };
    },
    yellowEyesStyle() {
      if (this.isPasswordVisible) {
        return { left: "20px", top: "35px" };
      }
      return {
        left: `${52 + this.yellowPos.faceX}px`,
        top: `${40 + this.yellowPos.faceY}px`,
      };
    },
    yellowMouthStyle() {
      if (this.isPasswordVisible) {
        return { left: "10px", top: "88px" };
      }
      return {
        left: `${40 + this.yellowPos.faceX}px`,
        top: `${88 + this.yellowPos.faceY}px`,
      };
    },
    purpleForce() {
      if (this.isPasswordVisible) {
        return { x: this.isPurplePeeking ? 4 : -4, y: this.isPurplePeeking ? 5 : -4 };
      }
      if (this.isLookingAtEachOther) return { x: 3, y: 4 };
      return { x: this.purplePos.faceX * 0.16, y: this.purplePos.faceY * 0.16 };
    },
    blackForce() {
      if (this.isPasswordVisible) return { x: -4, y: -4 };
      if (this.isLookingAtEachOther) return { x: 0, y: -4 };
      return { x: this.blackPos.faceX * 0.15, y: this.blackPos.faceY * 0.15 };
    },
  },
  watch: {
    isTyping(typing) {
      if (!typing) {
        this.isLookingAtEachOther = false;
        return;
      }
      this.isLookingAtEachOther = true;
      this.addTimer(
              setTimeout(() => {
                this.isLookingAtEachOther = false;
              }, 800),
      );
    },
    passwordLength: {
      handler() {
        this.handlePeekWatch();
      },
      immediate: true,
    },
    showPassword: {
      handler() {
        this.handlePeekWatch();
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.handleMouseMove);
    this.startBlink("isPurpleBlinking");
    this.startBlink("isBlackBlinking");
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    this.clearAllTimers();
  },
  methods: {
    clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    },
    addTimer(id) {
      this.timers.push(id);
      return id;
    },
    clearAllTimers() {
      while (this.timers.length) {
        clearTimeout(this.timers.pop());
      }
    },
    calcPos(el, mouseX, mouseY) {
      if (!el) return { faceX: 0, faceY: 0, bodySkew: 0 };
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      return {
        faceX: this.clamp(deltaX / 20, -15, 15),
        faceY: this.clamp(deltaY / 30, -10, 10),
        bodySkew: this.clamp(-deltaX / 120, -6, 6),
      };
    },
    handleMouseMove(e) {
      const { clientX, clientY } = e;
      this.purplePos = this.calcPos(this.$refs.purpleRef, clientX, clientY);
      this.blackPos = this.calcPos(this.$refs.blackRef, clientX, clientY);
      this.orangePos = this.calcPos(this.$refs.orangeRef, clientX, clientY);
      this.yellowPos = this.calcPos(this.$refs.yellowRef, clientX, clientY);
    },
    startBlink(targetKey) {
      const run = () => {
        const delay = Math.random() * 4000 + 3000;
        this.addTimer(
                setTimeout(() => {
                  this[targetKey] = true;
                  this.addTimer(
                          setTimeout(() => {
                            this[targetKey] = false;
                            run();
                          }, 150),
                  );
                }, delay),
        );
      };
      run();
    },
    handlePeekWatch() {
      this.peekLoopToken += 1;
      const loopId = this.peekLoopToken;
      this.isPurplePeeking = false;
      if (!this.isPasswordVisible) return;

      const schedule = () => {
        if (loopId !== this.peekLoopToken) return;
        this.addTimer(
                setTimeout(() => {
                  if (loopId !== this.peekLoopToken) return;
                  this.isPurplePeeking = true;
                  this.addTimer(
                          setTimeout(() => {
                            if (loopId !== this.peekLoopToken) return;
                            this.isPurplePeeking = false;
                            schedule();
                          }, 800),
                  );
                }, Math.random() * 3000 + 2000),
        );
      };

      schedule();
    },
    pupilFollow(p) {
      return {transform: `translate(${p.x}px, ${p.y}px)`};
    },
  },
};
</script>

<style scoped>
.scene {
  position: relative;
  width: 550px;
  height: 400px;
}

.char {
  position: absolute;
  bottom: 0;
  transition: all 0.7s ease-in-out;
  transform-origin: bottom center;
}

.purple {
  left: 70px;
  width: 180px;
  background: #6c3ff5;
  border-radius: 10px 10px 0 0;
  z-index: 1;
}

.black {
  left: 240px;
  width: 120px;
  height: 310px;
  background: #2d2d2d;
  border-radius: 8px 8px 0 0;
  z-index: 2;
}

.orange {
  left: 0;
  width: 240px;
  height: 200px;
  background: #ff9b6b;
  border-radius: 120px 120px 0 0;
  z-index: 3;
}

.yellow {
  left: 310px;
  width: 140px;
  height: 230px;
  background: #e8d754;
  border-radius: 70px 70px 0 0;
  z-index: 4;
}

.eyes {
  position: absolute;
  display: flex;
  transition: all 0.2s ease-out;
}

.purple-eyes {
  gap: 8px;
}

.black-eyes {
  gap: 6px;
}

.eye {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ffffff;
  display: grid;
  place-items: center;
  transition: all 0.15s ease;
  overflow: hidden;
}

.eye.small {
  width: 16px;
  height: 16px;
}

.eye.blink {
  height: 2px;
}

.eye.blink .pupil {
  opacity: 0;
}

.pupil {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #2d2d2d;
  transition: transform 0.1s ease-out;
}

.pupil.tiny {
  width: 6px;
  height: 6px;
}

.plain {
  gap: 8px;
}

.yellow-eyes {
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2d2d2d;
}

.mouth {
  position: absolute;
  width: 80px;
  height: 4px;
  border-radius: 999px;
  background: #2d2d2d;
  transition: all 0.2s ease-out;
}

@media (max-width: 1150px) {
  .scene {
    transform: scale(0.9);
    transform-origin: center bottom;
  }
}
</style>
