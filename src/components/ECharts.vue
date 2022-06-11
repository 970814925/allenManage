<template>
<!-- //tips:2.准备容器 -->
  <div ref="echart"></div>
</template>
<script>
//tips:1.引入echarts
import * as echarts from 'echarts'
export default {
    props: {
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default() {
                return {
                    xData: [],
                    series: []
                }
            }
        }
    },
    watch: {
        chartData: {
            handler: function () {
                this.initChart()
            },
            //tips:首次触发watch
            deep: true
        },
        
    },
    methods: {
        initChart() {
            this.initChartData()
            if (this.echart) {
                this.options.title={text:'haha'}
                this.echart.setOption(this.options)
            } else {
                //tips:3.初始化echarts对象
                this.echart = echarts.init(this.$refs.echart)
                //tips:5.将配置项交给echarts生成表格
                this.echart.setOption(this.options)
            }
        },
        initChartData() {
            if (this.isAxisChart) {
                //tips:4.准备图标的数据 若为折线图柱状图则有xAxis和series的数据 若为饼图则只有series的数据
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            } else {
                console.log(this.chartData.series)
                this.normalOption.series = this.chartData.series
            }
        }
    },
    data() {
        return {
            axisOption: {
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
                grid: {
                left: "20%",
                },
                // 提示框
                tooltip: {
                trigger: "axis",
                },
                xAxis: {
                type: "category", // 类目轴
                data: [],
                axisLine: {
                    lineStyle: {
                    color: "#17b3a3",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
                },
                yAxis: [
                {
                    type: "value",
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
            },
            normalOption: {
            tooltip: {
                trigger: "item",
            },
            color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
            ],
            series: [],
            },
            echart: null
        }
    },
    computed: {
       options () {
           return this.isAxisChart ? this.axisOption : this.normalOption
       } 
    }
}
</script>
