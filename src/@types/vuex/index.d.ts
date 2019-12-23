import { GetterTree, ActionTree, MutationTree, ModuleTree } from 'vuex';

interface Module<S, R> {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>;
}

export interface RootState {
  version: string;
  name: string;
}
