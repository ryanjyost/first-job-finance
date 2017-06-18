import Ember from 'ember';

export default Ember.Service.extend({
  data: null,
  expenses: null,
  annualIncome: null,
  incomeType: null,
  hourlyWage: null,
  workingHoursPerWeek: null,
  workingWeeksPerYear: null,
  payFrequency: null,

  findAll(resource){
    return this.get(resource) ||
      this.set(resource, JSON.parse(window.localStorage.getItem(resource) || '[]'));
  },

  find(data){
    return this.get(data) ||
      this.set(data, JSON.parse(window.localStorage.getItem(data) || 'null'));
  },

  persist(property, value) {
    if(value){
      this.set(property, value)
    }

    window.localStorage.setItem(property, JSON.stringify(this.get(property)));
  },

  //=================
  //EXPENSES
  //=================

  findExpense(id){
    let expenses = this.get('expenses');
    let expense = {};

    for(let i = 0; i<expenses.length; i++){
      if(expenses[i].id === id){
        console.log('expense', expenses[i])
        expense = expenses[i];
      }
    }

    return expense;
  },

  addExpense(attrs) {
    let expense = Object.assign({ id: `exp_${Date.now()}` }, attrs);
    this.get('expenses').pushObject(expense);
    this.persist('expenses');
    return expense;
  },

  deleteExpense(expense) {
    this.get('expenses').removeObject(expense);
    this.persist('expenses');
  },



});