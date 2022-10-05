<temlate>
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
            <el-table-column label="操作" v-if="access">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        v-if="scope.row.name"
                        @click="edit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="操作" :visible.sync="dialog" width="30%">
            <p>姓名:{{ name }}</p>
            <p>部门:{{ part }}</p>
            <p>职位:{{ job }}</p>
            <p>薪资:</p>
            <div>
                <el-input-number
                    v-model="money"
                    width="100%"
                    controls-position="right"
                    :min="2000"
                    :step="100"
                ></el-input-number>
            </div>
            <span>用户权限</span>
            <el-switch
                v-model="power"
                active-color="#13ce66"
                inactive-color="#ff4949"
            >
            </el-switch>
            <span>管理员权限</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>
        </el-dialog>
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
            power: false,
            dialog: false,
            num: "",
            part: "",
            job: "",
            name: "",
            money: "",
            id: "",
        };
    },
    methods: {
        edit(index, row) {
            // console.log(index,row);
            this.num = index;
            this.name = row.name;
            this.part = row.part;
            this.job = row.job;
            this.money = row.money;
            this.power = row.access ? true : false;
            this.id = row.id;
            this.dialog = true;
        },
        update() {
            if (this.access) {
                this.$axios
                    .patch("http://localhost:3000/member/" + this.id, {
                        money: this.money,
                        access: this.power ? 1 : 0,
                    })
                    .then(() => {
                        this.dialog = false
                        this.$message({
                            message: "修改成功",
                            type: "success",
                        });
                        this.$router.go(0)
                    })
                    .catch(() => {
                        this.$message.error('网络错误,请检查网络');
                    });
            } else {
                this.$router.push("/401");
            }
        },
    },
    watch: {
        dialog() {
            if (!this.dialog) {
                this.money = "";
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
