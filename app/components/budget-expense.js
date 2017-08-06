import Ember from 'ember';

export default Ember.Component.extend({
  name: '',
  amount: 0,
  infoLink: '',
  currentHover: false,

  init(){
    this._super(...arguments);
  },

  mouseEnter(){
    this.set('currentHover', true)
    return true;
  },

  focusIn(){
    this.set('currentHover', true)
    return true;
  },

  mouseLeave(){
    this.set('currentHover', false)
    return true;
  },

  name: Ember.computed('expense', function(){
    return this.get('expense').name;
  }),

  amount: Ember.computed('expense', function(){
    return this.get('expense').amount;
  }),

  infoLink: Ember.computed('expense', function(){
    return this.get('expense').infoLink;
  }),

  actions: {
    handleEditExpense(){
      let passUpEditedExpense = this.get('passUpEditedExpense');
      let expense = this.get('expense');

      passUpEditedExpense(expense);
    },

    handleDeleteExpense(){
     let passUpDeletedExpense = this.get('passUpDeletedExpense');

     let expense = this.get('expense');

     passUpDeletedExpense(expense);
    }
  }

});
