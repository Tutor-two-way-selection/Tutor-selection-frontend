<template>
  <div style="max-width:100vw">
    <!-- {{screenWidth}}<br>
    {{stuList}}<br>
    {{tableList}} -->
    <el-table :data="stuList" :row-class-name="tableRowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div label="" v-for="(item,index) in tableList" :key="'table'+index">
            <el-table :data="props.row[item.name].fileList" style="width: 100%">
              <el-table-column :label="item.title||item.name">
                <template slot-scope="scope">
                  <i class="el-icon-document"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="scope">
                  <div class="flex-container">
                    <div style="margin-left:5%">
                      <el-button type="success" size="mini" @click="preview(scope.row.url)">预览</el-button>
                    </div>
                    <div style="margin-left:5%">
                      <a :href="scope.row.url">
                        <el-button type="primary" size="mini">下载</el-button>
                      </a>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学生ID" prop="stuNum" v-if="screenWidth>600">
      </el-table-column>
      <el-table-column label="学生姓名" prop="stuName">
      </el-table-column>
      <el-table-column label="" min-width="200px">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.recept" active-color="#13ce66" inactive-color="#ff4949" active-text="接收" inactive-text="不接收">
          </el-switch>
        </template>
      </el-table-column>

    </el-table>
    <el-button type="primary" style="margin-top:15px" @click="onSubmit">提交</el-button>

    <ViewFile ref="childItem"></ViewFile>
  </div>
</template>
<script>
import Vue from 'vue'
import ViewFile from '../../components/ViewFile'
export default {
  components: {
    ViewFile
  },
  data () {
    return {
      tutorType: 'regular',
      // tutorType: this.$route.query.tutorType,
      stuList: [],
      tableList: [],
      screenWidth: document.body.clientWidth
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.axios.post('/teacher/stuinfo', { teaID: this.$store.state.teacher.teaId, type: this.tutorType }).then(res => {
        this.stuList = res.data.stuList
        this.tableList = res.data.tableList
        for (let index in this.stuList) {
          Vue.set(this.stuList[index], 'recept', false)
        }
      })
    },
    preview (fileUrl) {
      this.$refs.childItem.preview(fileUrl)
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.recept === true) {
        return 'success-row'
      } else {
        return 'warning-row'
      }
    },
    onSubmit () {
      let tempList = []
      for (let i in this.stuList) {
        tempList.push({
          stuID: this.stuList[i].stuNum,
          recept: this.stuList[i].recept
        })
      }
      this.axios.post('/teacher/selectstu', {
        teaID: this.$store.state.teacher.teaId,
        type: this.tutorType,
        selStuList: tempList
      }).then(res => {
        this.init()
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交失败:' + res.data.err
          })
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    }
  }
}
</script>
<style lang="scss" >
  .flex-container {
    display: flex;
    justify-content: center;
  }
  .el-table .warning-row {
    // background: oldlace;
    background: #f56c6c4d;
  }

  .el-table .success-row {
    // background: #f0f9eb;
    background: #cef9b6;
  }
</style>
