<template>
  <div id="content">
    <!-- 员工管理面包屑 对用 element ui 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input placeholder="请输入内容" v-model="details_input.query" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 员工列表 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="15">
        <el-col :span="24">
          <el-table :data="Employe_edetails" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="姓名" width="80"></el-table-column>
            <el-table-column prop="age" label="性别" width="50"></el-table-column>
            <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
            <el-table-column prop="onboarding" label="入职时间" width="110"></el-table-column>
            <el-table-column prop="education" label="学历" width="70"></el-table-column>
            <el-table-column prop="Job_title" label="职务" width="80"></el-table-column>
            <el-table-column prop="address" label="住址" width="250"></el-table-column>
            <el-table-column prop="phone" label="电话" width="160"></el-table-column>
            <el-table-column prop="urgent" label="紧急联系人" width="120"></el-table-column>
            <el-table-column prop="department" label="所属部门" width="120"></el-table-column>
            <el-table-column label="操作" width="438px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-tooltip :enterable="false" effect="dark" content="修改角色" placement="top">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditDialog()"
                  ></el-button>
                </el-tooltip>
                <!-- 删除按钮 -->
                <el-tooltip :enterable="false" effect="dark" content="删除角色" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="delete_data()"></el-button>
                </el-tooltip>
                <!-- 分配角色按钮 -->
                <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top">
                  <el-button type="info" icon="el-icon-setting" size="mini"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
    </el-card>
    <!-- 底部分页 -->
    <!-- 底部footer -->
    <Footer></Footer>
    <!-- 弹出取消 and 确定 -->
    <el-dialog title="添加员工信息" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="age">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-input v-model="addForm.birth"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="onboarding">
          <el-input v-model="addForm.onboarding"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input v-model="addForm.education"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="Job_title">
          <el-input v-model="addForm.Job_title"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="紧联系人" prop="urgent">
          <el-input v-model="addForm.urgent"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-input v-model="addForm.department"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Footer from "./Footer";
export default {
  components: {
    Footer
  },
  data() {
    // 自定义验证规则 => 年龄
    var checkAge = (rule, value, callback) => {
      const regUser = /^\d{1,3}$/;
      if (regUser.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确的年龄值"));
      }
    };
    return {
      addForm: {
        username: "",
        age: "",
        birth: "",
        onboarding: "",
        education: "",
        Job_title: "",
        address: "",
        phone: "",
        urgent: "",
        department: ""
      },
      Employe_edetails: [], // 员工信息
      details_input: {
        query: "" // 搜索信息
      },
      // 验证规则
      addFormRules: {
        age: [
          { required: true, message: "请输入正确的年龄", trigger: "blur" },
          { validator: checkAge, trigger: "blur" }
        ],
        onboarding: [],
        phone: []
      },
      // 当前页是否显示
      addDialogVisible: false
    };
  },
  created() {
    this._getEmployeDetails();
  },
  methods: {
    async _getEmployeDetails() {
      let result = await this.$http.getDetails();
      this.Employe_edetails = result.data;
    },
    showEditDialog(){
      alert('点击了修改按钮')
    },
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return this.$message.error("请输入合法信息");
        // 发请求添加用户
        let arrObj = {
          id: 5,
          name: "小二",
          age: "男",
          birth: "1997/06/26",
          onboarding: "2017/03/21",
          education: "本科",
          Job_title: "管理员",
          address: "昌平区北七家镇宏福苑南二区",
          phone: 17852561369,
          urgent: "来壶酒",
          department: "开发部"
        };
        this.Employe_edetails.push(arrObj);
        this.addDialogVisible = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
#content {
  width: 100%;
  height: 100%;
}
.footer_Setup {
  position: absolute;
  bottom: 0;
}
.el-button--mini {
  padding: 16px 30px !important;
}
.el-form-item__label {
  width: 100px;
}
.el-form-item {
  margin-bottom: 18px;
}
.el-dialog__body {
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-dialog {
  padding: 10px 30px !important;
}
</style>
