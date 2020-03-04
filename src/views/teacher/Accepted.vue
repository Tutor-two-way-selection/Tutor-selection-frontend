<template>
  <div>
    <!-- {{stuList}}<br>
    {{tableList}} -->
    <div v-for="type in tutorType" :key="'type'+type">
      <h2>{{((type==='regular')&&'本科')||((type==='graduate')&&'毕业设计')||type}}</h2>
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
        <el-table-column label="学生ID" prop="stuNum">
        </el-table-column>
        <el-table-column label="学生姓名" prop="stuName">
        </el-table-column>
      </el-table>
    </div>

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
      tutorType: ['regular', 'graduate'],
      stuList: {},
      tableList: [],
      drawer: false,
      fileSrc: null,
      closeButton: false
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
    closeDrawer () {
      // closeDrawer()
      this.$refs['docDrawer'].closeDrawer()
    },
    preview (fileUrl) {
      this.$refs.childItem.preview(fileUrl)
    },
    handleClose (done) {
      this.closeButton = false
      done()
    }
  }
}
</script>
