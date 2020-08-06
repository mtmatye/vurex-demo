<template>
    <div id="app">
        <a-input
            placeholder="请输入任务"
            class="my_ipt"
            :value="inputValue"
            @change="handleInputChange"
        />
        <a-button type="primary" @click="addItemToList">添加事项</a-button>

        <!-- <a-list bordered :dataSource="$store.state.list" class="dt_list"> -->
        <a-list bordered :dataSource="filteredList" class="dt_list">
            <a-list-item slot="renderItem" slot-scope="item">
                <!-- 复选框 -->
                <a-checkbox
                    :checked="item.done"
                    @click="cbClickHandler(item.id, $event)"
                >
                    {{ item.info }}
                </a-checkbox>
                <!-- 删除链接 -->
                <a slot="actions">删除</a>
            </a-list-item>

            <!-- footer区域 -->
            <div slot="footer" class="footer">
                <!-- 未完成的任务个数 -->
                <span>{{ unDoneCounts }}条剩余</span>
                <!-- 操作按钮 -->
                <a-button-group>
                    <a-button
                        :type="viewType === 'all' ? 'primary' : 'default'"
                        @click="changeViewType('all')"
                        >全部</a-button
                    >
                    <a-button
                        :type="viewType === 'undone' ? 'primary' : 'default'"
                        @click="changeViewType('undone')"
                        >未完成</a-button
                    >
                    <a-button
                        :type="viewType === 'done' ? 'primary' : 'default'"
                        @click="changeViewType('done')"
                        >已完成</a-button
                    >
                </a-button-group>
                <!-- 把已经完成的任务清空 -->
                <a @click.prevent="clearDone">清除已完成</a>
            </div>
        </a-list>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'app',
    data() {
        return {}
    },
    created() {
        this.$store.dispatch('getList')
    },
    computed: {
        ...mapState(['list', 'inputValue', 'nextId', 'viewType']),
        ...mapGetters(['unDoneCounts', 'filteredList'])
    },
    methods: {
        handleInputChange(e) {
            console.log(e.target.value)
            this.$store.commit('changeInputValue', e.target.value)
        },
        addItemToList() {
            if (this.inputValue.trim().length <= 0) {
                return this.$message.warning('输入不能为空！')
            } else {
                const item = {
                    done: false,
                    id: this.nextId,
                    info: this.inputValue.trim()
                }
                this.$store.commit('addItemToList', item)
                this.$store.commit('nextIdUp')
            }
        },
        cbClickHandler(id, e) {
            console.log(e.target.checked)
            this.$store.commit('changeChecked', {
                id: id,
                checked: e.target.checked
            })
        },
        clearDone() {
            this.$store.commit('clearDone')
        },
        changeViewType(type) {
            this.$store.commit('changeViewType', type)
        }
    }
}
</script>

<style scoped>
#app {
    padding: 10px;
}

.my_ipt {
    width: 500px;
    margin-right: 10px;
}

.dt_list {
    width: 500px;
    margin-top: 10px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
