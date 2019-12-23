<template>
  <div class="home">
    <ts msg="这里介绍Typescript的基本用法和从JavaScript迁移到TypeScript的过程"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ts from '@/components/TsComp.vue'; // @ is an alias to /src

@Component({
  components: {
    Ts,
  },
})
export default class Home extends Vue {}
</script>
