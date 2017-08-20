import Ember from 'ember';

export default Ember.Component.extend({
  sidebarOpen: true,
  currentList: [0,0], //[module, section]
  currentListData: null,

  currentListData: Ember.computed('model', 'currentList',function(){
    return this.get('model')[this.get('currentList')[0]].sections[this.get('currentList')[1]];
  }),

  actions: {
    toggleSidebar(){
      this.toggleProperty('sidebarOpen');
    },

    updateCurrentList(currentList){
      this.set('currentList', currentList)
    }
  }
});
