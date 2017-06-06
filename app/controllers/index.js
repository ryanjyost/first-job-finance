import Ember from 'ember';

export default Ember.Controller.extend({
  repo: Ember.inject.service(),

  fixedExpenses: Ember.computed('expenses', function(){
    console.log('Skoosh', this.get('expenses'));
    return this.get('expenses').filter(function(item){
      return item.expenseType == 'fixed'
    })
  }),

  actions: {
    createExpense(type){
      console.log(`Adding ${type} Expense`)

       let updatedExpenses = new Promise((resolve, reject) => {

        if(!type){
          reject('no type specified')
        } else{
          let newExpense = Ember.Object.create(
            {
              expenseType: type,
              name: '',
              amount: 0,
              infoLink: '',
              portalLink: '',
              autoPay: false
            }
          )

          this.get('repo').add(newExpense);
          resolve(this.get('repo').findAll());
        }

      })

      return updatedExpenses
    }
  }

});
