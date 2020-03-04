<template>
  <div>
    <el-steps :active="step" finish-status="success" align-center>
      <el-step :title="title" v-for="(title,i) in titleList" :key="'title'+i"></el-step>
    </el-steps>
    <el-alert v-show="step===2" title="已选择导师,请等待导师确认" type="error">
    </el-alert>
  </div>
</template>
<script>
export default {
  props: ['step', 'titleList']
}
</script>
