# self-right-menus
一个自定义的右键无限层级菜单指令


插件安装
yarn add self-right-menus


npm install self-right-menus --save

插件使用

在项目的入口文件main.ts/main.js中加入下述代码

import rightMenus from "self-right-menus"

Vue.use(rightMenus);

在你的业务代码中，在元素上绑定v-right-menu，然后传对应的参数即可.


# 传值必须是对象  配置说明 包含哪些键值对

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
width |  右键菜单宽度  | Number | 166
content |  右键菜单内容数组对象  |  Array  |  必传
children | 子集菜单对象,有这个对象代表含有子集菜单项 | Object | 非必传

# content 配置说明
属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
label | 菜单名称 | String | 必传
handler | 菜单操作方法 | Function | 非必传
disabled | 菜单是否禁用 | Boolean | false 
berak | 菜单分割线位置(默认三个为一组分割) | Boolean | false

# children 配置说明
属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
width |  右键菜单宽度  | Number | 166
content |  右键菜单内容数组对象  |  Array  |  必传
children | 子集菜单对象,有这个对象代表含有子集菜单项 | Object | 非必传

# 例子

```vue
<template>

  <div
    v-right-menu="rightMenus"
  >
  </div>

</template>

<script>

export default {
       data(){
           return {
               rightMenus:{
                   width:190,//右键菜单宽度 ；默认值166
                   content:[
                       {
                          label:'复制',//右键菜单子项名称 （必需值）
                          handler:this.copy,//右键菜单子项方法（可选值）
                          disabled:boolean,//子项是否禁用（可选值）
                          break:boolean,//子项分割线标准（不给值默认3个为一组分割）
                          children:{
                             width:180,
                             content:[{
                                 label:'复制',//右键菜单子项名称 （必需值）
                                  handler:this.copy,//右键菜单子项方法（可选值）
                                  disabled:boolean,//子项是否禁用（可选值）
                                  break:boolean,//子项分割线标准（不给值默认3个为一组分割）
                             }]
                          }
                       }
                   ]
               }
           }
       },
       methods:{
         copy(){

         }
       }

  }

}

</script>
```




