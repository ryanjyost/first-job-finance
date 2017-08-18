import Ember from 'ember';

let { computed, inject } = Ember

export default Ember.Controller.extend({
  repo: inject.service(),

  expenses: null,
  monthlyTakeHomePay: null,
  budgetSurplus: null,
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
  defaultExpenses: [
    {id:"exp_1", expenseType:"fixed", name: 'Skoosh', amount: 1000},
  ],


  //=================================
  // Output view toggling

  currentOutputOption: 'breakdown',
  budgetOutputOptions: [{label: 'breakdown', value: 'breakdown'},{label: 'Surplus / Deficit', value: 'surplus'}],

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
    updateOutputOption(option){
      this.set('currentOutputOption', option);
    }
  }

});
