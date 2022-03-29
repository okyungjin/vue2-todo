import LocalStorage from '../../../helper/localStorage';

const state = {
  todoItems: LocalStorage.fetch(),
}

const getters = {
  storedTodoItems(state) {
    return state.todoItems;
  }
}

const mutations = {
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
  },
}

export default {
  state,
  getters,
  mutations,
}