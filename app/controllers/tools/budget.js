import Ember from 'ember';

let { computed, inject } = Ember

export default Ember.Controller.extend({
  monthlyTakeHomePay: null,
  budgetSurplus: null,
  repo: inject.service(),

  _amountStringArray: computed.mapBy('model.expenses', 'amount'),

  expenseAmountArray: computed.map('_amountStringArray', (numString) => {
    return Number(numString);
  }),

  totalMonthlyExpenses: computed.sum('expenseAmountArray'),

  budgetSurplus: computed('model.expenses','totalMonthlyExpenses', 'model.monthlyTakeHomePay', function(){
    return (this.get('model.monthlyTakeHomePay') - this.get('totalMonthlyExpenses'));
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
  }

});
