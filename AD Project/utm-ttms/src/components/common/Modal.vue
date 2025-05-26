<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button @click="close" class="modal-close" aria-label="Close modal">
              ×
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    },
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.close();
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscapeKey);
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  },
  methods: {
    ...this.methods,
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.isVisible) {
        this.close();
      }
    }
  }
}
</script>

<style scoped>
.modal-body {
  padding: 20px 0;
}

.modal-footer {
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>