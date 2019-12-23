<template>
  <div class="hello">
    <p>
      这里介绍Typescript和Vue结合使用过程
    </p>
    <h3>所用到的库</h3>
    <ul>
      <li><a href="https://github.com/kaorun343/vue-property-decorator" target="_blank" rel="noopener">vue-property-decorator</a></li>
      <li><a href="https://github.com/ktsn/vuex-class" target="_blank" rel="noopener">vuex-class</a></li>
    </ul>
    <h3>实例参考</h3>
    <ul>
      <li><a href="https://git.code.tencent.com/slugteam/vue-cli-ts/blob/master/src/App.vue" target="_blank" rel="noopener">Vue+ts语法参考</a></li>
      <li><a href="https://git.code.tencent.com/slugteam/vue-cli-ts/blob/master/src/store/modules/index.ts" target="_blank" rel="noopener">Vuex模块划分</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
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
