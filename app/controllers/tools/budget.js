import Ember from 'ember';

let { computed, inject } = Ember

export default Ember.Controller.extend({
  monthlyTakeHomePay: null,
  budgetSurplus: null,
  repo: inject.service(),
  actualPieChartData: null,
  targetPieChartData: [
    {
      value: 20,
      label: 'Savings'
    },
    {
      value: 30,
      label: 'Variable'
    },
    {
      value: 50,
      label: 'Essential'
    },
  ],


  //=================================
  // Output view toggling

  currentOutputOption: 'pieCharts',
  budgetOutputOptions: [{label: 'Pie Charts', value: 'pieCharts'},{label: 'Surplus / Deficit', value: 'surplus'}],




  //=================================
  //Calculate budget breakdowns for pie charts
  _amountStringArray: computed.mapBy('model.expenses', 'amount'),

  expenseAmountArray: computed.map('_amountStringArray', (numString) => {
    return Number(numString);
  }),

  totalMonthlyExpenses: computed.sum('expenseAmountArray'),

  budgetSurplus: computed('model.expenses','totalMonthlyExpenses', 'model.monthlyTakeHomePay', function(){
    return (this.get('model.monthlyTakeHomePay') - this.get('totalMonthlyExpenses'));
  }),

  // FIXED/ESSENTIAL EXPENSES
  fixedExpenses: computed.filter('model.expenses', (expense) => {
    return expense.expenseType == 'fixed';
  }),

  _fixedAmountStringArray: computed.mapBy('fixedExpenses', 'amount'),

  fixedAmountArray: computed.map('_fixedAmountStringArray', (numString) => {
    return Number(numString);
  }),

  totalFixedExpenses: computed.sum('fixedAmountArray'),

  // SAVINGS
  savingExpenses: computed.filter('model.expenses', (expense) => {
    return expense.expenseType == 'saving';
  }),

  _savingsAmountStringArray: computed.mapBy('savingExpenses', 'amount'),

  savingsAmountArray: computed.map('_savingsAmountStringArray', (numString) => {
    return Number(numString);
  }),

  totalSavings: computed.sum('savingsAmountArray'),

  // VARIABLE EXPENSES
  variableExpenses: computed.filter('model.expenses', (expense) => {
    return expense.expenseType == 'variable';
  }),

  _variableAmountStringArray: computed.mapBy('variableExpenses', 'amount'),

  variableAmountArray: computed.map('_variableAmountStringArray', (numString) => {
    return Number(numString);
  }),

  totalVariableExpenses: computed.sum('variableAmountArray'),

  //======================================
  // Update pie charts when expenses update
  actualPieChartData: computed('totalFixedExpenses', 'totalSavings', 'totalVariableExpenses', function(){
    const totalFixedExpenses = this.get('totalFixedExpenses'),
          totalSavings = this.get('totalSavings'),
          totalVariableExpenses = this.get('totalVariableExpenses');

    const newData = [
      {
        value: totalFixedExpenses,
        label: 'Essential'
      },
      {
        value: totalSavings,
        label: 'Savings'
      },
      {
        value: totalVariableExpenses,
        label: 'Variable'
      },
    ]

    return newData;
  }),

  targetPieChartData: computed('totalMonthlyExpenses', function(){
    const totalFixedExpenses = this.get('totalMonthlyExpenses')*.5,
          totalSavings = this.get('totalMonthlyExpenses')*.2,
          totalVariableExpenses = this.get('totalMonthlyExpenses')*.3;

    const newData = [
      {
        value: totalFixedExpenses,
        label: 'Essential'
      },
      {
        value: totalSavings,
        label: 'Savings'
      },
      {
        value: totalVariableExpenses,
        label: 'Variable'
      },
    ]

    return newData;
  }),



  actions: {
    createExpense(type){
       const updatedExpenses = new Promise((resolve, reject) => {

        if(!type){
          reject('no type specified')
        } else{
          const newExpense = Ember.Object.create(
            {
              expenseType: type,
              name: '',
              amount: 0,
              infoLink: ''
            }
          )

          this.get('repo').addExpense(newExpense);
          resolve(this.get('repo').findAll('expenses'));
        }

      })

      return updatedExpenses
    },

    editExpense(expense){
      this.get('repo').persist('expenses')
    },

    deleteExpense(expense){
      this.get('repo').deleteExpense(expense);
    },

    updateOutputOption(option){
      this.set('currentOutputOption', option);
    }
  }

});
