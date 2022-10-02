<template>
    <div>
        <div v-if="global">
            <h2>确定要辞职吗?</h2>
            <el-button type="warning" plain @click="show = true">辞职</el-button>
            <el-dialog title="辞职申请" :visible.sync="show" width="50%">
                <span>{{ $store.state.user.name }},确定要提交辞职申请吗?</span>
                    <el-input v-model="pwd" autocomplete="off" placeholder="请输入密码"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button type="success" @click="show = false">取 消</el-button
                    >
                    <el-button type="danger" @click="goodBye">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div v-else>
            <h2>您已经提交过申请了,请等待审批</h2>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            global: true,
            show: false,
            pwd: "",
        };
    },
    methods: {
        goodBye() {
            this.$axios
                .get(
                    "http://localhost:3000/member?name=" +
                        this.$store.state.user.name +
                        "&pwd=" +
                        this.pwd
                )
                .then((res) => {
                    if (res.data[0]) {
                        this.show = false;
                        this.$axios
                            .post("http://localhost:3000/del", {
                                name: this.$store.state.user.name,
                                part: this.$store.state.user.part,
                            })
                            .then((res) => {
                                this.$notify({
                                    title: "提交成功",
                                    message: "辞职申请提交成功,请等待审批",
                                });
                            });
                    } else {
                        this.$alert("密码错误,请重试", "失败", {
                            confirmButtonText: "确定",
                        });
                    }
                })
                .catch(() => {
                    this.$alert("网络错误,请检查网络", "失败", {
                        confirmButtonText: "确定",
                    });
                });
        },
    },
    created() {
        this.$axios
            .get(
                "http://localhost:3000/del?name=" + this.$store.state.user.name
            )
            .then((res) => {
                if (res.data[0]) {
                    this.global = false;
                } else {
                    this.global = true;
                }
            });
    },
};
</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 50px;
}
</style>