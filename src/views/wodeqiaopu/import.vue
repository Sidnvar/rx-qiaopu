<template>
    <div>
        <!-- <van-nav-bar title="侨谱录入" /> -->
        <div class="branch" ref="branch" id="branch">
            <div style="width: min-content;" v-if="data">

                <!-- 分支向上 长辈 -->
                <branch-up :data="data.Parent" :index="0" :sourceId="data.Id"></branch-up>

                <div class="relative">
                    <linkLine style="left: calc(50% - 8rem);" :set='[
                    [4.8, .6, 11.2, .6],
                    [4.8, 0, 4.8, .6],
                    [11.2, 0, 11.2, .6],
                    [8, .6, 8, 1.2]]'></linkLine>
                    <div class="box-flex center">
                        <!-- 分支向左 兄弟 -->
                        <branch-left :data="data.Brother" :sourceId="data.Id"></branch-left>

                        <!-- 本人 -->
                        <branch-item id="self" :name="data.Name" :title="['本人']" :titleIndex="0" customClass="self">
                        </branch-item>

                        <!-- 分支向右 配偶 -->
                        <branch-right :data="data.Spouse" :sourceId="data.Id"></branch-right>
                    </div>

                </div>
                <!-- 分支向下 儿孙 -->
                <branch-down :data="data.Children" :index="0" :parentSex="parentSex" :last="false" :spouse="data.Spouse"
                    :sourceId="data.Id"></branch-down>

            </div>

            <div style="position: fixed;bottom: 0;margin: 0.3rem;width:calc(100% - .6rem);">
                <van-button color="#4D77FF" round block type="primary" size="normal" native-type="submit" @click="post">
                    保存
                </van-button>
            </div>
        </div>
        <div class="progress" v-if="percentage < 100">
            <van-progress :percentage="percentage" />
        </div>


        <!-- <van-popup v-model="popupShow">
            <div style="width:90vw;margin:.6rem">
                <van-form>
                    <van-cell-group>
                        <van-field name="radio" label="">
                            <template #input>
                                <h2>检测“{{popupData.Name}}”与其它侨谱中有重名，是否将您的联系方式发送给相关人员进行确认进行关联</h2>
                            </template>
                        </van-field>

                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="formData.name" name="姓名" :placeholder="`如需要关联，请输入${popupData.Name}父亲姓名`" />
                    </van-cell-group>
                    <div style="display:flex;margin-top:.3rem;padding:.3rem">
                        <van-button round block size="normal" native-type="submit" @click="popupShow = false">
                            取消
                        </van-button>
                        <div style="width:.6rem"></div>
                        <van-button color="#4D77FF" round block type="primary" size="normal" native-type="submit"
                            @click="postLink">
                            关联
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-popup> -->
    </div>
</template>

<script>
    import {
        getData
    } from "@/api/mock"
    import {
        GetUserRelation,
        getToken,
        EditUserRelation,
        SendMessage
    } from "@/api/index"
    import {
        Dialog,
        Toast
    } from 'vant';
    import 'vant/es/dialog/style';
    import 'vant/es/toast/style';

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
                },
                centerId: 1,
                parentSex: 0,
                isChanging: false // 数据是否修改过
            }
        },
        async mounted() {
            await getToken();
            console.log(this.$route.query.returnUrl)
            this.getData(this.$route.query.id);

            Bus.$on('change', res => {
                const change = () => {
                    this.data = [];
                    this.$forceUpdate();
                    this.centerId = res.id;
                    this.getData(res.id);
                }
                if (this.isChanging) {
                    Dialog.confirm({
                            title: '警告',
                            message: `谱系图中有未保存的数据，切换【${res.name}】数据将丢失`,
                        })
                        .then(() => {
                            // on confirm
                            change();
                        })
                        .catch(() => {
                            // on cancel
                        });

                    return
                }

                change();
            })

            Bus.$on('treeChange', res => {
                this.isChanging = true;

                // do ajax
                this.setStyle();
            })

            Bus.$on('sameName', res => {
                Dialog.confirm({
                        title: '警告',
                        message: `检测“${res.data.Name}”与其它侨谱中有重名，是否将您的联系方式发送给相关人员进行确认进行关联`,
                    })
                    .then(() => {
                        // on confirm
                        // change();
                        SendMessage({
                            sendToUserNo: res.sendToUserNo
                        }).then(res => {
                            Toast('发送成功')
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });

                // this.theSameName();
            })

            Bus.$on('save', res => {
                this.post('auto');
            })
        },
        methods: {
            post(type) {
                EditUserRelation([this.data]).then(res => {
                    this.isChanging = false;

                    if (res.Code == 200) {
                        Toast('添加成功');

                        if(!type){
                            setTimeout(() => {
                                location.href = this.$route.query.returnUrl;
                            }, 3000)
                        }
           
                    }

                    // this.getData(this.centerId)
                    // console.log(res)
                })
            },
            postLink() {},
            theSameName(data) {
                this.popupData = data;
                this.popupShow = true;
            },
            setPercentage(max) {
                setTimeout(() => {
                    this.percentage++
                    if (max == this.percentage) {
                        return
                    }

                    this.setPercentage(max);
                }, 10)
            },
            getData(id = 1) {
                this.percentage = 0;
                GetUserRelation({
                    userId: id
                }).then(res => {
                    this.setPercentage(70);
                    this.data = res.Data[0];
                    this.parentSex = this.data.Sex == '男' ? 0 : 1;
                    // console.log(this.parentSex)
                    // this.initZoom();

                    setTimeout(() => {
                        this.setStyle();
                        this.setCenter();
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
                this.setPercentage(100);
            },
            setCenter() {
                // this.$refs.branch.$el;
                // console.log(this.$refs.branch)
                const main = document.getElementById('branch');
                const self = document.getElementsByClassName('self')[0];
                const width = document.body.clientWidth;
                const height = document.body.clientHeight;
                main.scrollLeft = self.offsetLeft - width / 2.3
                main.scrollTop = self.offsetTop + height / 1.7
            }
        }
    }
</script>

<style lang="less">
    .progress {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: white;
        padding-top: 45vh;
    }

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

    .branch {
        transform-origin: 0 0;
        overflow: scroll;
        height: calc(100vh - 1.22667rem);
        width: 100%;
        padding-bottom: 2rem;
        padding-top: 2rem;
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