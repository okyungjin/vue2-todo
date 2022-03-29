import Vue from 'vue';
import Vuex from 'vuex';
import LocalStorage from '../helper/localStorage';

Vue.use(Vuex); // 이렇게 명시하면 전역에서 this.$store로 사용 가능

export const store = new Vuex.Store({
  state: {
    todoItems: LocalStorage.fetch(),
  },
  getters: {
    getNumber(state) {
      return state.num;
    },
    getDoubleNumber(state) {
      return state.num * 2;
    }
  }

});