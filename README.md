## 在基座项目里面注册项目
在基座项目的systemsConfig.json配置文件里注册子项目
```
{
  "ident": "vuedemo",
	"development": {
		"publicPath": "http://localhost:8090/vuedemo/",
		"index": "http://localhost:8090/vuedemo/index.html"
	},
	"production": {
		"publicPath": "/vuedemo/",
		"index": "/vuedemo/index.html"
	}
}
```
添加以上代码即可注册子项目
## single-spa vue子项目demo Quick start
1. 安装依赖
```shell
npm install 或者 yarn
```
2. 启动服务
```shell
npm run dev
```
## 项目说明
1. 项目安装了vue、vue-router，并全局引入ant-design-vue
2. webpack配置参考 [vue cli](https://cli.vuejs.org/zh/)，配置文件在根目录下vue.config.js
3. 更改项目名字路径在package.json里面的systemName字段
4. 在App.vue里面有和基座项目交互的方法


