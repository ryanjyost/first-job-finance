import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),

  actions: {
    submitForm(){

      alert('Send Form')
      console.log("https://script.google.com/macros/s/AKfycbzjogAgxhOPc83PU2IWLznCHD7jOgpkurkU_GxBMfrQ_wC-PwI/exec")
    }
  }
});
