<template>
  <div>
    {{tutorType}}
    <div v-for="type in tutorType" :key="'type'+type">
      {{type}}
      <el-table :data="stuList[type]" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div label="" v-for="(item,index) in tableList[type]" :key="'table'+index">
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
      </el-table>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      tutorType: ['regular', 'graduate'],
      stuList: {},
      tableList: []
    }
  },
  created () {
    for (let i in this.tutorType) {
      this.axios.post('/teacher/accepted', { teaID: this.$store.state.teacher.teaId, type: this.tutorType[i] }).then(res => {
        Vue.set(this.stuList, this.tutorType[i], res.data.stuList)
        Vue.set(this.tableList, this.tutorType[i], res.data.tableList)
      })
    }
  },
  methods: {
    preview (fileUrl) {
      window.open('http://view.officeapps.live.com/op/view.aspx?src=' + fileUrl)
    }
  }
}
</script>
