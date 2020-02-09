<template>
  <div v-if="tutor" class="card-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{tutor.name}}</span>
        <span style="float: right; padding: 3px 0">ID:{{tutor.id}}</span>
      </div>
      <div>部门:{{tutor.department }}</div>
      <div>研究所:{{tutor.search }}</div>
      <div>联系方式:{{tutor.contact }}</div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['tutor']
}
</script>
<style  scoped>
.card-container {
  margin-bottom: 20px;
}
</style>
