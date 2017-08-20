import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleUpdateCurrentSection(clickedSection){
      this.get('updateCurrentSection')(clickedSection);
    }
  }

});
