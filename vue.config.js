module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '台灣高爾夫學院報名表'
        return args
      })
  }
}