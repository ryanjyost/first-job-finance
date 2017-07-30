import Ember from 'ember';

export default Ember.Route.extend({
  finance: Ember.inject.service(),

  actions: {
    fedTaxWithholding(){
      let skoosh = this.get('finance').testing
      alert('ryan')
    },
  }
});
