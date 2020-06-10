<template>
  <div>
    <el-drawer title="在线浏览" :visible.sync="drawer" direction="rtl" :before-close="handleClose" size="100%" :with-header="false" ref="ViewFile" :destroyOnClose="true">
      <iframe :src="fileSrc" style="height:100%;width:100%"></iframe>
    </el-drawer>
    <transition name="closeButton">
      <div class="close-button" v-show="closeButton">
        <el-button type="danger" icon="el-icon-close" circle @click="closeDrawer"></el-button>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: [''],
  data () {
    return {
      drawer: false,
      closeButton: false,
      fileSrc: null
    }
  },
  methods: {
    closeDrawer () {
      // closeDrawer()
      this.$refs['ViewFile'].closeDrawer()
    },
    preview (fileUrl) {
      // window.open('http://view.officeapps.live.com/op/view.aspx?src=' + fileUrl)
      this.fileSrc = 'http://view.officeapps.live.com/op/view.aspx?src=' + fileUrl
      // this.fileSrc = 'http://view.officeapps.live.com/op/view.aspx?src=' + 'http://nbcairongjiu.cn:8080/onlineRead/7b106db3d68e5a2cf36d4a2adfd93ea8.docx'
      this.drawer = true
      this.closeButton = true
    },
    handleClose (done) {
      this.closeButton = false
      done()
    }
  }
}
</script>
<style lang="scss">
  .close-button {
    position: fixed;
    right: 40px;
    top: 20px;
    z-index: 3000;
  }

  .closeButton-enter-active,
  .closeButton-leave-active {
    transition: all 0.45s ease;
  }
  .closeButton-enter,
  .closeButton-leave-to {
    transform: translateX(100px) rotate(720deg);
  }
</style>
