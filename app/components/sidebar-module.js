import Ember from 'ember';

export default Ember.Component.extend({
  showSections: true,

  actions: {
    toggleShowSections(){
      this.toggleProperty('showSections');
    },

    handleUpdateCurrentSection(clickedSection){
      this.get('passUpCurrentSection')(clickedSection);
    }
  }

});
