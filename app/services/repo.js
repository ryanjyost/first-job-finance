import Ember from 'ember';

export default Ember.Service.extend({
  lastId: 0,
  data: null,

  findAll() {
    return this.get('data') ||
      this.set('data', JSON.parse(window.localStorage.getItem('expenses') || '[]'));
  },

  findExpense(id){
    let expenses = this.get('data');
    let expense = {};

    for(let i = 0; i<expenses.length; i++){
      if(expenses[i].id === id){
        console.log('expense', expenses[i])
        expense = expenses[i];
      }
    }

    return expense;
  },

  add(attrs) {
    let expense = Object.assign({ id: `exp_${Date.now()}` }, attrs);
    this.get('data').pushObject(expense);
    this.persist();
    return expense;
  },

  delete(expense) {
    this.get('data').removeObject(expense);
    this.persist();
  },

  persist() {
    window.localStorage.setItem('expenses', JSON.stringify(this.get('data')));
  },

});