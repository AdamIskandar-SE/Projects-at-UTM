<template>
  <div class="time-slot-card" @click="handleSlotClick">
    <div class="slot-time">{{ slot.time }}</div>
    <div class="slot-course">{{ slot.courseName }}</div>
    <div class="slot-details">
      <span class="slot-code">{{ slot.course }}-{{ slot.section }}</span>
      <span class="slot-venue">{{ slot.venue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeSlot',
  props: {
    slot: {
      type: Object,
      required: true
    }
  },
  emits: ['slot-click'],
  methods: {
    handleSlotClick() {
      this.$emit('slot-click', this.slot);
    }
  }
}
</script>

<style scoped>
.time-slot-card {
  cursor: pointer;
}

.slot-code {
  font-weight: 600;
  color: #4a5568;
}
</style>