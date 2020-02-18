<template>
  <div>
    <el-select v-model="tutorType" placeholder="请选择">
      <el-option label="regular" value="regular">
      </el-option>
      <el-option label="graduate" value="graduate">
      </el-option>
    </el-select>
    <el-table :data="stuList" style="width: 100%">
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
      <el-table-column label="志愿一" prop="firstChoice.name">
        <template slot-scope="scope">
          {{scope.row.firstChoice.name}}
          <el-tag size="medium" effect="light" type="success" v-if="scope.row.firstChoice.accept">已接收</el-tag>
          <el-tag size="medium" effect="light" type="warning" v-if="!scope.row.firstChoice.accept">未接收</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="志愿二" prop="">
        <template slot-scope="scope">
          {{scope.row.secondChoice.name}}
          <el-tag size="medium" effect="light" type="success" v-if="scope.row.secondChoice.accept">已接收</el-tag>
          <el-tag size="medium" effect="light" type="warning" v-if="!scope.row.secondChoice.accept">未接收</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import Vue from 'vue'
export default {
  data () {
    return {
      tutorType: 'regular',
      // tutorType: this.$route.query.tutorType,
      stuList: [],
      tableList: []
    }
  },
  watch: {
    tutorType: {
      handler: function (val, oldval) {
        this.axios.post('/admin/stulist', { admNum: this.$store.state.admin.admId, type: val }).then(res => {
          console.log('now:', val, '!!!!!!!!!!!!!!!!!!!')
          this.stuList = res.data.stuList
          this.tableList = res.data.tableList
          if (val === 'graduate') {
            this.stuList.push({
              name: '赵十一',
              id: '201701010101',
              classes: 'qwerty',
              contact: 'zxcvb',
              firstChoice: {
                id: '199901010101',
                name: '王五',
                accept: false
              },
              secondChoice: {
                id: '199901010102',
                name: '赵六',
                accept: true
              },
              profileTable: {
                flag: true,
                fileList: [{
                  name: '计算机学院本科学生导师选择学生个人简介表 (1).DOC',
                  url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E5%9B%9B%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E9%80%89%E6%8B%A9%E5%AD%A6%E7%94%9F%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B%E8%A1%A8%20(1).DOC',
                  status: 'success',
                  size: 1141
                }]
              },
              choiceTable: {
                flag: true,
                fileList: [{
                  name: '计算机学院本科学生导师双向选择表 (1).docx',
                  url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E5%8F%8C%E5%90%91%E9%80%89%E6%8B%A9%E8%A1%A8%20(1).docx'
                }]
              }
            })
          }
        })
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  created () {
    this.axios.post('/admin/stulist', { admNum: this.$store.state.admin.admId, type: this.tutorType }).then(res => {
      this.stuList = res.data.stuList
      this.tableList = res.data.tableList
      // for (let index in this.stuList) {
      //   Vue.set(this.stuList[index], 'recept', false)
      // }
    })
  },
  methods: {
    preview (fileUrl) {
      window.open('http://view.officeapps.live.com/op/view.aspx?src=' + fileUrl)
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
</style>
