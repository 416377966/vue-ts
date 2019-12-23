import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/@types/vuex/index.d.ts';
import index from './modules/index';

Vue.use(Vuex);
const store: StoreOptions<RootState> = {
  strict: true,
  state: {
    version: '1.0.0',
    name: 'vue-cli-ts'
  },
  modules: {
    index
  }
};
const storeInstance = new Vuex.Store<RootState>(store);

export default storeInstance;

if (process.env.NODE_ENV !== 'development') {
  // do sth
} else {
  // do sth else
}
