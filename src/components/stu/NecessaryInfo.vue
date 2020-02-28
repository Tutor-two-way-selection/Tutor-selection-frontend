<template>
  <div class="necessary-info">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="baseForm" :model="form" label-width="80px">
          <el-form-item label="联系方式">
            <el-input v-model="baseForm.contact"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文件上传" name="second">
        <div v-for="(item, i) in necList" :key="i">
          <h3>{{ item.title || item.name }}</h3>
          <!-- <hr /> -->
          <!-- <div v-for="(file,index) in item.fileList" :key="'file'+index">
            {{file.url||None}}
          </div> -->
          <el-upload class="upload-demo" :action="item.url" :on-preview="handlePreview" :on-remove="handleRemove[i]" :before-remove="beforeRemove" :on-success="handleSuccess[i]" :on-error="handleError" :before-upload="beforeUpload" :on-progress="handleProgress" multiple drag :auto-upload="true" :limit="3" :on-exceed="handleExceed" :file-list="item.fileList">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <!-- <div
          slot="tip"
          class="el-upload__tip"
        >只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
export default {
  data () {
    return {
      handleSuccess: [],
      handleRemove: [],
      activeName: 'first'
    }
  },
  props: ['necList', 'type', 'baseForm'],
  methods: {
    handleTabClick () { },
    handlePreview (file) {
      console.log(file)
    },
    // handleRemove (file, fileList) {
    //   console.log(file, fileLists)
    // },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleError () {
      alert('error')
    },
    handleProgress (event, file, fileList) {
      alert('handleProgress')
      console.log(file)
    },
    beforeUpload (file) {
      alert('before upload')
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    }
  },
  created () {
    for (let i = 0; i < this.necList.length; i++) {
      this.handleSuccess.push((response, file, fileList) => {
        console.log('success')
        console.log(file)
        var tempList = fileList
        file['url'] = window.location.protocol + '//' + window.location.host + '/downloadFile?filename=' + response.file.newfilename + '&oldname=' + response.file.originalname
        this.necList[i].fileList = tempList
        console.log(this.necList)
      })
    }
    for (let i = 0; i < this.necList.length; i++) {
      this.handleRemove.push((file, fileList) => {
        console.log('remove')
        this.necList[i].fileList = fileList
      })
    }
  }
}
</script>
<style>
  .necessary-info {
    text-align: left;
  }
</style>
