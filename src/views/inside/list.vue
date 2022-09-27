<template>
    <div>
        <el-table
            :data="list"
            style="width: 100%; height: 100%"
            row-key="id"
            border
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="part" label="部门" sortable width="230">
            </el-table-column>
            <el-table-column prop="job" label="职位" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable width="230"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[
                {
                    id:'dev',
                    part:'开发部',
                    children:[]
                },
                {
                    id:'sell',
                    part:'销售部',
                    children:[]
                },
                {
                    id:'man',
                    part:'人事部',
                    children:[]
                }
            ]
        }
    },
    created(){
        this.$axios.get('http://localhost:3000/member?part=开发部').then(res=>{
            this.list[0].children = res.data
    })
        this.$axios.get('http://localhost:3000/member?part=销售部').then(res=>{
            this.list[1].children = res.data
        })
        this.$axios.get('http://localhost:3000/member?part=人事部').then(res=>{
            this.list[2].children = res.data
        })
    }
};
</script>

<style lang="scss" scoped>
</style>