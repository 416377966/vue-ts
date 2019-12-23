<template>
  <div class="about">
    <vue-ts></vue-ts>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueTs from '@/components/VueTsComp.vue'; // @ is an alias to /src

@Component({
  components: {
    VueTs,
  },
})
export default class Home extends Vue {}
</script>