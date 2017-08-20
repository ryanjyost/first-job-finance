import Ember from 'ember';

export default Ember.Component.extend({
  sidebarOpen: true,
  currentSection: [1,1],

  actions: {
    toggleSidebar(){
      this.toggleProperty('sidebarOpen');
    },

    updateCurrentSection(currentSection){
      this.set('currentSection', currentSection)
    }
  }
});
