import Ember from 'ember';

let { Component, computed } = Ember;

export default Component.extend({

  //===================
  //Variables
  amountArray: [],
  totalExpenses: 0,
  fixedExpenses: 0,
  totalFixedExpenses: 0,
  percentFixed: 0,
  savingExpenses: 0,
  totalSavings: 0,
  percentSavings: 0,
  variableExpenses: 0,
  totalVariableExpenses: 0,
  percentVariable: 0,

  //UI state variables
  showFixedExpenses:true,
  showSavings: true,
  showVariableExpenses: true,


  _amountStringArray: computed.mapBy('expenses', 'amount'),

  amountArray: computed.map('_amountStringArray', (numString) => {
    return Number(numString);
  }),

  totalExpenses: computed.sum('amountArray'),

  //=================================
  // FIXED/ESSENTIAL EXPENSES

  fixedExpenses: computed.filter('expenses', (expense) => {
    return expense.expenseType == 'fixed';
  }),

  _fixedAmountStringArray: computed.mapBy('fixedExpenses', 'amount'),

  fixedAmountArray: computed.map('_fixedAmountStringArray', (numString) => {
    return Number(numString);
  }),

  totalFixedExpenses: computed.sum('fixedAmountArray'),

  percentFixed: computed('totalExpenses', 'totalFixedExpenses', function() {
    return Math.round(this.get('totalFixedExpenses')/this.get('totalExpenses')*100) || 0;
  }),

  //=================================
  // SAVINGS

  savingExpenses: computed.filter('expenses', (expense) => {
    return expense.expenseType == 'saving';
  }),

  _savingsAmountStringArray: computed.mapBy('savingExpenses', 'amount'),

  savingsAmountArray: computed.map('_savingsAmountStringArray', (numString) => {
    return Number(numString);
  }),

  totalSavings: computed.sum('savingsAmountArray'),

  percentSavings: computed('totalExpenses', 'totalSavings', function() {
    return Math.round(this.get('totalSavings')/this.get('totalExpenses')*100) || 0;
  }),

  //=================================
  // VARIABLE EXPENSES

  variableExpenses: computed.filter('expenses', (expense) => {
    return expense.expenseType == 'variable';
  }),

  _variableAmountStringArray: computed.mapBy('variableExpenses', 'amount'),

  variableAmountArray: computed.map('_variableAmountStringArray', (numString) => {
    return Number(numString);
  }),

  totalVariableExpenses: computed.sum('variableAmountArray'),

  percentVariable: computed('totalExpenses', 'totalVariableExpenses', function(){
    return Math.round(this.get('totalVariableExpenses')/this.get('totalExpenses')*100) || 0;
  }),

  //===================
  //Actions & Events

  init(){
    this._super(...arguments);
  },

  didReceiveAttrs(){
    this._super(...arguments);

    const expenses = this.get('model');
    this.set('expenses', expenses);
  },

  actions: {
    handleCreateExpense(type){
      //unhide expenses of type being added if hidden
      if(type=='fixed' && !this.get('showFixedExpenses')){
        this.set('showFixedExpenses', true)
      }

      if(type=='saving' && !this.get('showSavings')){
        this.set('showSavings', true)
      }

      if(type=='variable' && !this.get('showVariableExpenses')){
        this.set('showVariableExpenses', true)
      }

      const createExpenseAction = this.get('createExpense');

      createExpenseAction(type).then((newExpenseList) => {
        this.set('expenses', newExpenseList);
      })
    },

    passUpEditedExpense(expense){
      const editExpense = this.get('editExpense');
      editExpense(expense)
    },

    passUpDeletedExpense(expense){
      const deleteExpense = this.get('deleteExpense');
      deleteExpense(expense);
    },

    toggleExpenses(type){
      if(type ==='fixed'){
        this.toggleProperty('showFixedExpenses')
      }

      if(type ==='saving'){
        this.toggleProperty('showSavings')
      }

      if(type ==='variable'){
        this.toggleProperty('showVariableExpenses')
      }
    }
  }, //close actions object

});
