import Ember from 'ember';

export default Ember.Component.extend({
  repo: Ember.inject.service(),
  isComplete: false,

  init(){
    this._super(...arguments);

    //mark as complete if localStorage array of items completed includes current item
    this.set('isComplete', this.get('itemsCompleted').includes(this.get('item').id));
  },

  click(){
    const isComplete = this.get('isComplete');
    const newStatus = isComplete === true ? false: true;

    this.set('isComplete', newStatus);

    this.get("handleUpdateItem")(this.get('item').id, newStatus);
    this.get("passUpUpdatedItem")(this.get('item').id, newStatus);
  },


});
