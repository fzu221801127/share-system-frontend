//在Echarts.vue文件中
<template>
  <div class="Echarts">
    <div id="main" style="width: 100%;height: 400px" />
  </div>
</template>

<script>
import { getShearchCountInThisMonth, getTenHotShearchInThisMonth } from '@/api/searchCount'

export default {
  name: 'Echarts',
  data() {
    return {
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
      ],
      count: 0
    }
  },
  created() {
  },
  mounted() {
    getTenHotShearchInThisMonth().then(response => {
      this.count = 0
      for (let i = 0; i < 10; i++) {
        this.data[i].value = response[i].count
        this.data[i].name = response[i].content
        this.count += response[i].count
      }
      getShearchCountInThisMonth().then(response => {
        this.data[10].value = response - this.count
        this.data[10].name = '其他'
        this.myEcharts()
      })
    })
  },
  methods: {
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById('main'))
      // 配置图表s
      var option = {
        legend: {
          top: 'bottom',
          textStyle: { // 图例文字的样式
            color: 'black',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        series: [
          {
            name: '本月热搜',
            label: {
              fontSize: 12,
              color: 'black'
            },
            type: 'pie',
            radius: [25, 125],
            center: ['50%', '40%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: this.data
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>
