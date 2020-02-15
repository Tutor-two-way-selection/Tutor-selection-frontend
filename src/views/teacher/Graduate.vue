<template>
  <div>
    {{tutorType}}
    <el-table :data="stuList" style="width: 100%" :row-class-name="tableRowClassName">
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
      <el-table-column label="学生ID" prop="id">
      </el-table-column>
      <el-table-column label="学生姓名" prop="name">
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.recept" active-color="#13ce66" inactive-color="#ff4949" active-text="接收" inactive-text="不接收">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" style="margin-top:15px" @click="onSubmit">提交</el-button>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      tutorType: 'graduate',
      // tutorType: this.$route.query.tutorType,
      stuList: [],
      tableList: []
    }
  },
  created () {
    this.axios.post('/teacher/stuinfo', { teaID: this.$store.state.teacher.teaId, type: this.tutorType }).then(res => {
      this.stuList = res.data.stuList
      this.tableList = res.data.tableList
      for (let index in this.stuList) {
        Vue.set(this.stuList[index], 'recept', false)
      }
    })
  },
  methods: {
    preview (fileUrl) {
      window.open('http://view.officeapps.live.com/op/view.aspx?src=' + fileUrl)
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
          stuID: this.stuList[i].id,
          recept: this.stuList[i].recept
        })
      }
      this.axios.post('/teacher/selectstu', {
        teaID: this.$store.state.teacher.teaId,
        type: this.tutorType,
        selStuList: tempList
      }).then(res => {
        if (res.data.success) {
          console.log('提交成功')
        } else {
          console.log('提交失败')
        }
      }).catch(err => {
        console.log(err)
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
