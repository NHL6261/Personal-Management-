module.exports = {
  lintOnSave: false, //关闭eslinet检查
  devServer:{
      open:true, // 自动打开浏览器
      port:8888, // 修改端口号
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          pathRewrite: {
            "^/api": ''
          }
        }
    }
  }
}