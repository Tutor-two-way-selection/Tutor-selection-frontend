<template>
  <div>
    <div class="Head">
      <h2>查看学生基本信息</h2>
      <hr>
    </div>
    <el-select v-model="tutorType" placeholder="请选择学生参与的选择的类型">
      <el-option label="全部学生名单" value="">
      </el-option>
      <el-option label="本科导师选择" value="regular">
      </el-option>
      <el-option label="毕业设计导师选择" value="graduate">
      </el-option>
    </el-select>
    <!-- {{filters}} -->
    <el-table :data="stuList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props" v-if="tutorType">
          <div label="" v-for="(item,index) in tableList" :key="'table'+index">
            <el-table :data="props.row[item.name]&&props.row[item.name].fileList" style="width: 100%">
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
                      <a :href="scope.row.url" :download="(item.title||item.name)+'_'+props.row.stuName">
                        <el-button type="primary" size="mini">下载</el-button>
                      </a>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template slot-scope="" v-else>
        </template>
      </el-table-column>
      <el-table-column label="学生ID" prop="stuNum">
      </el-table-column>
      <el-table-column label="学生姓名" prop="stuName">
      </el-table-column>
      <el-table-column label="班级" prop="stuClass" :filters="filters" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column label="志愿一" prop="firstChoice.name" v-if="tutorType">
        <template slot-scope="scope">
          <!-- {{scope.row.firstChoice}} -->
          <el-tag size="medium" effect="light" type="error" v-if="scope.row.firstChoice&&scope.row.firstChoice.accept===0">未接收</el-tag>
          <el-tag size="medium" effect="light" type="success" v-if="scope.row.firstChoice&&scope.row.firstChoice.accept===1">已接收</el-tag>
          <el-tag size="medium" effect="light" type="warning" v-if="scope.row.firstChoice&&scope.row.firstChoice.accept===2">未处理</el-tag>
          <el-tag size="medium" effect="light" type="info" v-if="!(scope.row.firstChoice&&scope.row.firstChoice.id)">未填报</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="志愿二" prop="" v-if="tutorType">
        <template slot-scope="scope">
          <!-- {{scope.row.secondChoice}} -->
          <el-tag size="medium" effect="light" type="error" v-if="scope.row.secondChoice&&scope.row.secondChoice.accept===0">未接收</el-tag>
          <el-tag size="medium" effect="light" type="success" v-if="scope.row.secondChoice&&scope.row.secondChoice.accept===1">已接收</el-tag>
          <el-tag size="medium" effect="light" type="warning" v-if="scope.row.secondChoice&&scope.row.secondChoice.accept===2">未处理</el-tag>
          <el-tag size="medium" effect="light" type="info" v-if="!(scope.row.secondChoice&&scope.row.secondChoice.id)">未填报</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div @click="addStu">
      <el-card shadow="hover" style="text-align:center;cursor:pointer;">
        添加学生
      </el-card>
    </div>

    <el-dialog title="添加学生" :visible.sync="dialogFormVisible" fullscreen>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button @click="addStuItem">新增学生</el-button>
        </el-col>
        <el-col :span="12" style="text-align:right;margin-right:20px">
          <el-upload class="upload" action="" :multiple="false" :show-file-list="false" accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :http-request="analysis">
            <el-button type="primary" icon="el-icon-document">从文件导入</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear">清 空</el-button>
        <el-button type="primary" @click="postNewStu('stu')">提 交</el-button>
      </div>
      <div v-for="(stu, index) in addList" :key="'stu'+index">
        {{'学生'+(index+1)}}
        <el-form :model="stu" ref="stu" :inline="true">
          <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="5">
              <el-form-item prop="name" :rules="[{ required: true, message: '姓名不能为空'}]" label="姓名">
                <el-input v-model="stu.name" autocomplete="off" placeholder="姓名" type="name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="id" :rules="[{ required: true, message: '学号不能为空'}]" label="学号">
                <el-input v-model="stu.id" autocomplete="off" placeholder="学号" type="id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="classes" :rules="[{ required: true, message: '班级不能为空'}]" label="班级">
                <el-select v-model="stu.classes" placeholder="请选择班级">
                  <el-option v-for="item in classList" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="contact" label="联系方式">
                <el-input v-model="stu.contact" autocomplete="off" placeholder="联系方式" type="contact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="initpass" :rules="[{ required: true, message: '初始密码不能为空'}]" label="初始密码">
                <el-input v-model="stu.initpass" autocomplete="off" placeholder="初始密码" type="initpass"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="danger" icon="el-icon-delete" circle @click="removeStuItem(index)"></el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <ViewFile ref="childItem"></ViewFile>
  </div>
</template>
<script>
// import Vue from 'vue'
import XLSX from 'xlsx'
import ViewFile from '../../components/ViewFile'
export default {
  components: { ViewFile },
  data () {
    return {
      tutorType: '',
      // tutorType: this.$route.query.tutorType,
      stuList: [],
      tableList: [],
      dialogFormVisible: false,
      formLabelWidth: '',
      addList: [],
      classList: ['class1', 'class2'],

      drawer: false,
      fileSrc: null,
      closeButton: false,

      filters: []
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
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    clear () {
      this.addList = []
    },
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
            let idCard = item['身份证']
            idCard = String(idCard)
            let student = { name: String(item['姓名'] || item[0] || ''), id: String(item['学号'] || item[1] || ''), classes: String(item['班级'] || item[2] || ''), contact: String(item['联系方式'] || item[3] || ''), initpass: String(item['初始密码'] || idCard.substring(idCard.length - 6) || item[4] || '') }
            console.log(!this.classList.includes(student.classes))
            if (!student.classes) {
              student.classes = ''
            } else if (!this.classList.includes(student.classes)) {
              // student.classes = ''
              this.classList.push(student.classes)
            }

            this.addList.push(student)
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
        this.axios.post('/admin/addStu', { grade: this.$store.state.admin.currentGrade, stuList: this.addList }).then(res => {
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
          }
        })
      }
    },

    addStu () {
      this.dialogFormVisible = true
    },
    removeStuItem (index) {
      this.addList.splice(index, 1)
    },
    addStuItem () {
      this.addList.push({ name: '', id: '', classes: '' })
    },
    init () {
      this.axios.post('/admin/stulist', { grade: this.$store.state.admin.currentGrade, type: this.tutorType }).then(res => {
        console.log(res)
        this.stuList = res.data.stuList
        this.tableList = res.data.tableList
        this.filters = []
        let tempKey = []
        for (let index in this.stuList) {
          if (!tempKey.includes(this.stuList[index].stuClass)) {
            this.filters.push({ text: this.stuList[index].stuClass, value: this.stuList[index].stuClass })
            tempKey.push(this.stuList[index].stuClass)
          }
        }
        // 手动排序
        for (let i = 0; i < this.filters.length; i++) {
          for (let j = i + 1; j < this.filters.length; j++) {
            if (this.filters[i].text > this.filters[j].text) {
              let t = this.filters[i]
              this.filters[i] = this.filters[j]
              this.filters[j] = t
            }
          }
        }
      })
    },
    preview (fileUrl) {
      this.$refs.childItem.preview(fileUrl)
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
</style>
