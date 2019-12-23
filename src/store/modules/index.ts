import { Module } from 'vuex';
import { RootState } from '@/@types/vuex';
interface IndexTypes {
  lang: string;
}
const Index: Module<IndexTypes, RootState> = {
  namespaced: true,
  state: {
    lang: 'typescript'
  },
  getters: {
    curLang (state): string {
      return state.lang;
    }
  },
  mutations: {
    updateLang (state, value: string): void {
      state.lang = value;
    }
  },
  actions: {
    updateLang({ commit }, value: string): void {
      commit('updateLang', value);
    }
  }
};

export default Index;
