<template>
  <div class="custom-select2" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="handleClick"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    };
  },
  mounted() {
    this.$emit('input', this.selected);
  },
  methods: {
    handleClick(event) {
      console.log(event.target.textContent);
      this.$emit('actionSelect', event.target.textContent);
    },
  },
};
</script>

<style scoped>
.custom-select2 {
  position: relative;
  width: 8%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  margin-top: 10px;
}

.custom-select2 .selected {
  background-color: #FF782F;
  /*border-radius: 0px;*/
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select2 .selected.open {
  border: 1px solid #FF782F;
  border-radius: 6px 6px 0px 0px;
}

.custom-select2 .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border-color: #fff transparent transparent transparent;
}

.custom-select2 .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #FF782F;
  border-left: 1px solid #FF782F;
  border-bottom: 1px solid #FF782F;
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select2 .items div {
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select2 .items div:hover {
  background-color: #ff751a;
}

.selectHide {
  display: none;
}
</style>
