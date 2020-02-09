<template>
  <div>
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="查看、修改个人信息"></el-step>
      <el-step title="选择导师"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  props: ['step']
}
</script>
