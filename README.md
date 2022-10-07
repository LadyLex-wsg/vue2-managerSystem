# 人事管理系统

## 技术介绍
1. 本项目基于Vue2实现,使用Vue-cli创建项目，使用ElementUI实现页面样式
2. 使用SCSS预处理
3. 使用VUE-Router实现页面跳转
4. 利用JSON-Server模拟后端实现前后端交互
5. 利用Axios获取或提交或修改数据，从而实现登录、注册、入职审批、离职审批、薪资管理、管理员权限管理等功能
6. 使用Vuex实现数据缓存，实现数据共享
7. 使用Git对项目开发流程进行管理并存储至远程仓库

## 实现功能
1.登录/登出
2.注册
3.权限管理
4.薪资管理
5.入职审批
6.离职审批
7.员工辞职申请
8.修改密码

## 组件安装

```
npm install
```

## 启动服务

```
npm run serve
```

## 项目打包

```
npm run build
```

## JSON-server启动
```

cd src

cd data

json-server -w data.json
```
