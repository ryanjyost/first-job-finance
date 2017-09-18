import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  sidebarOpen: true,
  currentList: [1,1], //[module, section]
  currentListInfo: null,
  percentComplete: null,

  currentListInfo: computed('currentList', function(){
    //subract 1 because id always one more than index
    return this.get('checklistsInfo')[this.get('currentList')[0] - 1].sections[this.get('currentList')[1] - 1];
  }),

  _currentChecklistItemIDArray: computed.mapBy('currentListInfo.items', 'id'),

  init(){
    this._super(...arguments);

    const checklistItemsCompleted = this.get('checklistItemsCompleted');
    this.set('checklistItemsCompleted', checklistItemsCompleted);
  },

  didReceiveAttrs(){
    this._super(...arguments);

    const checklistItemsCompleted = this.get('checklistItemsCompleted');
    this.set('checklistItemsCompleted', checklistItemsCompleted);
  },

  actions: {
    toggleSidebar(){
      this.toggleProperty('sidebarOpen');
    },

    updateCurrentList(currentList){
      this.set('currentList', currentList)
    },

    updateProgressBar(){

    }
  }
});
