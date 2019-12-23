<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <h3>TypeScript介绍</h3>
    <ul>
      <li><a href="https://www.tslang.cn/docs/home.html" target="_blank" rel="noopener">TypeScript官方文档</a></li>
    </ul>
    <h3>JavaScript迁移到TypeScript</h3>
    <ul>
      <li><a href="https://segmentfault.com/a/1190000009630935" target="_blank" rel="noopener">文档参考</a></li>
      <li><a href="https://cn.vuejs.org/v2/guide/typescript.html#增强类型以配合插件使用" target="_blank" rel="noopener">官方文档参考</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @State('name') name!: string

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
