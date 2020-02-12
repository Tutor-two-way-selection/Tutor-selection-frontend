<template>
  <div>
    <el-table :data="stuList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div label="" v-for="(item,index) in tableList" :key="'table'+index">
            <!-- <div>{{ item.title||item.name }}</div> -->
            <el-table :data="props.row[item.name].fileList" style="width: 100%">
              <el-table-column :label="item.title||item.name">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
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

                  <!-- <el-row :gutter="12" type="flex">
                    <el-col :span="12">
                      <el-button type="success" size="mini" @click="preview(scope.row.url)">预览</el-button>
                    </el-col>
                    <el-col :span="12">
                      <a :href="scope.row.url">
                        <el-button type="primary" size="mini">下载</el-button>
                      </a>
                    </el-col>
                  </el-row> -->
                </template>
              </el-table-column>
            </el-table>
            <!-- <div v-for="(file,fileIndex) in props.row[item.name].fileList" :key="'file'+index+fileIndex">
              <el-card class="box-card" shadow="hover" body-style="width:100%;padding:10px" style="margin:15px;">
                <el-row :gutter="12">
                  <el-col :span="16">
                    <div style="margin:auto"> {{file.name}}</div>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="success" size="medium" @click="preview(file.url)">预览</el-button>
                  </el-col>
                  <el-col :span="4">
                    <a :href="file.url">
                      <el-button type="primary" size="medium">下载</el-button>
                    </a>
                  </el-col>
                </el-row>
              </el-card>
            </div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学生ID" prop="id">
      </el-table-column>
      <el-table-column label="学生姓名" prop="name">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tutorType: 'regular',
      stuList: [],
      tableList: []
    }
  },
  created () {
    this.axios.post('/teacher/stuinfo', { teaID: this.$store.state.teacher.teaId, type: this.tutorType }).then(res => {
      this.stuList = res.data.stuList
      this.tableList = res.data.tableList
    })
  },
  methods: {
    preview (fileUrl) {
      window.open('http://view.officeapps.live.com/op/view.aspx?src=' + fileUrl)
    }
  }
}
</script>
<style lang="scss" scoped>
  .flex-container {
    display: flex;
    justify-content: center;
  }
</style>
