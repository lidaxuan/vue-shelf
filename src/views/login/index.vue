<template>
  <div class="auth-shell">
    <section class="auth-visual">
      <div class="auth-visual-top">
        <img class="logo" src="https://i.postimg.cc/nLrDYrHW/icon.png" alt="CareerCompass"/>
        <span>CareerCompass</span>
      </div>

      <div class="auth-visual-center">
        <AnimatedCharacters :is-typing="isTyping" :show-password="showPassword" :password-length="password.length"/>
      </div>

      <div class="auth-visual-bottom">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>

      <div class="blob one"/>
      <div class="blob two"/>
    </section>

    <section class="auth-panel">
      <div class="auth-card">
        <div class="mobile-brand">
          <img
                  class="logo"
                  src="https://i.postimg.cc/nLrDYrHW/icon.png"
                  alt="CareerCompass"
          />
          <span>CareerCompass</span>
        </div>

        <header class="auth-header">
          <h1>Welcome back!</h1>
          <p>Please enter your details</p>
        </header>

        <form class="auth-form" @submit.prevent="onSubmit">
          <div class="field">
            <label for="email">Email</label>
            <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                    @focus="isTyping = true"
                    @blur="isTyping = false"
            />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <div class="input-wrap">
              <input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••"
              />
              <button
                      class="toggle-pass"
                      type="button"
                      @click="showPassword = !showPassword"
              >
                {{ showPassword ? "隐藏" : "显示" }}
              </button>
            </div>
          </div>

          <div class="auth-row">
            <label class="checkbox-wrap">
              <input v-model="remember" type="checkbox"/>
              <span>记住我 30 天</span>
            </label>
            <a class="auth-link" href="#">忘记密码？</a>
          </div>

          <div v-if="error" class="auth-error">{{ error }}</div>

          <InteractiveHoverButton :text="btnText" type="submit" :disabled="isLoading"/>
          <InteractiveHoverButton text="使用 Google 登录" type="button"/>
        </form>

        <div class="auth-foot">
          还没有账号？
          <RouterLink to="/signup">Sign Up</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AnimatedCharacters from "./AnimatedCharacters.vue";
import InteractiveHoverButton from "./InteractiveHoverButton.vue";

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {AnimatedCharacters, InteractiveHoverButton},
  props: {},
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      showPassword: false,
      isTyping: false,
      isLoading: false,
      error: "",
      btnText: "登录",
    };
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // temStr(val) {
    // },
  },
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {},
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  activated() {
  }
};
</script>
<style lang='scss' scoped>
:root {
  font-family: Inter, "Segoe UI", -apple-system, BlinkMacSystemFont, "PingFang SC",
  "Microsoft YaHei", sans-serif;
  color: #111827;
  background: #f8fafc;
  line-height: 1.5;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
}

.auth-visual {
  display: none;
  position: relative;
  overflow: hidden;
  padding: 48px;
  color: #f9fafb;
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 45%, #4b5563 100%);
}

.auth-visual::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 20px 20px;
}

.blob {
  position: absolute;
  border-radius: 999px;
  filter: blur(80px);
}

.blob.one {
  width: 280px;
  height: 280px;
  top: 20%;
  right: 14%;
  background: rgba(209, 213, 219, 0.24);
}

.blob.two {
  width: 420px;
  height: 420px;
  left: 10%;
  bottom: 10%;
  background: rgba(229, 231, 235, 0.22);
}

.auth-visual-top,
.auth-visual-bottom,
.auth-visual-center {
  position: relative;
  z-index: 2;
}

.auth-visual-top {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  padding: 4px;
  object-fit: cover;
}

.auth-visual-center {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 460px;
}

.auth-visual-bottom {
  display: flex;
  gap: 22px;
  color: rgba(243, 244, 246, 0.9);
  font-size: 14px;
}

.auth-visual-bottom a:hover {
  color: #ffffff;
}

.auth-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 18px;
  background: #f8fafc;
}

.auth-card {
  width: min(100%, 430px);
}

.mobile-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 38px;
  font-size: 18px;
  font-weight: 600;
}

.auth-header {
  text-align: center;
  margin-bottom: 28px;
}

.auth-header h1 {
  margin: 0;
  font-size: 30px;
  line-height: 1.15;
}

.auth-header p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.auth-form {
  display: grid;
  gap: 16px;
}

.field {
  display: grid;
  gap: 8px;
}

.field label {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.input-wrap {
  position: relative;
}

.field input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  height: 48px;
  padding: 0 14px;
  font-size: 14px;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.toggle-pass {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  font-size: 14px;
}

.auth-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.checkbox-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-wrap input {
  width: 16px;
  height: 16px;
}

.auth-link {
  color: #4f46e5;
  font-weight: 600;
}

.auth-link:hover {
  text-decoration: underline;
}

.auth-error {
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: 12px;
  padding: 10px 12px;
  color: #b91c1c;
  background: rgba(254, 226, 226, 0.55);
  font-size: 13px;
}

.auth-foot {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.auth-foot a {
  color: #111827;
  font-weight: 700;
}

.auth-foot a:hover {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .auth-shell {
    grid-template-columns: 1fr 1fr;
  }

  .auth-visual {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mobile-brand {
    display: none;
  }

  .auth-panel {
    padding: 36px;
  }
}

</style>
