<template>
  <div
    class="menus"
    :style="{
      width: data.width + 'px',
      left: Number(left) - 5 + 'px',
      display: show ? 'block' : 'none',
    }"
    @contextmenu="handleRight"
  >
    <!--分组渲染-->
    <div
      v-for="(item, i) of data.rightMenuList"
      :key="item.id"
      class="menu-item"
      @mouseenter="handleEnter(item, i)"
      @mouseleave="handleLeave(item, i)"
    >
      <div
        class="menu-flex"
        @click="item.handler"
        :class="{ disabled: item.disabled }"
        v-if="!item.disabled && item.handler"
      >
        <span class="title">{{ item.text }} </span>
        <span class="self-right-arraw" v-if="item.children">&#xe608;</span>
      </div>
      <div class="menu-flex" :class="{ disabled: item.disabled }" v-else>
        <span class="title">{{ item.text }} </span>
        <span class="self-right-arraw" v-if="item.children">&#xe608;</span>
      </div>
      <menus
        v-if="item.children"
        :data="item.children"
        :show="item.show"
        :left="data.width"
      ></menus>
      <span class="inline" v-if="item.break"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "menus",
  props: {
    data: Object,
    show: Boolean,
    left: [String, Number],
  },
  data() {
    return {
      showChild: false,
    };
  },
  methods: {
    handleRight(e) {
      e.returnValue = false;
    },
    handleEnter(val, i) {
      console.log(val.width);
      if (val.children) {
        this.$set(this.data.rightMenuList[i], "show", true);
      }
    },
    handleLeave(val, i) {
      if (val.children) {
        this.$set(this.data.rightMenuList[i], "show", false);
      }
    },
  },
};
</script>
<style>
@font-face {
  font-family: "self-right-arraw";
  src: url("./right-arrow/iconfont.eot");
  src: url("./right-arrow/iconfont.eot?#iefix") format("embedded-opentype"),
    url("./right-arrow/iconfont.woff2") format("woff2"),
    url("./right-arrow/iconfont.woff") format("woff"),
    url("./right-arrow/iconfont.ttf") format("truetype"),
    url("./right-arrow/iconfont.svg#iconfont") format("svg");
}
.self-right-arraw {
  font-family: "self-right-arraw" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}

.menus {
  position: absolute;
  left: 0;
  top: 0;
  width: 166px;
  height: auto;
  background-color: rgb(242, 242, 242);
  border: solid 1px #c2c1c2;
  box-shadow: 0 10px 10px #c2c1c2;
  display: none;
  border-radius: 5px;
  font-size: 14px;
  padding: 2px 0;
  z-index: 3100;
}
.menu-flex {
  padding: 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  cursor: pointer;
}
.menu-flex:hover {
  background: #888;
}
.disabled {
  cursor: not-allowed;
  color: #c0c4cc;
}
.disabled:hover {
  background: rgb(242, 242, 242);
}
.inline {
  border-bottom: 1px solid #3e3c3c40;
  display: block;
  width: 100%;
  margin: 2px 0;
}
</style>
