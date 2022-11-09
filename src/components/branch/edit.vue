<template>
    <van-popup>
        <div style="width:90vw;margin:.6rem">
            <van-form>
                <van-cell-group>
                    <van-field name="radio" label="">
                        <template #input>
                            <van-radio-group v-model="checked" direction="horizontal">
                                <van-radio :name="key" v-for="(item, key) in title" :key="key">{{item}}</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="username" name="姓名" :placeholder="`请输入${title[checked]}姓名`" />
                </van-cell-group>
                <div style="display:flex;margin-top:.3rem;padding:.3rem">
                    <van-button round block size="normal" native-type="submit" @click="show = false">
                        取消
                    </van-button>
                    <div style="width:.6rem"></div>
                    <van-button color="#4D77FF" round block type="primary" size="normal" native-type="submit"
                        @click="post">
                        修改
                    </van-button>
                </div>
            </van-form>
        </div>
    </van-popup>
</template>
<script>
export default {
    props:{
        title: Array
    },
    data(){
        return {
            checked: null,
            username: null,
        }
    },
    methods:{
        post(){}
    }
}
</script>