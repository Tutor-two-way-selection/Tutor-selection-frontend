<template>
  <div>
    <!-- Manual
    <hr>
    {{tutorType}}
    <hr>
    {{stuList}}
    <hr>
    {{addList}} -->
    <!-- {{stuList}}<br>
    {{tutorList}} -->
    <el-table :data="stuList">
      <el-table-column prop="stuNum" label="学号">
      </el-table-column>
      <el-table-column prop="stuName" label="姓名">
      </el-table-column>
      <el-table-column prop="stuClass" label="班级">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showList(scope.row.stuNum)">手动分配</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="teaName" label="分配教师">
      </el-table-column>
    </el-table>
    <el-button type="primary" size="medium" @click="submit" :disabled="!(this.$store.state.admin.currentBatch[tutorType] === 3)">提交</el-button>
    <!-- dialog -->
    <el-dialog title="导师选择" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">
      <span>学号</span>
      <span>{{dialogData.stuNum}}</span>
      <el-table :data="tutorList" height="65vh">
        <el-table-column prop="name" label="姓名" fixed>
        </el-table-column>
        <el-table-column prop="department" label="所在部门/研究所">
        </el-table-column>
        <el-table-column prop="search" label="研究方向">
        </el-table-column>
        <el-table-column prop="contact" label="联系方式">
        </el-table-column>
        <el-table-column :prop="tutorType+'num'" label="已接收学生" sortable :sort-method="numSortMethod">
          <template slot-scope="scope">
            {{scope.row[tutorType+'num']}}
            <span v-if="addList[scope.row.id]" class="addnum">+{{addList[scope.row.id]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="allocate(scope.row.id,dialogData.stuNum)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  data () {
    return {
      stuList: null,
      tutorList: null,
      addList: {},
      dialogVisible: false,
      dialogData: {
        stuNum: null
      }
    }
  },
  methods: {
    submit () {
      let req = {
        grade: this.$store.state.admin.currentGrade,
        type: this.tutorType,
        manualList: []
      }
      for (let i in this.stuList) {
        if (this.stuList[i].teaID) {
          req.manualList.push({
            stuID: this.stuList[i].stuNum,
            teaID: this.stuList[i].teaID })
        }
      }
      this.$confirm('将手动为学生分配导师,此操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(req)
        this.axios.post('/admin/manual', req).then(res => {
          console.log(res)
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.init()
          } else {
            this.$message({
              type: 'error',
              message: '分配失败:' + res.data.err
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分配'
        })
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    numSortMethod (a, b) {
      let numa = a[this.tutorType + 'num'] + (this.addList[a.id] || 0)
      let numb = b[this.tutorType + 'num'] + (this.addList[b.id] || 0)
      return numa - numb
    },
    allocate (teaId, stuId) {
      for (let i in this.stuList) {
        if (this.stuList[i].stuNum === stuId) {
          Vue.set(this.stuList[i], 'teaID', teaId)
          for (let j in this.tutorList) {
            if (this.tutorList[j].id === teaId) {
              Vue.set(this.stuList[i], 'teaName', this.tutorList[j].name)
            }
          }
        }
      }
    },
    showList (stuNum) {
      this.dialogData.stuNum = stuNum
      this.dialogVisible = true
    },
    init () {
      this.axios.post('/student/allteacher', { type: 'regular' }).then(res => {
        this.tutorList = res.data.tutorList
      })
      this.axios.post('/admin/undistri', { grade: this.$store.state.admin.currentGrade, type: this.tutorType }).then(res => {
        this.stuList = res.data.stuList
      })
    }
  },
  computed: mapState({
    tutorType (state) {
      return this.type
    },
    listener () {
      return { grade: this.$store.state.admin.currentGrade, type: this.tutorType }
    }
  }),
  watch: {
    listener: {
      handler: function (val, oldval) {
        this.init()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    },
    stuList: {
      handler: function (val, oldval) {
        this.addList = {}
        for (let i in this.stuList) {
          if (this.stuList[i].teaID) {
            if (this.addList[this.stuList[i].teaID]) {
              this.addList[this.stuList[i].teaID] = this.addList[this.stuList[i].teaID] + 1
            } else {
              Vue.set(this.addList, this.stuList[i].teaID, 1)
            }
          }
        }
        console.log(this.addList)
      },
      deep: true
    }
  },
  props: ['type'],
  created () {
    this.init()
  }
}
</script>
<style lang="scss" >
  .addnum {
    color: #409eff;
  }
</style>
