<template>
  <div>
    {{type}}
    <br>
    <!-- <el-button @click="resetDepartmentFilter">清除部门过滤器</el-button> -->
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="tutorList"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="department"
        column-key="department"
        label="部门"
        :filters="department_filters"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="search"
        label="研究所"
        :filters="search_filters"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              选为导师<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button
                  type="text"
                  @click="asFirstChoice(scope.row.id)"
                >
                  第一志愿
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="text"
                  @click="asSecondChoice(scope.row.id)"
                >第二志愿</el-button>
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
      search_filters: []
    }
  },
  created () {
    this.axios.post('/student/tutorList').then(response => {
      this.tutorList = response.data.tutorList
      let tempList = []
      for (let i = 0; i < this.tutorList.length; i++) {
        if (tempList.indexOf(this.tutorList[i].department) === -1) {
          this.department_filters.push({ text: this.tutorList[i].department, value: this.tutorList[i].department })
          tempList.push(this.tutorList[i].department)
        }
      }
      tempList = []
      for (let i = 0; i < this.tutorList.length; i++) {
        if (tempList.indexOf(this.tutorList[i].search) === -1) {
          this.search_filters.push({ text: this.tutorList[i].search, value: this.tutorList[i].search })
          tempList.push(this.tutorList[i].search)
        }
      }
    }).catch(err => {
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
    },
    asSecondChoice (id) {
      console.log(id)
    }
  }
}
</script>
