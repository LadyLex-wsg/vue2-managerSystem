<template>
    <div>
        <span>姓名</span>
        <el-tooltip
            class="item"
            effect="dark"
            content="请输入您的姓名"
            placement="top"
        >
            <el-input
                placeholder="请输入姓名"
                v-model="name"
                clearable
                @blur="name_test"
            >
            </el-input>
        </el-tooltip>
        <span>登录密码</span>
        <el-tooltip
            class="item"
            effect="dark"
            content="请输入英文数字,3-12位"
            placement="top"
        >
            <el-input
                placeholder="请输入密码"
                v-model="pwd"
                clearable
                show-password
                @blur="pwd_test"
            ></el-input>
        </el-tooltip>
        <span>选择你的职位</span>
        <el-cascader v-model="job" :options="options"></el-cascader>
        <div class="btn">
            <el-button :type="type" plain :disabled="off" @click="sign"
                >注册</el-button
            >
            <el-button type="success" plain @click="change">登录</el-button>
        </div>
        <p>欢迎使用本管理系统</p>
        <p>如有问题请致电开发部:138xxxxxxxx</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            off: true,
            name_status: false,
            pwd_status: false,
            job_status: false,
            type: "danger",
            name: "",
            pwd: "",
            job: [],
            options: [
                {
                    value: "开发部",
                    label: "开发部",
                    children: [
                        {
                            value: "开发经理",
                            label: "开发经理",
                        },
                        {
                            value: "前端工程师",
                            label: "前端工程师",
                        },
                        {
                            value: "后端工程师",
                            label: "后端工程师",
                        },
                        {
                            value: "测试工程师",
                            label: "测试工程师",
                        },
                    ],
                },
                {
                    value: "销售部",
                    label: "销售部",
                    children: [
                        {
                            value: "销售经理",
                            label: "销售经理",
                        },
                        {
                            value: "销售专员",
                            label: "销售专员",
                        },
                    ],
                },
                {
                    value: "人事部",
                    label: "人事部",
                    children: [
                        {
                            value: "人事主管",
                            label: "人事主管",
                        },
                        {
                            value: "人事专员",
                            label: "人事专员",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        change() {
            this.$router.push("/");
        },
        sign() {
            let data = {
                name: this.name,
                part: this.job[0],
                job: this.job[1],
                pwd: this.pwd,
            };
            this.$axios.post("http://localhost:3000/add", data).then(() => {
                this.$message({
                    message: "申请发送成功,请等待审批",
                    type: "success",
                });
            });
        },
        name_test() {
            let test = /^[\u4E00-\u9FA5]{2,5}$/;
            if (!test.test(this.name)) {
                this.$message.error("姓名输入错误");
            }
        },
        pwd_test() {
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
        job() {
            if (this.job.length) {
                this.job_status = true;
            } else {
                this.job_status = false;
            }
        },
    },
    computed: {
        test() {
            if (this.name_status && this.pwd_status && this.job_status) {
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
.el-input {
    margin-top: 20px;
    margin-bottom: 30px;
}
.btn {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 39px;
    button:first-child {
        margin-right: 30px;
    }
}
p {
    font-size: 12px;
    text-align: center;
    margin-bottom: 8px;
}
</style>