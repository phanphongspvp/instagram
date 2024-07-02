import { Module } from 'vuex';
import { initState } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { StateComment } from '@/types/comment';

export const comment: Module<StateComment, any> = {
  state: initState(),
  mutations,
  actions
};