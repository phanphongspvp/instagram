import { Module } from 'vuex';
import { initState } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { StatePost } from '@/types/post';

export const post: Module<StatePost, any> = {
  state: initState(),
  mutations,
  actions
};