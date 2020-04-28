<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserInfo">
            <el-button slot="append" icon="el-icon-search" @click="getUserInfo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <!-- 加索引 type ="index" -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="moblie"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 slot-scope="scope" -->
          <template slot-scope="scope">
            <el-switch @change="userStateChanger(scope.row)" v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip :enterable="false" effect="dark" content="修改角色" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip :enterable="false" effect="dark" content="删除角色" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_data()"></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击修改按钮后弹出此对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="20%">
      <el-form :rules="reviseRules" ref="reviseRef" label-width="70px">
        <el-form-item label="名称">
          <el-input v-model="showNmae" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" type="password">
          <el-input type="password" v-model="pwd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="email_data"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="revise">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    //  自定义验证 用户名
    var checkUser = (rule, value, callback) => {
      const regUser = /^[a-zA-Z]+$/i;
      if (regUser.test(value)) {
        return callback();
      } else {
        callback(new Error("用户名必须是英文字母组成"));
      }
    };
    // 自定义密码
    var checkPwd = (rule, value, callback) => {
      const regPwd = /^[a-zA-Z][0-9a-zA-Z_]{3,17}/;
      if (regPwd.test(value)) {
        return callback();
      } else {
        callback(new Error("密码是由英文,数字,下划线组成"));
      }
    };
    //  自定义验证规则 验证email
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法邮箱"));
      }
    };
    // 自定义手机号 验证规则
    var checkMobil = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法手机号"));
      }
    };
    return {
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      pwd:"248376261", // 密码的回显
      email_data:'ni248376261@163.com', // 邮箱数据的回显
      showNmae: "admin",
      //ruleForm:"",// 默认数据
      //添加用户表单数据
      editDialogVisible: false, //控制修改用户对话框的显示与隐藏
      addDialogVisible: false, //控制添加用户对话框显示与隐藏
      // 获取用户列表参数
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条
        pagesize: 2
      },
      userlist: [],
      total: 4,
      // 修改信息验证规则
      reviseRules: {},
      // 添加表单验证的规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkUser, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPwd, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobil, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 删除列表接口 删除逻辑
    delete_data(){
      alert('您点击了删除')
    },
    // 修改数据的接口 在此处修改数据
    revise(){ 
      this.editDialogVisible = false
      alert(111)
    },
    // 点击修改按钮 事件监听
    showEditDialog() {
      this.editDialogVisible = true;
    },
    // 点击按钮，添加新用户预校验
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return this.$message.error("请输入合法信息");
        // 发请求添加用户
        let arrObj = {
          id: 500,
          email: "10086@163.com",
          role_name: "超级管理员",
          username: "admin",
          create_time: 1486720211,
          moblie: 15810551236,
          mg_state: true
        };
        this.userlist.push(arrObj);
        this.total++;
        this.addDialogVisible = false;
      });
    },
    // 监听对话框表单
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    async getUserInfo() {
      let result = await this.$http.getUser();
      this.userlist = result.data.users;
      this.showNmae = result.data.users[0].role_name;
      if (result.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！！");
      } else {
        this.userlist = result.data.users;
      }
    },
    // 监听页数改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserInfo();
    },
    // 监听页码值改变的参数
    handleCurrentChange(newPage) {
      console.log("点击了");
      this.queryInfo.pagenum = newPage;
      this.getUserInfo();
    },
    // 监听switch开关的状态
    userStateChanger(userinfo) {
      console.log(userinfo);
    }
  }
};
</script>

<style lang="less" scoped>
.el-form-item__label {
  width: 58px;
}
</style>
