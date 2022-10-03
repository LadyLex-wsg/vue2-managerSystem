<template>
    <div>
        <el-table
            :data="list"
            style="width: 100%; height: 100%"
            row-key="id"
            border
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="part" label="部门" width="150">
            </el-table-column>
            <el-table-column prop="job" label="职位"> </el-table-column>
            <el-table-column prop="money" label="薪资" v-if="access">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    id: "dev",
                    part: "开发部",
                    children: [],
                },
                {
                    id: "sell",
                    part: "销售部",
                    children: [],
                },
                {
                    id: "man",
                    part: "人事部",
                    children: [],
                },
            ],
            access: false,
        };
    },
    created() {
        const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
            this.access = this.$store.state.user.access;
            this.$axios
                .get("http://localhost:3000/member?part=开发部")
                .then((res) => {
                    this.list[0].children = res.data;
                });
            this.$axios
                .get("http://localhost:3000/member?part=销售部")
                .then((res) => {
                    this.list[1].children = res.data;
                });
            this.$axios
                .get("http://localhost:3000/member?part=人事部")
                .then((res) => {
                    this.list[2].children = res.data;
                });
            loading.close();
        }, 700);
    },
};
</script>

<style lang="scss" scoped>
</style>