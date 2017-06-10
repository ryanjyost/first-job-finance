import Ember from 'ember';

export default Ember.Controller.extend({
  repo: Ember.inject.service(),

  actions: {
    createExpense(type){
      console.log(`Creating ${type} Expense`)

       let updatedExpenses = new Promise((resolve, reject) => {

        if(!type){
          reject('no type specified')
        } else{
          let newExpense = Ember.Object.create(
            { expenseType: type,
              name: '',
              amount: 0,
              infoLink: ''}
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
