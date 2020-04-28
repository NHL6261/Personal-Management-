<template>
  <!-- Autho Mr.Ni Time 2020.4.26 -->
  <div id="containerTenter">
    <!-- 登录区域背景 -->
    <div class="login_back">
      <!-- 头部img -->
      <div class="Img_Header">
        <img src="../assets/tou.png" alt="此图片无法显示" />
      </div>
      <!-- 登录Header -->
      <div class="login_header">
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="resetInputRef"
        :rules="rules"
        :model="LoginForm"
        label-width="0px"
        class="Login_Form"
      >
        <!-- 用戶名 -->
        <el-form-item prop="username">
          <el-input
            v-model="LoginForm.username"
            prefix-icon="iconfont icon-mine-red"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="LoginForm.password"
            prefix-icon="iconfont icon-lock-fill"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮位置 -->
        <el-form-item class="btns">
          <!-- 事件绑定 事件代理 -->
          <el-button type="primary" @keyup.13="onEnter" @click.passive="goLogin">登录</el-button>
          <el-button @click="resetLoginForm()" type="danger">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      LoginForm: {
        username: "", // 用户名
        password: "" // 密码
      },
      // 获取登录信息
      UserInfo: [], // 用户登录正确
      SavaToken: "", // 保存token
      path_login: "", //当前路径
      // 表单的验证规则
      rules: {
        // 用户名验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 用户密码验证
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 回车键
    document.onkeypress = e => {
      var keycode = document.all ? event.keyCode : e.which;
      let login;
      login = this.$route.path;
      this.login = login;
      if (this.$route.path !== login) {
        return;
      } else if (keycode === 13) {
        this.goLogin(); // 登录方法
        return false;
      }
    };
    // 将登录信息存到 session中
    window.sessionStorage.setItem("userinfo", this.LoginForm.username);
  },
  methods: {
    // 键盘按下
    onEnter(event) {},
    resetLoginForm() {
      // 重置表单
      this.$refs.resetInputRef.resetFields();
      console.log(this);
    },
    // 表单预验证
    goLogin() {
      if (this.login !== "/login") {
        return;
      }
      this.$refs.resetInputRef.validate(async valid => {
        if (valid !== false) {
          const result = await this.$http.getUserInfo();
          if (result.data[0].status === 200) {
            this.$message.success("恭喜您登录成功!!");
            window.sessionStorage.setItem("token", result.data[0].token);
            window.sessionStorage.setItem(
              "login_info",
              this.LoginForm.username
            );
            this.$router.push("home");
          } else {
            this.$message.error("请输入合法信息!!");
          }
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
#containerTenter {
  width: 100%;
  height: 100%;
  background-image: url("../assets/veer-315418201.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login_back {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
}
.login_header {
  width: 450px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  > p {
    font-size: 28px;
    font-family: "宋体";
    font-weight: bold;
  }
}
.btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.Img_Header {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>
