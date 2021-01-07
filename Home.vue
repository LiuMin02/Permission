<template>
  <Row>
    <Col span="6">
      <Menu mode="vertical" theme="dark" active-name="shop" @on-select="toPage">
          <template v-for="(menuItem,i) in menu">
                <MenuItem v-if="menuItem.pid==-1&&menuItem.auth" :name="menuItem.auth" :key="i">
                    <Icon type="ios-paper" :key="i"/>
                    {{menuItem.name}}
                </MenuItem>
          </template>
      </Menu>
    </Col>
    <Col>
      home<Button @click="toPage('login')">注销</Button>
      <router-view />
    </Col>
  </Row>
</template>

<script>
import {mapState} from 'vuex'
import { log } from 'util';
import { constants } from 'zlib';
export default {
  name: "Home",
  beforeRouteEnter(to,from,next){
      let redPath  = JSON.parse(sessionStorage.getItem('redPath')),itemPath;
      if (redPath&&redPath.length) {
          redPath.forEach(item => {
              let arr = item.split(':');
              if (arr[0]===to.path) {
                  next(arr[1]);
              }
          });
      }
      if (!itemPath) {
          next()
      }
      
  },
  computed: {
    //   取出a模块中的state menu菜单
    ...mapState({
      menu:state=>state.Auth.menu,
      pagePermissions:state=>state.Auth.pagePermissions,
    })
  },
  mounted(){
      console.log(this.pagePermissions);
      
  },
  methods: {
    toPage(val) {
      this.$router.push(val);
    }
  }
};
</script>
