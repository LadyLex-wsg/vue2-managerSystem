<template>
    <div>
        <span>旧密码</span>
        <el-tooltip
            class="item"
            effect="dark"
            content="请输入旧密码"
            placement="top"
        >
            <el-input
                placeholder="请输入旧密码"
                v-model="oldPwd"
                clearable
                show-password
                @input="judge"
            >
            </el-input>
        </el-tooltip>
        <span>新密码</span>
        <el-tooltip
            class="item"
            effect="dark"
            content="请输入新密码"
            placement="top"
        >
            <el-input
                placeholder="请输入新密码"
                v-model="newPwd"
                clearable
                show-password
                @input="judge"
            >
            </el-input>
        </el-tooltip>
        <div class="btn">
            <el-button :type="type" plain :disabled="status" @click="change"
                >提交</el-button
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oldPwd: "",
            newPwd: "",
            type: "danger",
            status: true,
            judge1: "",
            judge2: "",
        };
    },
    watch: {
        oldPwd() {
            let test = /^[0-9a-z]{3,12}$/i;
            if (this.oldPwd == "") {
                this.judge1 = false;
            } else if (test.test(this.oldPwd)) {
                this.judge1 = true;
            } else {
                this.judge1 = false;
            }
        },
        newPwd() {
            let test = /^[0-9a-z]{3,12}$/i;
            if (this.newPwd == "") {
                this.judge2 = false;
            } else if (test.test(this.newPwd)) {
                this.judge2 = true;
            } else {
                this.judge2 = false;
            }
        },
    },
    computed: {
        judge() {
            if (this.judge1 && this.judge2) {
                this.status = false;
                this.type = "primary";
            } else {
                this.status = true;
                this.type = "danger";
            }
        },
    },
    methods: {
        change() {
            this.$axios
                .get(
                    "http://localhost:3000/member?name=" +
                        this.$store.state.user.name +
                        "&pwd=" +
                        this.oldPwd
                )
                .then((res) => {
                    if (res.data[0]) {
                        if(this.newPwd == res.data[0].pwd){
                            this.$message.error('新旧密码不能一样');
                        }else{
                            this.$axios
                            .patch(
                                "http://localhost:3000/member/" +
                                    res.data[0].id,
                                { pwd: Number(this.newPwd) }
                            )
                            .then((res) => {
                                if (res) {
                                    this.$message({
                                        message: "修改成功,请重新登录",
                                        type: "success",
                                    });
                                    setTimeout(() => {
                                        this.$router.push("/");
                                    }, 5000);
                                } else {
                                    this.$message.error(
                                        "旧密码错误,请重新输入"
                                    );
                                }
                            })
                            .catch(() => {
                                this.$message.error("网络错误,请检查网络");
                            });
                        }
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.el-input {
    margin-top: 20px;
    margin-bottom: 50px;
}
.btn {
    display: flex;
    justify-content: center;
}
</style>