import rightComponent from "./components/right.vue"

const rightClick={};

/* 
Vue.use(plugins) 如果插件是一个对象，必须提供 install 方法。
如果插件是一个函数，它会被作为 install 方法。
install 方法调用时，会将 Vue 作为参数传入
*/
let menuVM=null;

//是否已经显示自定义右键
let showMenu=null;

/**
 * 将组件挂在到节点上
 * @param comp 需要挂载的组件
 * @param prop 向组件传的参数
 */
const creatComp = function(Vue,comp, prop) {
    // 创建组件
    const app = Vue.extend(comp);
    // 创建一个div元素
    const divEle = document.createElement("div");
    // 将创建的div元素挂载追加至body里
    document.body.appendChild(divEle);
    // 将组件挂载至刚才创建的div中, 使用propsData进行传参
    let T=new app({
      propsData: Object.assign({},prop),
    }).$mount();
    // 返回挂载的元素，便于操作
    divEle.appendChild(T.$el)
    return divEle;
  };


rightClick.install=(Vue)=>{
      // 监听全局点击，销毁右键菜单dom
      document.body.addEventListener("click", () => {
        if (menuVM != null) {
          // 销毁右键菜单DOM
          document.body.removeChild(menuVM);
          menuVM = null;
        }
      });
      document.body.addEventListener('contextmenu',(e)=>{
        //通过比较当前点击元素与右键自定义挂载元素是否一致；判断是否隐藏还是显示
        let isSame=e===showMenu;
        if (menuVM != null&&!isSame) {
          //销毁右键菜单DOM
          document.body.removeChild(menuVM);
          menuVM = null;
        }
      });
    Vue.directive('rightMenu',(el,binding)=>{
         // 指令绑定元素元素是否存在判断
        if (el == null) {
            throw "右键指令错误：元素未绑定";
        }
        el.oncontextmenu = function(e) {
                        showMenu=e;
                        if (menuVM != null) {
                            // 销毁上次触发的右键菜单DOM
                            document.body.removeChild(menuVM);
                            menuVM = null;
                        }
                        let obj=binding.value;
                        if(!obj){
                          throw "右键指令错误:传值必须为对象";
                        }
                        let width=binding.value.width;
                        const textArray = binding.value.content;
                        if(!Array.isArray(textArray)){
                           throw "右键指令错误:指令内容content必须为数组";
                        }
                       /*  
                        判断传入的右键菜单项是否有break字段；
                        如果没有：默认每三个打断；
                        如果有且break等于true按照break的位置打断
                        */
                        let isBreak=textArray.some(item=>{
                            return  item.break
                        })
                        // 处理好的右键菜单
                        const menuList = [];
                        // 追加右键菜单数据及事件
                        for (let i = 0; i < textArray.length; i++) {
                          // 右键菜单对象, 添加名称
                          const menuObj = {
                            text: textArray[i].label,
                            handler:typeof textArray[i].handler ==='function'?textArray[i].handler:false,
                            id: i + 1,
                            disabled:textArray[i].disabled?textArray[i].disabled:false,
                          };
                          if(isBreak){
                            menuObj.break=textArray[i].break?textArray[i].break:false;
                          }else{
                            menuObj.break=(i+1)%3===0?true:false;
                          }
                          menuList.push(menuObj);
                        }
                        // 鼠标点的坐标
                        const oX = e.clientX;
                        const oY = e.clientY;
                        // 右键菜单出现后的位置
                        // 动态挂载组件，显示右键菜单
                        menuVM = creatComp(Vue,rightComponent, {
                            rightMenuStatus: "block",
                            rightMenuTop: oY + "px",
                            rightMenuLeft: oX + "px",
                            width:(width?width:166)+'px',
                            rightMenuList: menuList,
                        });
                        return false;
                      };
    })
}

export default rightClick
