export default class LocalStorage {
  static fetch() {
    return JSON.parse(localStorage.getItem('todoItems')) ?? [];
  }

  static update(items) {
    return localStorage.setItem('todoItems', JSON.stringify(items))
  }
}