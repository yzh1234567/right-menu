<template>
  <div
    id="_menutesthaha"
    class="right-menu"
    :style="{
      display: rightMenuStatus,
      top: rightMenuTop,
      left: rightMenuLeft,
      width: width,
    }"
    @contextmenu="handleRight"
  >
    <!--分组渲染-->
    <div v-for="item in rightMenuList" :key="item.id" class="menu-item">
      <div
        class="menu-flex"
        @click="item.handler"
        :class="{ disabled: item.disabled }"
        v-if="!item.disabled && item.handler"
      >
        <span class="title">{{ item.text }} </span>
      </div>
      <div class="menu-flex" :class="{ disabled: item.disabled }" v-else>
        <span class="title">{{ item.text }} </span>
      </div>
      <span class="inline" v-if="item.break"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "rightMenu",
  props: {
    rightMenuStatus: String,
    rightMenuTop: String,
    rightMenuLeft: String,
    rightMenuList: Array,
    width: String,
  },
  methods: {
    handleRight(e) {
      e.returnValue = false;
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.right-menu {
  position: fixed;
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
  z-index: 3000;
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
