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

          this.get('repo').add(newExpense);
          resolve(this.get('repo').findAll());
        }

      })

      return updatedExpenses
    },

    editExpense(expense){
      this.get('repo').persist()
    },

    deleteExpense(expense){
      this.get('repo').delete(expense);
    },
  }

});
