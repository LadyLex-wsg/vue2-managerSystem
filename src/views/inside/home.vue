<templat>
    <div id="app">
        <el-container style="height: 100%">
            <el-aside width="200px">
                <el-menu :default-openeds="['1']">
                    <el-submenu index="1" v-show="access">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="80px">
                    <i
                        class="el-icon-user-solid"
                        style="margin-right: 15px"
                    ></i>
                    <span>{{ $store.state.user.name }}</span>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</templat>

<script>
export default {
    data() {
        return {
            access: true,
        };
    },
    created() {
        console.log(sessionStorage.getItem("system_confirm"));
        if (sessionStorage.getItem("system_confirm")) {
            this.$axios
                .get(
                    "http://localhost:3000/member?name=" +
                        sessionStorage.getItem("system_confirm")
                )
                .then((res) => {
                    this.$store.dispatch("main_confirm", res.data[0]);
                    this.access = res.data[0].access;
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
    .el-header {
        background-color: #d3dce6;
    }
}
</style>