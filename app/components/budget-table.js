import Ember from 'ember';

export default Ember.Component.extend({
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

  showFixedExpenses:true,
  showSavings: true,
  showVariableExpenses: true,

  init(){
    this._super(...arguments);
  },

  didReceiveAttrs(){
    this._super(...arguments);
    let expenses = this.get('model');
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

      let createExpenseAction = this.get('createExpense');

      createExpenseAction(type).then((newExpenseList) => {
        this.set('expenses', newExpenseList);
      })
    },

    passUpEditedExpense(expense){
      let editExpense = this.get('editExpense');
      editExpense(expense)
    },

    passUpDeletedExpense(expense){
      let deleteExpense = this.get('deleteExpense');
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
  },

  //Expense actions
  editExpenseName: Ember.computed('expenses', function(expense){
    return this.get('editExpenseName');
  }),

  _amountStringArray: Ember.computed.mapBy('expenses', 'amount'),

  amountArray: Ember.computed.map('_amountStringArray', function(numString){
    return Number(numString);
  }),

  totalExpenses: Ember.computed.sum('amountArray'),

  //=================================
  // FIXED EXPENSES

  fixedExpenses: Ember.computed.filter('expenses', function(expense){
    return expense.expenseType == 'fixed';
  }),

  _fixedAmountStringArray: Ember.computed.mapBy('fixedExpenses', 'amount'),

  fixedAmountArray: Ember.computed.map('_fixedAmountStringArray', function(numString){
    return Number(numString);
  }),

  totalFixedExpenses: Ember.computed.sum('fixedAmountArray'),

  percentFixed: Ember.computed('totalExpenses', 'totalFixedExpenses', function(){
    return Math.round(this.get('totalFixedExpenses')/this.get('totalExpenses')*100) || 0;
  }),

  //=================================
  // SAVINGS

  savingExpenses: Ember.computed.filter('expenses', function(expense){
    return expense.expenseType == 'saving';
  }),

  _savingsAmountStringArray: Ember.computed.mapBy('savingExpenses', 'amount'),

  savingsAmountArray: Ember.computed.map('_savingsAmountStringArray', function(numString){
    return Number(numString);
  }),

  totalSavings: Ember.computed.sum('savingsAmountArray'),

  percentSavings: Ember.computed('totalExpenses', 'totalSavings', function(){
    return Math.round(this.get('totalSavings')/this.get('totalExpenses')*100) || 0;
  }),

  //=================================
  // VARIABLE EXPENSES

  variableExpenses: Ember.computed.filter('expenses', function(expense){
    return expense.expenseType == 'variable';
  }),

  _variableAmountStringArray: Ember.computed.mapBy('variableExpenses', 'amount'),

  variableAmountArray: Ember.computed.map('_variableAmountStringArray', function(numString){
    return Number(numString);
  }),

  totalVariableExpenses: Ember.computed.sum('variableAmountArray'),

  percentVariable: Ember.computed('totalExpenses', 'totalVariableExpenses', function(){
    return Math.round(this.get('totalVariableExpenses')/this.get('totalExpenses')*100) || 0;
  })

});
