import Ember from 'ember';

const { computed } = Ember

export default Ember.Component.extend({

//===================
//Variables

//needed to calculate total expenses for percentOfTotal
_amountStringArray: null,
amountArray: null,
totalExpenses: null,

name: '',
amount: 0,
percentOfTotal: 0,
currentHover: false,


name: computed('expense', function(){
  return this.get('expense').name;
}),

amount: computed('expense', function(){
  return this.get('expense').amount;
}),

percentOfTotal: computed('amount', 'totalExpenses', function(){
  return (this.get('amount')/this.get('totalExpenses')) || 0;
}),


//===================
//Actions & Events

init(){
  this._super(...arguments);
},

mouseEnter(){
  this.set('currentHover', true)

  const expenses = this.get('model');
  this.set('expenses', expenses);
},

focusIn(){
  this.set('currentHover', true)
},

mouseLeave(){
  this.set('currentHover', false)
},

actions: {
  handleEditExpense(){
    const passUpEditedExpense = this.get('passUpEditedExpense');
    const expense = this.get('expense');

    this.set('amount', expense.amount);

    passUpEditedExpense(expense);
  },

  handleDeleteExpense(){
   const passUpDeletedExpense = this.get('passUpDeletedExpense');
   const expense = this.get('expense');

   passUpDeletedExpense(expense);
  }
}

});
