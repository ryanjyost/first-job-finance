import Ember from 'ember';

export default Ember.Component.extend({

//===================
//Variables

name: '',
amount: 0,
infoLink: '',
currentHover: false,

name: Ember.computed('expense', function(){
  return this.get('expense').name;
}),

amount: Ember.computed('expense', function(){
  return this.get('expense').amount;
}),

infoLink: Ember.computed('expense', function(){
  return this.get('expense').infoLink;
}),


//===================
//Actions & Events

init(){
  this._super(...arguments);
},

mouseEnter(){
  this.set('currentHover', true)
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

    passUpEditedExpense(expense); //
  },

  handleDeleteExpense(){
   const passUpDeletedExpense = this.get('passUpDeletedExpense');
   const expense = this.get('expense');

   passUpDeletedExpense(expense);
  }
}

});
