import Vue from 'vue';
import Vuex from 'vuex';
import LocalStorage from '../helper/localStorage';

Vue.use(Vuex); // 이렇게 명시하면 전역에서 this.$store로 사용 가능

export const store = new Vuex.Store({
  state: {
    todoItems: LocalStorage.fetch(),
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    }
  },
  mutations: {
    addTodoItem(state, newTodoItem) {
      state.todoItems.push({done: false, label: newTodoItem});
      LocalStorage.update(state.todoItems);
    },
    toggleTodoItem(state, targetIdx) {
      state.todoItems[targetIdx].done = !state.todoItems[targetIdx].done;
      LocalStorage.update(this.state.todoItems);
    },
    removeTodoItem(state,targetIdx) {
      state.todoItems.splice(targetIdx, 1);
      LocalStorage.update(state.todoItems);
    },
    clearTodoItems(state) {
      LocalStorage.clear();
      state.todoItems = [];
    }
  }
});