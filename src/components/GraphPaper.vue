<template>
    <div :style="{opacity}" class="graph-paper graph-paper-normal" />
</template>

<script>
export default {
  name: 'GraphPaper',
  props: {
    opacity: {
      type: Number,
      default: 0.02
    }
  }
};
</script>

<style lang="scss" scoped>
.graph-paper {
  position: absolute;
  z-index: 800;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  &-normal {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, grey 1px, transparent 1px),
      linear-gradient(to bottom, grey 1px, transparent 1px);
  }
}
</style>
