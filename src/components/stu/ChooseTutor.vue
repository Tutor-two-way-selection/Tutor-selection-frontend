<template>
  <div>
    <!-- {{type}} -->
    <br />
    <!-- <el-button @click="resetDepartmentFilter">清除部门过滤器</el-button> -->
    <el-form ref="form" :model="form" :inline="true" label-width="80px" :rules="rules">
      <!-- <el-tag
        closable
        v-show="form.firstChoice"
      >第一志愿: {{form.firstChoice}}</el-tag>
      <br>
      <el-tag
        closable
        v-show="form.secondChoice"
        type="success"
      >第二志愿: {{form.secondChoice}}</el-tag>-->
      {{ form }}
      <br />
      <el-form-item label="第一志愿" prop="firstChoice">
        <el-select v-model="form.firstChoice" placeholder="请选择第一志愿">
          <el-option :label="item.name" :value="item.id" v-for="(item, i) in tutorList" :key="i + 'first'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第二志愿">
        <el-select v-model="form.secondChoice" placeholder="请选择第二志愿">
          <el-option :label="item.name" :value="item.id" v-for="(item, i) in tutorList" :key="i + 'second'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接受调剂">
        <el-switch v-model="form.redistribute"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-button @click="clearFilter">清除所有过滤器</el-button> -->
    <el-table ref="filterTable" :data="tutorList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">{{ props.row }}</template>
      </el-table-column>
      <el-table-column prop="id" label="编号" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="department" column-key="department" label="部门" :filters="department_filters" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="search" label="研究所" :filters="search_filters" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">选为导师
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="asFirstChoice(scope.row.id)">第一志愿</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="asSecondChoice(scope.row.id)">第二志愿</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ['type'],
  data () {
    return {
      tutorList: [],
      department_filters: [],
      search_filters: [],
      form: {
        redistribute: false,
        firstChoice: '',
        secondChoice: ''
      },
      rules: {
        firstChoice: [
          { required: true, message: '请选择第一志愿导师', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.axios
      .post('/allteacher')
      .then(response => {
        this.tutorList = response.data.tutorList
        let tempList = []
        for (let i = 0; i < this.tutorList.length; i++) {
          if (tempList.indexOf(this.tutorList[i].department) === -1) {
            this.department_filters.push({
              text: this.tutorList[i].department,
              value: this.tutorList[i].department
            })
            tempList.push(this.tutorList[i].department)
          }
        }
        tempList = []
        for (let i = 0; i < this.tutorList.length; i++) {
          if (tempList.indexOf(this.tutorList[i].search) === -1) {
            this.search_filters.push({
              text: this.tutorList[i].search,
              value: this.tutorList[i].search
            })
            tempList.push(this.tutorList[i].search)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    resetDepartmentFilter () {
      this.$refs.filterTable.clearFilter('department')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    asFirstChoice (id) {
      console.log(id)
      this.form.firstChoice = id
    },
    asSecondChoice (id) {
      console.log(id)
      this.form.secondChoice = id
    },
    onSubmit (formName) {
      // this.axios.post()
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.type, ': submit!')
          console.log('/student/' + this.type, {
            stuID: this.$store.state.student.stuId,
            firstChoice: this.form.firstChoice,
            secondChoice: this.form.secondChoice,
            isRedistribute: this.form.redistribute
          })
          this.axios.post('/student/' + this.type, {
            stuID: this.$store.state.student.stuId,
            firstChoice: this.form.firstChoice,
            secondChoice: this.form.secondChoice,
            isRedistribute: this.form.redistribute
          })
        } else {
          console.log(this.type, ': error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    listenFirstChoice () {
      return this.form.firstChoice
    },
    listenSecondChoice () {
      return this.form.secondChoice
    }
  },
  watch: {
    listenFirstChoice: {
      handler: function (val, oldval) {
        console.log('listenFirstChoice')
        if (this.form.firstChoice === this.form.secondChoice) {
          this.form.secondChoice = ''
        }
      },
      deep: true
    },
    listenSecondChoice: {
      handler: function (val, oldval) {
        console.log('listenSecondChoice')
        if (this.form.secondChoice === this.form.firstChoice) {
          this.form.firstChoice = ''
        }
      },
      deep: true
    }
  }
}
</script>
