<template>
    <div>
        <el-empty>
            <h1>401!您没有访问该网页的权限</h1>
            <el-button type="primary" @click="$router.push('/')"
                >返回</el-button
            >
        </el-empty>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>