<template>
  <div>
    <el-table ref="filterTable" :data="tutorList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">{{ props.row }}</template>
      </el-table-column>
      <el-table-column prop="id" label="编号" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="department" column-key="department" label="部门" :filters="department_filters" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="search" label="研究所" :filters="search_filters" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
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
    this.axios
      .post('/allteacher')
      .then(response => {
        this.tutorList = response.data.tutorList
        // temoList用来防止重复
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
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
