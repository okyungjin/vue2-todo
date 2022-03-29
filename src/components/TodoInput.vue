<template>
  <div class="inputBox shadow">
    <input type="text" id="searchText" ref="searchText" v-model="inputText" @keyup.enter="submitTodoItem">
    <span class="addContainer" type="submit" @click="submitTodoItem">Add</span>
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
  import Modal from './common/Modal';
  import { mapMutations } from 'vuex';

  export default {
    name: "TodoInput",
    data() {
      return {
        inputText: '',
        showModal: false,
      }
    },
    methods: {
      ...mapMutations(['addTodoItem']),
       submitTodoItem() {
        if (this.inputText === '') {
          this.openModal();
          return;
        }
        const trimmed = this.inputText.trim();
        this.addTodoItem(trimmed);
        this.clearInput();
        this.autofocus();
      },
      clearInput() {
        this.inputText = '';
      },
      autofocus() {
        this.$refs.searchText.focus();
      },
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
    },
    components: {
      Modal,
    }
  }
</script>

<style scoped>
  input:focus {
    outline: none;
  }
  .inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
</style>
