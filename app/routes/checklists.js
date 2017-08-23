import Ember from 'ember';

export default Ember.Route.extend({
  repo: Ember.inject.service(),

  actions: {
    updateChecklistItemsCompleted(itemID, isComplete){
      // const updatedChecklistItemsCompleted = new Promise((resolve, reject) => {
        this.get('repo').updateChecklistItemsCompleted(itemID, isComplete);
      //   resolve(this.get('repo').findAll('checklistItemsCompleted'));
      // })
    }
  },

  model(){
    return this.modelFor('application');
  }
});
