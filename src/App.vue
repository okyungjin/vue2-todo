<template>
  <div id="app">
    <TodoHeader label="TODO it!"></TodoHeader>
    <TodoInput @submitTodoItem="addTodoItem"></TodoInput>
    <TodoList :todo-list="todoItems" @removeTodoItem="removeTodoItem" @toggleTodoItem="toggleTodoItem"></TodoList>
    <TodoFooter @clear="clearTodoItems"></TodoFooter>
    <Modal v-if="showModal" @close="closeModal">
      <h3 slot="header">경고</h3>
      <div slot="body">내용이 비어있습니다.</div>
      <div slot="footer">
        <button class="modal-default-button" @click="closeModal">
          Close
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from './components/TodoFooter';
import Modal from './components/common/Modal';
import LocalStorage from "./helper/localStorage";

export default {
  name: 'App',
  components: { TodoFooter, TodoList, TodoInput, TodoHeader, Modal },
  data() {
    return {
      todoItems: [],
      showModal: false,
    }
  },
  created() {
    this.todoItems = LocalStorage.fetch();
  },
  methods: {
    addTodoItem(newTodoItem) {
      if (newTodoItem === '') {
        this.openModal();
        return;
      }
      this.todoItems.push({done: false, label: newTodoItem});
      LocalStorage.update(this.todoItems);
    },
    toggleTodoItem(idx) {
      this.todoItems[idx].done = !this.todoItems[idx].done;
      LocalStorage.update(this.todoItems);
    },
    removeTodoItem(targetIdx) {
      this.todoItems.splice(targetIdx, 1);
      LocalStorage.update(this.todoItems);
    },
    clearTodoItems() {
      LocalStorage.clear();
      this.todoItems = [];
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
}
</script>