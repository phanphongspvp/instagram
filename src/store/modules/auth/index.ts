import { initState } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

export const auth = {
  state: initState(),
  mutations,
  actions,
  getters
};