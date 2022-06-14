<template>
    <div class="tabs">
        <!-- //tips:遍历生成tag  -->
        <el-tag
            v-for="(tag, index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
            size="small"

        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        //tips:通过mapMutations获取vuex的方法
        ...mapMutations({
            close: 'closeTag'
        }),
        //tips:点击tag执行url跳转
        changeMenu(item) {
            this.$router.push({ name: item.name })
        },
        handleClose(tag, index) {
            const length = this.tags.length - 1
            this.close(tag)
            //tips:关掉的不是当前显示的tag则 无事发生
            if (tag.name !== this.$route.name) {
                return;
            }
            //tips:关掉的tag是最右边的tag则 跳转至左边tag对应的页面
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            //tips:关掉的tag是中间的tag则 跳转至右边tag对应的页面
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>
