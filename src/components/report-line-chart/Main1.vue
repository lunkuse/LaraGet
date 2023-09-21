<template>
{{this.labels}}
  <Chart
    type="line"
    :width="width"
    :height="height"
    :data="data"
    :options="options"
  />
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import axios from 'axios'

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.getGraphdetails()
  },
  mounted() {
    this.getGraphdetails()
  },
  methods: {
    // Getting All Loan Products
    getGraphdetails() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios
        .get('/loan-repayment-graph', {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
          this.graphdetails = res.data
          this.labels = this.graphdetails.labels
          // this.loading = false
          console.log('graph details', this.graphdetails)
          console.log('graph labels', this.graphdetails.labels)
        })
        .catch((err) => console.log(err))
    }
  },
  setup() {
    const store = useStore()
    const darkMode = computed(() => store.state.main.darkMode)
    const data = computed(() => {
      return {
        graphdetails: [],
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        datasets: [
          {
            label: 'PHP',
            data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
            // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            borderColor: '#3160D8',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          },
          {
            label: 'PHP',
            data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
            // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            borderDash: [2, 2],
            borderColor: '#a0afbf',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          }
        ]
      }
    })
    const options = computed(() => {
      return {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: '12',
                fontColor: darkMode.value ? '#718096' : '#777777'
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: '12',
                fontColor: darkMode.value ? '#718096' : '#777777',
                callback: function(value) {
                  return '$' + value
                }
              },
              gridLines: {
                color: darkMode.value ? '#718096' : '#D8D8D8',
                zeroLineColor: darkMode.value ? '#718096' : '#D8D8D8',
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: false
              }
            }
          ]
        }
      }
    })

    return {
      data,
      options
    }
  }
})
</script>
