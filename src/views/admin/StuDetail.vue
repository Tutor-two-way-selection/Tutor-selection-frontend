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
          <el-tag size="medium" effect="light" type="warning" v-if="(!scope.row.firstChoice.accept)&&scope.row.firstChoice.id">未接收</el-tag>
          <el-tag size="medium" effect="light" type="info" v-if="!scope.row.firstChoice.id">未填报</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="志愿二" prop="">
        <template slot-scope="scope">
          {{scope.row.secondChoice.name}}
          <el-tag size="medium" effect="light" type="success" v-if="scope.row.secondChoice.accept">已接收</el-tag>
          <el-tag size="medium" effect="light" type="warning" v-if="(!scope.row.secondChoice.accept)&&scope.row.secondChoice.id">未接收</el-tag>
          <el-tag size="medium" effect="light" type="info" v-if="!scope.row.secondChoice.id">未填报</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div @click="addStu">
      <el-card shadow="hover" style="text-align:center;cursor:pointer;">
        添加学生
      </el-card>
    </div>

    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">

      <div v-for="(stu, index) in addForm.addList" :key="'stu'+index">
        {{'学生'+(index+1)}}
        <el-form :model="stu" label-position="top" ref="stu">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item required prop="name" :rules="[{ required: true, message: '姓名不能为空'}]">
                <el-input v-model="stu.name" autocomplete="off" placeholder="姓名" type="name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item required prop="id" :rules="[{ required: true, message: '学号不能为空'}]">
                <el-input v-model="stu.id" autocomplete="off" placeholder="学号" type="id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item required prop="classes" :rules="[{ required: true, message: '班级不能为空'}]">
                <el-input v-model="stu.classes" autocomplete="off" placeholder="班级" type="classes"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="danger" icon="el-icon-delete" circle @click="removeStuItem(index)"></el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button @click="addStuItem">新增学生</el-button>
        </el-col>
        <el-col :span="12" style="text-align:right;margin-right:20px">
          <el-upload class="upload" action="" :multiple="false" :show-file-list="false" accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :http-request="analysis">
            <el-button type="primary" icon="el-icon-document" circle></el-button>
          </el-upload>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postNewStu('stu')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import Vue from 'vue'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      tutorType: 'regular',
      // tutorType: this.$route.query.tutorType,
      stuList: [],
      tableList: [],
      dialogFormVisible: false,
      formLabelWidth: '',
      addForm: {
        addList: []
      }
    }
  },
  watch: {
    tutorType: {
      handler: function (val, oldval) {
        this.init()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  created () {
    this.init()
  },
  methods: {

    analysis (e) {
      // 覆盖上传行为
      let file = e.file // 文件信息
      console.log('e: ', e)
      console.log('file: ', e.file)

      if (!file) {
        // 没有文件
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }

      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary' // 以字符编码的方式解析
          })
          const exlname = workbook.SheetNames[0] // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          console.log(exl)
          exl.forEach((item, index, array) => {
            console.log(item)
            this.addForm.addList.push({ name: item['姓名'] || item[0], id: item['学号'] || item[1], classes: item['班级'] || item[2] })
          })
          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          console.log('出错了：：')
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    },
    postNewStu (formName) {
      let flag = true
      let count = 0
      var post = () => {
        // TODO 新增学生
        console.log('post')
        this.axios.post('')
      }
      for (let index in this.$refs[formName]) {
        this.$refs[formName][index].validate((valid) => {
          count++
          if (valid) {
          } else {
            flag = false
          }
          if ((count === this.$refs[formName].length) && flag) {
            post()
            this.dialogFormVisible = false
            this.init()
          }
        })
      }
    },

    addStu () {
      this.dialogFormVisible = true
    },
    removeStuItem (index) {
      this.addForm.addList.splice(index, 1)
    },
    addStuItem () {
      this.addForm.addList.push({ name: '', id: '', classes: '' })
    },
    init () {
      this.axios.post('/admin/stulist', { admNum: this.$store.state.admin.admId, type: this.tutorType }).then(res => {
        this.stuList = res.data.stuList
        this.tableList = res.data.tableList

        // 测试
        if (this.tutorType === 'graduate') {
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
