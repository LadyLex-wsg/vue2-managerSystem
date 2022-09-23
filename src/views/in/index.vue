<template>
    <div id="app">
        <h1>人事管理系统</h1>
        <div class="item">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    }
    };
</script>

<style lang="scss" scoped>
#app {
    background-color: aquamarine;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-content: center;
    h1 {
        width: 100%;
        text-align: center;
    }
    .item {
        border-radius: 15px;
        padding: 15px;
        width: 400px;
        height: 450px;
        background: white;
        overflow: hidden;
        margin-top: 30px;
    }
}
</style>