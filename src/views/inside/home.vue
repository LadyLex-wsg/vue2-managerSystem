<template>
    <div id="app">
        <el-container style="height: 100%">
            <el-aside width="200px">
                <el-menu :default-openeds="['1', '2']" default-active="1-1">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>员工管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="$router.push('/home/list')">员工总览</el-menu-item>
                            <el-menu-item index="1-2" v-show="access"
                                >入职审批</el-menu-item
                            >
                            <el-menu-item index="1-3" v-show="access"
                                >离职审批</el-menu-item
                            >
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">个人管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">辞职申请</el-menu-item>
                            <el-menu-item index="2-2">修改密码</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="80px">
                    <el-breadcrumb separator="/">
                            <i
                                class="el-icon-user-solid"
                                style="margin-right: 15px"
                            ></i>
                        <el-breadcrumb-item>{{
                            $store.state.user.part
                        }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{
                            $store.state.user.job
                        }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{
                            $store.state.user.name
                        }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            access: true,
        };
    },
    created() {
        if (sessionStorage.getItem("system_confirm")) {
            this.$axios
                .get(
                    "http://localhost:3000/member?name=" +
                        sessionStorage.getItem("system_confirm")
                )
                .then((res) => {
                    if (res.data[0]) {
                        this.$store.dispatch("main_confirm", res.data[0]);
                        this.access = res.data[0].access;
                        if (this.access) {
                            this.$axios
                                .get("http://localhost:3000/add")
                                .then((res) => {
                                    if (res.data) {
                                        this.$notify.info({
                                            title: "提示",
                                            message: "您有待处理的入职审批",
                                        });
                                    }
                                });
                            this.$axios
                                .get("http://localhost:3000/del")
                                .then((res) => {
                                    this.$notify.error({
                                        title: "提示",
                                        message: "您有待处理的离职审批",
                                    });
                                });
                        }
                    } else {
                        this.$router.push("/401");
                    }
                });
        } else {
            this.$router.push("/");
        }
    },
    destroyed() {
        sessionStorage.removeItem("system_confirm");
    },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}
#app {
    .el-aside {
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #69adf1;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    header.el-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: #d3dce6;
        div.el-breadcrumb{
            margin-right: 50px;
        }
    }
}
</style>