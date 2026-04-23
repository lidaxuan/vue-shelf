<script>
export default {
  name: "InteractiveHoverButton",
  props: {
    text: {
      type: String,
      default: "按钮",
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <button
          :type="type"
          class="ihb"
          :disabled="disabled"
          @click="$emit('click', $event)"
  >
    <span class="ihb-text">{{ text }}</span>
    <span class="ihb-overlay">
      <span>{{ text }}</span>
      <span aria-hidden="true">→</span>
    </span>
  </button>
</template>

<style scoped>
.ihb {
  position: relative;
  width: 100%;
  height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #111827;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.ihb:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.ihb:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ihb-text {
  display: inline-block;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.ihb-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  background: #4f46e5;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ihb:hover .ihb-text {
  transform: translateX(48px);
  opacity: 0;
}

.ihb:hover .ihb-overlay {
  opacity: 1;
}
</style>
