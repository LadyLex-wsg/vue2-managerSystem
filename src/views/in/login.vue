<template>
    <div>
        <span>用户名</span>
        <el-tooltip
            class="item"
            effect="dark"
            content="请输入您的姓名"
            placement="top"
        >
            <el-input
                v-model="name"
                placeholder="请输入姓名"
                @blur="name_alert"
                @input='test'
                clearable
            ></el-input>
        </el-tooltip>
        <span>密码</span>
        <el-tooltip
            class="item"
            effect="dark"
            content="请输入英文数字,3-12位"
            placement="top"
        >
            <el-input
                placeholder="请输入密码"
                v-model="pwd"
                show-password
                @blur="pwd_alert"
                @input='test'
                clearable
            ></el-input>
        </el-tooltip>
        <div class="btn">
            <el-button :type="type" plain @click="login" :disabled="off"
                >登录</el-button
            >
            <el-button type="success" plain @click="change">注册</el-button>
        </div>
        <p>欢迎使用本管理系统</p>
        <p>如有问题请致电开发部:138xxxxxxxx</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            pwd: "",
            off: true,
            pwd_status: false,
            name_status: false,
            type: "danger",
        };
    },
    methods: {
        change() {
            this.$router.push('/register')
        },
        login() {
            this.$axios
                .get(
                    "http://localhost:3000/member?name=" +
                        this.name +
                        "&pwd=" +
                        this.pwd
                )
                .then((res) => {
                    if (res.data.length) {
                        this.$router.push('/home')
                    } else {
                        this.$axios
                            .get(
                                "http://localhost:3000/member?name=" + this.name
                            )
                            .then((res) => {
                                if (res.data.length) {
                                    this.$alert("密码错误", {
                                        confirmButtonText: "确定",
                                    });
                                } else {
                                    this.$alert("用户名错误", {
                                        confirmButtonText: "确定",
                                    });
                                }
                            });
                    }
                })
                .catch(function () {
                    this.$alert("网络请求超时,请检查网络", {
                        confirmButtonText: "确定",
                    });
                });
        },
        name_alert() {
            let test = /^[\u4E00-\u9FA5]{2,5}$/;
            if (!test.test(this.name)) {
                this.$message.error("姓名输入错误");
            }
        },
        pwd_alert() {
            let test = /^[0-9a-z]{3,12}$/i;
            if (!test.test(this.pwd)) {
                this.$message.error("密码格式错误");
            }
        },
    },
    watch: {
        name() {
            let test = /^[\u4E00-\u9FA5]{2,5}$/;
            if (test.test(this.name)) {
                this.name_status = true;
            } else {
                this.name_status = false;
            }
        },
        pwd() {
            let test = /^[0-9a-z]{3,12}$/i;
            if (test.test(this.pwd)) {
                this.pwd_status = true;
            } else {
                this.pwd_status = false;
            }
        },
    },
    computed: {
        test() {
            if (this.name_status && this.pwd_status) {
                this.off = false;
                this.type = "primary";
            } else {
                this.off = true;
                this.type = "danger";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#app {
    .el-input {
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .btn {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: 80px;
        button:first-child {
            margin-right: 30px;
        }
    }
    p {
        font-size: 12px;
        text-align: center;
        margin-bottom: 8px;
    }
}
</style>