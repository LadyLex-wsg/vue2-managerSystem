<templte>
    <div id="app">
        <h1>人事管理系统</h1>
        <div class="item">
            <Login v-show='show'></Login>
            <Resign v-show='!show'></Resign>
        </div>
    </div>
</templte>

<script>
import Login from '@/components/login.vue';
import Resign from '@/components/resign.vue';
export default {
    components: { Login, Resign },
    data(){
        return{
            show:true
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