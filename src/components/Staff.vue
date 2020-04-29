<template>
  <div>
    <!-- 员工管理面包屑 对用 element ui 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
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
            <el-table-column prop="address" label="住址" width="210"></el-table-column>
            <el-table-column prop="phone" label="电话" width="120"></el-table-column>
            <el-table-column prop="urgent" label="紧急联系人" width="120"></el-table-column>
            <el-table-column prop="department" label="所属部门" width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
    </el-card>
    <!-- 底部footer -->
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Footer from "./Footer";
export default {
  components: {
    Footer
  },
  data() {
    return {
      Employe_edetails: [] // 员工信息
    };
  },
  created() {
    this._getEmployeDetails();
  },
  methods: {
    async _getEmployeDetails() {
      let result = await this.$http.getDetails();
      this.Employe_edetails = result.data;
    }
  }
};
</script>

<style lang="less" scoped>
.footer_Setup {
  position: absolute;
  bottom: 0;
}
</style>
