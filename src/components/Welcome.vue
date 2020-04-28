<template>
    <div class="shadow_wrap">
      <p class="floating">欢迎使用八号地员工管理系统</p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="less" scoped>
.className {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 34px;
}
.shadow_wrap {
  width: 800px;
  height: 100%;
  margin-bottom: 10px;
  position: absolute;
  left: 56%;
  top: 64%;
  transform: translate(-50%,-50%);
}
.floating { 
  width: 800px;
  height: 500px;
  font-size: 50px;
  line-height: 350px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transform: translateY(45px);
  transition: transform 1s;
  font-family: '微软雅黑';
}
.floating:after {
  content: "";
  display: block;
  width: 300px;
  height: 15px;
  position: absolute;
  bottom: -30px;
  left: 50%;
  height: 8px;
  width: 100%;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translate(-50%, 0);
  transition: transform 1s;
}
/*鼠标移上去的效果*/
.floating:hover {
  transform: translateY(-40px);
  transition: transform 1s;
}
.floating:hover:after {
  transform: translate(-50%, 40px) scale(0.75);
  transition: transform 1s;
}
</style>
