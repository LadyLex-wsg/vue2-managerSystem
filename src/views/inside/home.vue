<template>
    <div id="app">
        <el-container style="height: 100%">
            <el-aside width="200px"> </el-aside>

            <el-container>
                <el-header height="80px"> </el-header>

                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {};
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