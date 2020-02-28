<template>
  <div>
    <el-select v-model="tutorType" placeholder="请选择">
      <el-option label="regular" value="regular">
      </el-option>
      <el-option label="graduate" value="graduate">
      </el-option>
    </el-select>
    <br>
    <el-date-picker v-model="pubDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="" @click="changeDate">保存修改</el-button>
    <el-button type="" @click="init">重置</el-button>
    <h3>名单确认</h3>
    <el-table :data="stuList" :row-class-name="tableRowClassName">
      <el-table-column prop="stuName" label="姓名">
      </el-table-column>
      <el-table-column prop="stuID" label="学号">
      </el-table-column>
      <el-table-column prop="classes" label="班级">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="teaName" label="导师">
      </el-table-column>
      <el-table-column prop="teaNum" label="导师编号">
      </el-table-column>
    </el-table>
    <el-button type="" @click="endPub" v-if="endPubFlag">公示结束</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tutorType: 'regular',
      stuList: [],
      pubDate: [],
      batch: 5
    }
  },
  methods: {
    endPub () {
      this.axios.post('/admin/setbatch', { grade: this.$store.state.admin.currentGrade, type: this.tutorType, batch: 5 }).then(res => {
        if (res.data.success) {
          console.log('公示结束')
          this.init()
          this.$store.commit('FlashBatch')
        }
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (!row.teaName) {
        return 'warning-row'
      }
      return ''
    },
    init () {
      this.axios.post('/admin/querypub', { grade: this.$store.state.admin.currentGrade, type: this.tutorType }).then(res => {
        this.pubDate = []
        this.pubDate.push(new Date(res.data.start))
        this.pubDate.push(new Date(res.data.end))

        // 测试
        if (this.tutorType === 'graduate') {
          this.pubDate = []
          this.pubDate.push(new Date('2020-06-03T16:00:00.000Z'))
          this.pubDate.push(new Date('2020-07-04T16:00:00.000Z'))
        }
      })

      this.axios.post('/admin/final', { grade: this.$store.state.admin.currentGrade, type: this.tutorType }).then(res => {
        this.stuList = res.data.stuList
      })
    },
    changeDate () {
      console.log(this.pubDate)
    }
  },
  created () {
    this.init()
  },
  watch: {
    tutorType: {
      handler: function (val, oldval) {
        this.init()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  computed: {
    endPubFlag () {
      if (this.$store.state.admin.currentBatch[this.tutorType] === 5) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
