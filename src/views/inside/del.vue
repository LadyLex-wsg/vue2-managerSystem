<template>
    <div>
        <div v-show="show">
            <el-table :data="list" style="width: 100%">
                <el-table-column label="日期">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{
                            scope.row.time
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="部门">
                    <template slot-scope="scope">
                        <el-tag size="medium" type="success">{{
                            scope.row.part
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="姓名">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>部门: {{ scope.row.part }}</p>
                            <p>理由:{{ scope.row.text }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{
                                    scope.row.name
                                }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="edit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="离职审批" :visible.sync="dialog">
                <p>姓名:{{ name }}</p>
                <p>部门:{{ part }}</p>
                <p>理由:{{ why }}</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="not">驳 回</el-button>
                    <el-button type="primary" @click="yes">通 过</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-show="!show"><h2>没有需要处理的离职审批</h2></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            show: true,
            dialog: false,
            name: "",
            part: "",
            why: "",
            num: "",
            id: "",
            history: "",
        };
    },
    methods: {
        edit(index, row) {
            this.dialog = true;
            // console.log(index,row);
            this.num = index;
            this.name = row.name;
            this.part = row.part;
            this.why = row.text;
            this.history = row.history;
        },
        not() {
            this.$axios
                .delete("http://localhost:3000/del/" + this.list[this.num].id)
                .then((res) => {
                    if (this.history[0] == "admin") {
                        this.$axios
                            .patch(
                                "http://localhost:3000/member/" +
                                    this.history[1],
                                { access: 1 }
                            )
                            .then((res) => {
                                this.$message({
                                    message: "申请已驳回,恢复管理员权限",
                                    type: "success",
                                });
                            });
                    }else{
                        this.$message({
                                    message: "申请已驳回",
                                    type: "success",
                                });
                    }
                    this.$delete(this.list, this.num);
                    this.name = "";
                    this.part = "";
                    this.why = "";
                    this.num = "";
                    this.id = "";
                    this.history = "";
                    this.dialog = false;
                })
                .catch(() => {
                    this.$message.error("网络错误,操作失败");
                });
        },
        yes() {
            this.$axios
                .get(
                    "http://localhost:3000/member?name=" +
                        this.name +
                        "&part=" +
                        this.part
                )
                .then((res) => {
                    this.id = res.data[0].id;
                    this.$axios
                        .delete(
                            "http://localhost:3000/del/" +
                                this.list[this.num].id
                        )
                        .then(() => {
                            this.$axios
                                .delete(
                                    "http://localhost:3000/member/" + this.id
                                )
                                .then(() => {
                                    this.$delete(this.list, this.num);
                                    this.name = "";
                                    this.part = "";
                                    this.why = "";
                                    this.num = "";
                                    this.id = "";
                                    this.dialog = false;
                                    this.$message({
                                        message: "申请已通过",
                                        type: "success",
                                    });
                                });
                        })
                        .catch(() => {
                            this.$message.error("网络错误,操作失败");
                        });
                });
        },
    },
    created() {
        const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
            if (this.$store.state.user.access) {
                this.$axios.get("http://localhost:3000/del").then((res) => {
                    if (res.data[0]) {
                        this.list = res.data;
                        this.show = true;
                    } else {
                        this.show = false;
                    }
                });
            } else {
                this.$router.push("/401");
            }
            loading.close();
        }, 800);
    },
};
</script>

<style lang="scss" scoped>
</style>