import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  itemsCompleted: null,
  percentComplete: null,

  init(){
    this._super(...arguments);

    const itemsCompleted = this.get('itemsCompleted');
    this.set('itemsCompleted', itemsCompleted);

    //this.set('percentComplete', this.get('percentComplete'));
  },

  didReceiveAttrs(){
    this._super(...arguments);

    const itemsCompleted = this.get('itemsCompleted');
    this.set('itemsCompleted', itemsCompleted);
  },

  actions:{
    handleUpdateProgressBar(){
      this.get('updateProgressBar')();
    }
  },

});
