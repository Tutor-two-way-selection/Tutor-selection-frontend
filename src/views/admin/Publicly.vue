<template>
  <div>
    <el-row :gutter="20" type="flex" justify="space-between" align="center">
      <el-col :span="9">
        <div class="Head">
          <h2>公示与名单确认</h2>
          <el-select v-model="tutorType" placeholder="请选择" style="margin-bottom:10px">
            <el-option label="regular" value="regular">
            </el-option>
            <el-option label="graduate" value="graduate">
            </el-option>
          </el-select>
          <hr>
        </div>
      </el-col>
      <el-col :span="15">
        <el-row :gutter="20" type="flex" justify="center" align="center">
          <el-date-picker v-model="pubDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <el-button type="" @click="changeDate" style="margin-left:10px">保存修改</el-button>
          <el-button type="" @click="init" style="margin-left:10px">重置</el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-table :data="stuList" :row-class-name="tableRowClassName">
      <el-table-column prop="stuName" label="姓名">
      </el-table-column>
      <el-table-column prop="stuNum" label="学号">
      </el-table-column>
      <el-table-column prop="stuClass" label="班级">
      </el-table-column>
      <el-table-column prop="stuTelephone" label="联系方式">
      </el-table-column>
      <el-table-column prop="name" label="导师">
      </el-table-column>
      <el-table-column prop="id" label="导师编号">
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
        console.log(res)
        if (res.data.success) {
          console.log('公示结束')
          this.init()
          this.$store.commit('FlashBatch')
        }
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (!row.name) {
        return 'warning-row'
      }
      return ''
    },
    init () {
      this.axios.post('/admin/querypub', { grade: this.$store.state.admin.currentGrade, type: this.tutorType }).then(res => {
        this.pubDate = []
        this.pubDate.push(new Date(res.data.start))
        this.pubDate.push(new Date(res.data.end))
      })

      this.axios.post('/admin/final', { grade: this.$store.state.admin.currentGrade, type: this.tutorType }).then(res => {
        this.stuList = res.data.stuList
      })
    },
    changeDate () {
      console.log(this.pubDate)
      this.axios.post('/admin/setpub', { grade: this.$store.state.admin.currentGrade,
        type: this.tutorType,
        start: this.pubDate[0],
        end: this.pubDate[1] }).then(res => {
        this.init()
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '修改失败:' + res.data.err
          })
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
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
<style lang="scss" scoped>
  .Head {
    hr {
      width: 100%;
    }
  }
</style>
