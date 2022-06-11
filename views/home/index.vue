<template>
    <el-row class="home" :gutter="20">
    <!-- //tips:gutter表示栅格间隔 越大两个el-row的间隔越大 span表示列的宽度一共24份-->
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 460px;">
                <!-- //tips:table表格 数据源就是tableData 遍历生成el-table-column 遍历数组时：val是数组的每一项， key表示下标 
                遍历对象时 val表示值 key 表示键 index表示下标 -->
                <el-table :data="tableData">
                    <el-table-column
                    v-for="(val, key) in tableLabel"
                    :key="key"
                    :prop="key"
                    :label="val"
                    >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
         <!-- //tips: style直接写样式-->
        <el-col style="margin-top: 20px" :span="16">
            <div class="num">
                <!-- //tips: :body-style为 el-card内添加样式 传入内容为对象-->
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <!-- //tips:通过:class动态绑定class   也可以通过isActive的true false控制class是否为active   例如    :class="{ 'active': isActive }
                     通过   ：style 动态控制样式-->
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px">
                <!-- <div style="height: 280px" ref="echarts"></div> -->
                <echart :chartData="echartData.order" style="height: 280px" />
            </el-card>
            <div class="graph">
                <el-card style="height: 260px">
                    <!-- <div style="height: 240px" ref="userEcharts"></div> -->
                    <echart :chartData="echartData.user" style="height: 240px" />
                </el-card>
                <el-card style="height: 260px">
                    <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
                    <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" />
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../../api/data.js'
// import * as echarts from 'echarts'
import Echart from '../../src/components/ECharts.vue'

export default {
    name: 'home',
    components: {
        Echart
    },
    data () {
        return {
            userImg: require('../../src/assets/images/user.png'),
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ],
            echartData: {
                order: {
                    xData: [],
                    series: []
                },
                user: {
                    xData: [],
                    series: []
                },
                video: {
                    series: []
                }
            }
        }
    },
    mounted() {
        getData().then(res => {
            const { code, data } = res.data
            if (code === 20000) {
                console.log(data)
                this.tableData = data.tableData
                const order = data.orderData
                const xData = order.date
                //tips:Object.values将对象的值以数组形式返回  Object.entries返回一个数组，成员是参数对象自身的键值对数组 Object.keys将对象的键以数组形式返回
                console.log(Object.values(order.data[0]),111111)
                console.log(Object.entries(order.data[0]),11111122222222)

                const keyArray =  Object.keys(order.data[0])
                const series = []
                console.log(order.data[0])
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                //tips:map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })
                //tips:xData对应 echarts中xAxis对象中的data属性 表示横坐标  ，
                // 例如：
                // xAxis: {
                //     type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],   // x轴数据
                //     name: '日期',   // x轴名称
                //     },

                //series是一个数组，里面的name与 xAxis对象中的data属性要一一对应
                //里面的type视需要展示的图类型而定 如bar为柱状图 pie为饼图 ， 里面的data 
                //例如：
                //series: [
                //   {
                //     name: '招商银行',
                //     data: [820, 932, 901, 934, 1290, 1330, 1320],  这些都是招商银行的数据
                //     type: 'line'                                   line表示折线图
                //   },
                //   {
                //     name: '浦发银行',
                //     data: [620, 711, 823, 934, 1445, 1456, 1178],
                //     type: 'line'
                //   } ]

                this.echartData.order.xData = xData
                this.echartData.order.series = series

                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series = [
                    
                    {
                        name: '新增用户',
                        data: data.userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: data.userData.map(item => item.active),
                        type: 'bar'
                    }
                ]

                this.echartData.video.series =  [
                    {
                        data: data.videoData,
                        type: 'pie'
                    }
                ]
            }
            
        })
    }
}
</script>
