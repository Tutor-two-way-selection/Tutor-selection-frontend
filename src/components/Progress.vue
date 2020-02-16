<template>
  <div>
    <el-steps :active="step" finish-status="success" align-center>
      <el-step :title="title" v-for="(title,i) in titleList" :key="'title'+i"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  props: ['step', 'titleList']
}
</script>
