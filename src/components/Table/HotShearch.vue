//在Echarts.vue文件中
<template>
  <div class="Echarts2">
    <div id="main2" style="width: 50%%;height: 400px;margin-left:10%" />
  </div>
</template>

<script>
import { getShearchCount, getTenHotShearch } from '@/api/searchCount'

export default {
  name: 'Echarts',
  data() {
    return {
      count: 0,
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 14, name: 'rose 8' },
        { value: 7, name: 'rose 9' },
        { value: 3, name: 'rose 10' },
        { value: 6, name: 'rose 11' }
      ]
    }
  },
  created() {
    getTenHotShearch().then(response => {
      this.count = 0
      for (let i = 0; i < 10; i++) {
        this.data[i].value = response[i].count
        this.data[i].name = response[i].content
        this.count += response[i].count
      }
      getShearchCount().then(response => {
        this.data[10].value = response - this.count
        this.data[10].name = '其他'
        this.myEcharts2()
      })
    })
  },
  mounted() {
  },
  methods: {
    myEcharts2() {
      var myChart2 = this.$echarts.init(document.getElementById('main2'))
      // 配置图表s
      var option2 = {
        title: {
          text: '历史搜索总榜',
          subtext: '(统计范围：所有)',
          left: 'center',
          textStyle: { // 图例文字的样式
            color: 'black',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: { // 图例文字的样式
            color: 'black',
            fontSize: 12
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.data,
            label: {
              fontSize: 12,
              color: 'black'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart2.setOption(option2)
    }
  }
}
</script>

<style>

</style>
