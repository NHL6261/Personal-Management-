<template>
<!-- Autho Mr.Ni Time 2020.4.26 -->
  <el-container class="home_content">
    <!-- 头部 -->
    <el-header>
      <div class="header_content">
        <img src="../assets/header.png" alt="图片暂时无法显示" />
        <span>人员管理系统</span>
      </div>
      <div class="echo_text">
        <p>欢迎回来 {{info}}</p>
      </div>
      <!-- 退出按钮优化 -->
      <el-button type="warning" @click="dialogVisible = true">退出</el-button>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
        <span>您确定退出吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="exitbtn">确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    <!-- 左侧navigation -->
    <el-container>
      <el-aside :width="isCollapse? '64px':'200px'">
        <div class="classtoggle-button" @click="toggleCollpase">|||</div>
        <!-- 侧边栏区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in LeftInfo" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="IconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 index  跳转地址 手动拼接 /-->
            <el-menu-item
              @click="SavaNavState('/'+itemList.path)"
              :index="'/'+itemList.path + '' "
              v-for="itemList in item.children"
              :key="itemList.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i :class="RolesObj[itemList.id]"></i>
                <!-- 文本 -->
                <span>{{itemList.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 右侧主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      info: "", //保存登录信息
      isCollapse: false, // 默认不打开
      activePath: "", // 保存的链接地址
      LeftInfo: [], // 左侧信息
      dialogVisible: false, // 弹出信息默认为false
      //   自定义 icon
      IconObj: {
        "101": "iconfont icon-yonghu",
        "102": "iconfont icon-lifangtilitiduomiantifangkuai2",
        "103": "iconfont icon-shangpinguanli",
        "104": "iconfont icon-dingdanguanli",
        "105": "iconfont icon-baobiao"
      },
      // 二级菜单menber
      RolesObj: {
        "1": "iconfont icon-jiaose",
        "2": "iconfont icon-quanxian",
        "3": "iconfont icon-shangpinliebiao",
        "4": "iconfont icon-shangpin",
        "5": "iconfont icon-leimupinleifenleileibie2",
        "10": "iconfont icon-querylist",
        "12": "iconfont icon--shangpinfenlei-gai",
        "13": "iconfont icon-shuju"
      }
    };
  },
  created() {
    this.getLeftList();
    this.Super_Manage();
    // 获取当前 在哪个路由页面下
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 判断是不是超级管理员 
    Super_Manage() {
      const login_info = window.sessionStorage.getItem("login_info");
      if (login_info === "admin") {
        this.info = "超级管理员";
      } else if (login_info === login_info) {
        this.info = login_info;
      }
    },
    // 路由路径 保存 为了拼接 跳转路由
    SavaNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    // 退出 按钮 将session内容清除 token
    exitbtn() {
      this.dialogVisible = false
      window.sessionStorage.clear();
      this.$router.push("/login");
      this.$message.success("退出成功!");
    },
    // 获取左侧信息 nav 信息
    async getLeftList() {
      let res = await this.$http.getMenusList();
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.LeftInfo = res.data;
      console.log(this.LeftInfo);
    },
    // 左侧导航的 扩大和缩小 
    toggleCollpase() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.home_content {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
}
.header_content {
  width: 250px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: relative;
}
.header_content > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 50px;
}
.header_content > span {
  color: #fff;
  font-size: 24px;
  margin-left: 12px;
}
.el-button {
  height: 50px;
  margin-top: 5px;
  font-size: 16px;
}
.echo_text {
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
  position: absolute;
  right: 150px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu-item {
  background-color: #fff;
}
.iconfont {
  margin-right: 10px;
}
.classtoggle-button {
  background-color: #4a5064;
  color: #fff;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu {
  border-right: none;
}
</style>
