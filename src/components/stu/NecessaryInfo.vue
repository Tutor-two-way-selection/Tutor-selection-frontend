<template>
  <div class="necessary-info">
    <div v-for="(item, i) in necList" :key="i">
      <h3>{{ item.title || item.name }}</h3>
      <hr />
      <!-- <div
        v-for="(file,index) in item.fileList"
        :key="'file'+index"
      >
        {{file.url||None}}
      </div>-->
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      handleSuccess: [],
      handleRemove: []
    }
  },
  props: ['necList', 'type'],
  methods: {
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
