import Ember from 'ember';

const { inject } = Ember;


export default Ember.Route.extend({
  repo: inject.service(),

  actions: {

    createExpense(type, name, amount){
       const updatedExpenses = new Promise((resolve, reject) => {

        if(!type){
          reject('no type specified')
        } else {
          const newExpense = Ember.Object.create(
            { expenseType: type,
              name: name || '',
              amount: amount || 0,
            }
          )

          this.get('repo').addExpense(newExpense);
          resolve(this.get('repo').findAll('expenses'));
        }
      })

      return updatedExpenses;
    },

    editExpense(expense){
      this.get('repo').persist('expenses');
    },

    deleteExpense(expense){
      this.get('repo').deleteExpense(expense);
    },
  },

  model(){
    return this.modelFor('application');
  }

});
