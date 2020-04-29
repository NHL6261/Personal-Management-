<template>
  <div id="footer_content">
    <div class="swiper">
      <div class="footer_img">
        <img src="../assets/footer_img.png" alt />
      </div>
      <div class="footer_text">
        <p>北京地址：北京市丰台区金茂广场3号楼1001室</p>
        <p>北京地址：北京市丰台区金茂广场3号楼1001室</p>
        <p>合肥地址：安徽省合肥市包河区滨湖金融港B3座501室</p>
        <p>北京电话：010-64222400 / 合肥电话：400-818-5900</p>
        <p>公司邮箱：8haodi@8haodi.com</p>
      </div>
      <div class="QR_code">
        <img src="../assets/QR.png" alt />
      </div>
      <div class="QR_code">
        <img src="../assets/QR.png" alt />
      </div>
      <div class="QR_code">
        <img src="../assets/QR.png" alt />
      </div>
      <div class="QR_code">
        <img src="../assets/QR.png" alt />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="less" scoped>
#footer_content {
  width: 100%;
  height: 235px;
  background-color: #444444;
  padding: 88px 450px 118px 400px;
  box-sizing: border-box;
}
.swiper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.footer_img {
  height: 85px;
}
.footer_text {
  width: 345px;
  height: 85px;
  color: #ffffff;
  font-size: 14px;
  font-family: "SourceHanSansCN-Normal";
  font-weight: normal;
}
.QR_code {
  width: 70px;
  height: 70px;
  background-color: #fff;
  text-align: center;
}
.QR_code > img {
  width: 60px;
  height: 60px;
  padding: 5px;
}
</style>
