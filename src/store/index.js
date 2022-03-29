import Vue from 'vue';
import Vuex from 'vuex';
import todoApp from './modules/todoApp/store';

Vue.use(Vuex); // 이렇게 명시하면 전역에서 this.$store로 사용 가능

export const store = new Vuex.Store({
  modules: {
    todoApp,
  }
});