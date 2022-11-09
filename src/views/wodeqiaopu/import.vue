<template>
    <div>
        <van-nav-bar title="侨谱录入" />
        <!-- <div class="progress" v-show="percentage != 100">
            <van-progress class="progress-bar" :percentage="percentage" />
        </div> -->
        <div class="branch" ref="branch">
            <div style="width: min-content;" v-if="data">

                <!-- 分支向上 长辈 -->
                <branch-up :data="data.parent" :index="0"></branch-up>

                <div class="relative">
                    <linkLine style="left: calc(50% - 8rem);" :set='[
                    [4.8, .6, 11.2, .6],
                    [4.8, 0, 4.8, .6],
                    [11.2, 0, 11.2, .6],
                    [8, .6, 8, 1.2]]'></linkLine>
                    <div class="box-flex center">
                        <!-- 分支向左 兄弟 -->
                        <branch-left :data="data.brother"></branch-left>

                        <!-- 本人 -->
                        <branch-item :name="data.name" title="本人" customClass="self"></branch-item>

                        <!-- 分支向右 配偶 -->
                        <branch-right :data="data.spouse"></branch-right>
                    </div>

                </div>

                <!-- 分支向下 儿孙 -->
                <branch-down :data="data.children" :index="0"></branch-down>

            </div>

            <div style="position: fixed;bottom: 0;margin: 0.3rem;width:calc(100% - .6rem);">
                <van-button color="#4D77FF" round block type="primary" size="normal" native-type="submit" @click="post">
                    保存
                </van-button>
            </div>
        </div>

        <van-popup v-model="popupShow">
            <div style="width:90vw;margin:.6rem">
                <van-form>
                    <van-cell-group>
                        <van-field name="radio" label="">
                            <template #input>
                                <h2>检测“{{popupData.name}}”与其它侨谱中有重名，是否关联？</h2>
                            </template>
                        </van-field>

                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="formData.name" name="姓名" :placeholder="`请输入${popupData.name}的父亲的姓名`" />
                    </van-cell-group>
                    <div style="display:flex;margin-top:.3rem;padding:.3rem">
                        <van-button round block size="normal" native-type="submit" @click="popupShow = false">
                            取消
                        </van-button>
                        <div style="width:.6rem"></div>
                        <van-button color="#4D77FF" round block type="primary" size="normal" native-type="submit"
                            @click="post">
                            提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {
        getData
    } from "@/api/mock"
    import branchItem from "@/components/branch/item";
    import branchUp from "@/components/branch/up";
    import branchDown from "@/components/branch/down";
    import branchLeft from "@/components/branch/left";
    import branchRight from "@/components/branch/right";
    import linkLine from "@/components/branch/linkLine";
    import Bus from "@/lib/bus.js"
    export default {
        components: {
            branchItem,
            branchUp,
            branchDown,
            branchLeft,
            branchRight,
            linkLine
        },
        data() {
            return {
                data: null,
                percentage: 0,
                popupShow: false,
                popupData: {
                    name: null
                },
                formData: {
                    name: ''
                }
            }
        },
        mounted() {
            this.getData();

            Bus.$on('change', res => {
                this.getData();
            })

            Bus.$on('treeChange', res => {
                // do ajax

                console.log(this.data)

                setTimeout(() => {
                    this.setStyle();

                    // 如果重名
                    this.theSameName(res);
                }, 500)
            })

        },
        methods: {
            post() {},
            progressRandom() {

            },
            theSameName(data) {
                this.popupData = data;
                this.popupShow = true;
            },
            getData() {
                this.percentage = 0;
                getData().then(res => {
                    this.percentage = 70;
                    this.data = res;
                    // this.initZoom();

                    setTimeout(() => {
                        this.setStyle();
                    }, 500)
                });
            },
            setStyle() {


                const up = document.getElementById('branch-up')
                const left = document.getElementById('branch-left')
                const right = document.getElementById('branch-right')
                const down = document.getElementById('branch-down')
                const fontSize = Number(document.getElementsByTagName('html')[0].style.fontSize.replace(
                    'px', ''))
                const arr = [up.offsetWidth / 2, left.offsetWidth, right.offsetWidth, down.offsetWidth]
                const max = Math.max(...arr);


                up.style.width = max * 2 + fontSize * 3.2 + 'px'
                left.style.width = max + 'px'
                right.style.width = max + 'px'
                down.style.width = max + fontSize * 3.2 + 'px'

                this.percentage = 100;


            }
        }
    }
</script>

<style lang="less">
    .link {
        height: 1.2rem;
        margin-top: -.6rem;
        position: absolute;
    }

    .vertical_r {
        position: absolute;
        // width: 1.2rem;
        right: 0;
        top: 0rem;
        height: 0.6rem;
        transform: scale(-1, 1);
    }

    .vertical_l {
        position: absolute;
        width: 1.2rem;
        left: -0.6rem;
        top: 0.6rem;
    }

    .relative {
        position: relative;
    }

    .box-flex {
        display: flex;

        &.center {
            justify-content: center;
        }
    }

    .branch,
    .progress {
        transform-origin: 0 0;
        overflow: scroll;
        height: calc(100vh - 1.22667rem);
        width: 100%;
        padding-bottom: 2rem;
    }

    .progress-bar {
        margin: 1rem;
        margin-top: 50%;
    }

    .box {
        margin: .6rem;
        display: flex;
        justify-content: center;

        &.default {
            .name {
                background: #FFFFFF;
                color: #343746;
                font-weight: 500;
            }

            .title {
                background: #343746;
                color: #F8F8F8;
                font-weight: 500;
            }
        }

        &.self {

            .name,
            .title {
                background: #E6686B;
            }
        }

        .name {
            width: 2rem;
            height: 2rem;
            background: #4D77FF;
            border-radius: .2rem;
            line-height: 2rem;
            text-align: center;
            font-size: .38rem;
            font-weight: bold;
            position: relative;
            color: #FFFFFF;

            .change {
                position: absolute;
                left: 0;
                bottom: 0rem;
                width: .65rem;
                height: .65rem;
            }
        }

        .title {
            margin-top: .2rem;
            width: 2rem;
            height: .65rem;
            line-height: .65rem;
            text-align: center;
            color: #FFFFFF;
            background: #4D77FF;
            border-radius: .16rem;
        }
    }
</style>