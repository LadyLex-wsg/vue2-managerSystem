<template>
    <div>
        <el-table :data="list" style="width: 100%" v-if="show">
            <el-table-column label="姓名">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium" type="success">{{
                            scope.row.name
                        }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="部门">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.part }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="职位">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.job }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="edit(scope.$index, scope.row)"
                        >操作</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <h2 v-else>没有需要处理的入职审批</h2>
        <el-dialog title="入职审批" :visible.sync="dialog" width="30%">
            <p>姓名:{{ name }}</p>
            <p>部门:{{ part }}</p>
            <p>职位:{{ job }}</p>
            <p>请输入薪资:</p>
            <el-input placeholder="请输入薪资" v-model="money" clearable>
            </el-input>
            <span>用户权限</span>
            <el-switch
                v-model="access"
                active-color="#13ce66"
                inactive-color="#ff4949"
            >
            </el-switch>
            <span>管理员权限</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="no">驳 回</el-button>
                <el-button type="primary" @click="yes">通 过</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            show: true,
            dialog: false,
            num: "",
            name: "",
            part: "",
            job: "",
            money: "",
            id: "",
            access: false,
            pwd: "",
        };
    },
    methods: {
        edit(index, row) {
            this.num = index;
            this.name = row.name;
            this.part = row.part;
            this.job = row.job;
            this.id = row.id;
            this.pwd = row.pwd;
            this.dialog = true;
        },
        no() {
            this.$axios
                .delete("http://localhost:3000/add/" + this.id)
                .then((res) => {
                    this.$delete(this.list, this.num);
                    this.dialog = false;
                    this.num = "";
                    this.name = "";
                    this.part = "";
                    this.job = "";
                    this.id = "";
                    this.$message({
                        message: "申请已驳回",
                        type: "success",
                    });
                })
                .catch(() => {
                    this.$message.error("网络错误,请检查网络");
                });
        },
        yes() {
            this.$axios
                .delete("http://localhost:3000/add/" + this.id)
                .then(() => {
                    this.$axios
                        .post("http://localhost:3000/member", {
                            name: this.name,
                            part: this.part,
                            job: this.job,
                            money: this.money,
                            access: this.access ? 1 : 0,
                            pwd: this.pwd,
                        })
                        .then(() => {
                            this.$delete(this.list, this.num);
                            this.dialog = false;
                            this.num = "";
                            this.name = "";
                            this.part = "";
                            this.job = "";
                            this.id = "";
                            this.pwd = "";
                            this.$message({
                                message: "申请已通过",
                                type: "success",
                            });
                        })
                        .catch(() => {
                            this.$message.error("网络错误,请检查网络");
                        });
                });
        },
    },
    watch: {
        dialog() {
            if (!this.dialog) {
                this.money = "";
                this.access = false;
            }
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
                this.$axios.get("http://localhost:3000/add").then((res) => {
                    if (res.data[0]) {
                        this.show = true;
                        this.list = res.data;
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