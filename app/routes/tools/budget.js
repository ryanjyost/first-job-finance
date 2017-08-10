import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    let model = this.modelFor('application')
    return model;
  }

});
