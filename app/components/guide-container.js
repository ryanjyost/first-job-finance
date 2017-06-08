import Ember from 'ember';

export default Ember.Component.extend({
  sidebarOpen: true,
  actions: {
    toggleSidebar(){
      this.toggleProperty('sidebarOpen');
    }
  }
});
