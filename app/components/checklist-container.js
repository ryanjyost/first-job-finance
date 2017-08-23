import Ember from 'ember';

export default Ember.Component.extend({
  sidebarOpen: true,
  currentList: [1,1], //[module, section]
  currentListInfo: null,
  listLength: null,
  currentListPercentComplete: null,

  listLength: Ember.computed('checklistItemsCompleted', function(){
    return this.get('checklistItemsCompleted').length;
  }),

  currentListInfo: Ember.computed('currentList', function(){
    //subract 1 because id always one more than index
    return this.get('checklistsInfo')[this.get('currentList')[0] - 1].sections[this.get('currentList')[1] - 1];
  }),

  currentListPercentComplete: Ember.computed('currentListInfo', 'checklistItemsCompleted', function(){
    // console.log("====>>>>", this.get('currentListInfo'))
    return this.get('checklistItemsCompleted');
  }),

  // didReceiveAttrs(){
  //   this._super(...arguments);

  //   const checklistItemsCompleted = this.get('model').checklistItemsCompleted;
  //   this.set('checklistItemsCompleted', checklistItemsCompleted);
  // },


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

    // updateChecklistItemsCompleted(itemID, isComplete){
    //   this.get('updateChecklistItemsCompleted')(itemID, isComplete).then((newList) => {
    //     this.set('checklistItemsCompleted', newList);
    //   });
    // }
  }
});
