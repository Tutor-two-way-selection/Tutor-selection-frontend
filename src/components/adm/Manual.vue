<template>
  <div>
    <!-- Manual
    <hr>
    {{tutorType}}
    <hr>
    {{stuList}}
    <hr>
    {{addList}} -->
    <el-table :data="stuList">
      <el-table-column prop="stuID" label="学号">
      </el-table-column>
      <el-table-column prop="stuName" label="姓名">
      </el-table-column>
      <el-table-column prop="classes" label="班级">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showList(scope.row.stuID)">手动分配</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="teaName" label="分配教师">
      </el-table-column>
    </el-table>
    <el-button type="primary" size="medium" @click="submit" :disabled="!(this.$store.state.admin.currentBatch[tutorType] === 3)">提交</el-button>
    <!-- dialog -->
    <el-dialog title="导师选择" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">
      <span>学号</span>
      <span>{{dialogData.stuID}}</span>
      <el-table :data="tutorList" height="65vh">
        <el-table-column prop="name" label="姓名" fixed>
        </el-table-column>
        <el-table-column prop="department" label="所在部门/研究所">
        </el-table-column>
        <el-table-column prop="search" label="研究方向">
        </el-table-column>
        <el-table-column prop="contact" label="联系方式">
        </el-table-column>
        <el-table-column prop="accNum" label="已接收学生" sortable :sort-method="numSortMethod">
          <template slot-scope="scope">
            {{scope.row.accNum}}
            <span v-if="addList[scope.row.id]" class="addnum">+{{addList[scope.row.id]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="allocate(scope.row.id,dialogData.stuID)">选择</el-button>
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
        stuID: null
      }
    }
  },
  methods: {
    submit () {
      let req = {
        admNum: this.$store.state.admin.admId,
        type: this.tutorType,
        manualList: []
      }
      for (let i in this.stuList) {
        if (this.stuList[i].teaID) {
          req.manualList.push({
            stuID: this.stuList[i].stuID,
            teaID: this.stuList[i].teaID })
        }
      }
      this.axios.post('/admin/manual', req).then(res => {
        if (res.data.success) {
          console.log('提交成功')
          this.init()
        } else {
          // 服务器错误
        }
      }).catch(err => {
        console.log(err)
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
      let numa = a.accNum + (this.addList[a.id] || 0)
      let numb = b.accNum + (this.addList[b.id] || 0)
      return numa - numb
    },
    allocate (teaId, stuId) {
      for (let i in this.stuList) {
        if (this.stuList[i].stuID === stuId) {
          Vue.set(this.stuList[i], 'teaID', teaId)
          for (let j in this.tutorList) {
            if (this.tutorList[j].id === teaId) {
              Vue.set(this.stuList[i], 'teaName', this.tutorList[j].name)
            }
          }
        }
      }
    },
    showList (stuID) {
      this.dialogData.stuID = stuID
      this.dialogVisible = true
    },
    init () {
      this.axios.post('/allteacher', { type: 'regular' }).then(res => {
        this.tutorList = res.data.tutorList
      })
      this.axios.post('/admin/undistri', { admNum: this.$store.state.admin.admId, type: this.tutorType }).then(res => {
        this.stuList = res.data.stuList
        // 测试
        if (this.tutorType === 'graduate') {
          this.stuList.push({
            stuID: '201701010120',
            stuName: '李五',
            classes: 'class2'
          })
        }
        // ///////////////////////
      })
    }
  },
  computed: mapState({
    tutorType (state) {
      return this.type
    },
    listener () {
      return { admNum: this.$store.state.admin.admId, type: this.tutorType }
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
