# right-menu
一个自定义的右键菜单指令


插件安装
yarn add self-right-menus

# or

npm install self-right-menus --save

插件使用

在项目的入口文件main.ts/main.js中加入下述代码

import rightMenus from "self-right-menus"

Vue.use(rightMenus);

在你的业务代码中，在元素上绑定v-right-menu，然后传对应的参数即可.

例子

<template>

  <li
    class="row-panel"
    v-right-menu="rightMenus"
  >

</template>

<script>

export default {
       data(){

           return {

               rightMenus:{

                   width:190,//右键菜单宽度 ；默认值166

                   content:[

                       {

                          label:string,//右键菜单子项名称 （必需值）

                          handler:function,//右键菜单子项方法（可选值）

                          disabled:boolean,//子项是否禁用（可选值）

                          break:boolean,//子项分割线标准（不给值默认3个为一组分割）

                       }

                   ]

               }
           }

       }

  }

}

</script>




