import Ember from 'ember';

let { Component, computed } = Ember;

export default Component.extend({

  //===================
  //Variables
  defaultExpenses: [
    {id:"exp_1", expenseType:"fixed", name: 'Rent', amount: 600},
    {id:"exp_2", expenseType:"fixed", name: 'Electric Bill', amount: 75},
    {id:"exp_3", expenseType:"fixed", name: 'Gas Bill', amount: 40},
    {id:"exp_4", expenseType:"fixed", name: 'Cable & Internet', amount: 100},
    {id:"exp_5", expenseType:"fixed", name: 'Phone', amount: 30},
    {id:"exp_6", expenseType:"fixed", name: 'Student Loan Payment', amount: 190},
    {id:"exp_7", expenseType:"fixed", name: 'Health Insurance Premium', amount: 0},
    {id:"exp_8", expenseType:"fixed", name: 'Car Payment & Insurance', amount: 75},
    {id:"exp_9", expenseType:"fixed", name: 'Renter\'s Insurance', amount: 16},
    {id:"exp_10", expenseType:"fixed", name: 'Parking/Train', amount: 100},
    {id:"exp_11", expenseType:"fixed", name: 'Identity Theft Protection', amount: 12},
    {id:"exp_12", expenseType:"fixed", name: 'Disability Insurance', amount: 12},
    {id:"exp_13", expenseType:"saving", name: 'Emergency Fund', amount: 250},
    {id:"exp_14", expenseType:"saving", name: 'IRA Contribution', amount: 150},
    {id:"exp_15", expenseType:"saving", name: 'General Savings', amount: 100},
    {id:"exp_17", expenseType:"variable", name: 'Groceries', amount: 150},
    {id:"exp_18", expenseType:"variable", name: 'Gym Membership', amount: 50},
    {id:"exp_19", expenseType:"variable", name: 'Netflix', amount: 9},
    {id:"exp_20", expenseType:"variable", name: 'Amazon Prime', amount: 8},
    {id:"exp_21", expenseType:"variable", name: 'Entertainment', amount: 150},
    {id:"exp_22", expenseType:"variable", name: 'Social Events', amount: 150},
    {id:"exp_23", expenseType:"variable", name: 'Medicine/Self-Care', amount: 50},
    {id:"exp_24", expenseType:"variable", name: 'Clothes', amount: 75},
    {id:"exp_25", expenseType:"variable", name: 'Cleaning Products', amount: 25},
    {id:"exp_26", expenseType:"variable", name: 'Subscriptions', amount: 50},
    {id:"exp_27", expenseType:"variable", name: 'Random', amount: 33},
  ],
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
    return (this.get('totalFixedExpenses')/this.get('totalExpenses')) || 0;
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
    return (this.get('totalSavings')/this.get('totalExpenses')) || 0;
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
    return (this.get('totalVariableExpenses')/this.get('totalExpenses')) || 0;
  }),

  //===================
  //Actions & Events

  init(){
    this._super(...arguments);

    const defaultExpenses = this.get('defaultExpenses'),
          expensesFromRepo = this.get('model'),
          createExpenseAction = this.get('createExpense');

    if(expensesFromRepo.length < 1 || !expensesFromRepo){
      for(let expense of defaultExpenses){
        const { expenseType, name, amount } = expense;

        createExpenseAction(expenseType, name, amount).then((newExpenseList) => {
          this.set('expenses', newExpenseList);
        })
      }
    }
  },

  didReceiveAttrs(){
    this._super(...arguments);

    const expenses = this.get('model')
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
    },
  }, //close actions object

});
