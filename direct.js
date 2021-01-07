import Vue from 'vue'
import store from '../../store'
const has = Vue.directive('has',{
    inserted:function(el,binding){//使用bind不能删除节点 
        let btnPermissionStr = binding.value;
        if (!Vue.prototype.$_has(btnPermissionStr)) {
            el.parentNode.removeChild(el);//直接删除节点
            // el.style.display = 'none';//隐藏节点，可显示的
        }
    },
    // update:function(el,binding){
    //     el.style.display = Vue.prototype.$_has(binding.value)?"inline-block":"none";
    // }
})
Vue.prototype.$_has = function (value) {
    let isExist = false;
    let pagePermissions = store.state.Auth.pagePermissions;
    if (value==undefined||value==null) {
        isExist = false;
    }else{
        for (let i = 0; i < pagePermissions.length; i++) {
            if (value==pagePermissions[i].code) {
                isExist = true;
                break;
            }
        }
    }
    return isExist;
}
export default has