//在Echarts.vue文件中
<template>
  <div class="Echarts3">
    <div id="main3" style="width: 80%;height: 709px;margin-left:10%" />
  </div>
</template>

<script>
import { getTopTenClickPost } from '@/api/post'

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
        { value: 3, name: 'rose 10' }
      ]
    }
  },
  created() {
    getTopTenClickPost().then(response => {
      this.count = 0
      for (let i = 0; i < 10; i++) {
        this.data[i].value = response[i].click
        this.data[i].name = response[i].title
        this.count += response[i].click
      }
      this.myEcharts3()
    })
  },
  mounted() {
  },
  methods: {
    myEcharts3() {
      var myChart3 = this.$echarts.init(document.getElementById('main3'))
      // 配置图表s
      var option3 = {
        title: {
          left: 'center',
          textStyle: { // 图例文字的样式
            color: '#000',
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
            color: '#000',
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
            center: ['50%', '55%'],
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
      myChart3.setOption(option3)
    }
  }
}
</script>

<style>

</style>
