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
  //_currentChecklistItemIDArrayLength: computed('_currentChecklistItemIDArray')




  // percentComplete: computed('currentList', 'currentListInfo', '_currentChecklistItemIDArray', 'checklistItemsCompleted', function(){
  //   //subract 1 because id always one more than index
  //   const updatedItemsCompleted = this.get('checklistItemsCompleted');
  //   const currentChecklistItemIDArray = this.get('_currentChecklistItemIDArray');

  //   //console.log(currentChecklistItemIDArray)

  //   // const currentListItemsCompleted = updatedItemsCompleted.filter((itemID) =>{
  //   //   return currentChecklistItemIDArray.includes(itemID);
  //   // });

  //   const currentListItemsCompleted = [];

  //   for(let item of updatedItemsCompleted ){
  //     if(currentChecklistItemIDArray.includes(item)){
  //       currentListItemsCompleted.pushObject(item)
  //     }
  //   }

  //   console.log(currentListItemsCompleted);

  //   const percentComplete = currentListItemsCompleted.length / currentChecklistItemIDArray.length;

  //   //console.log(percentComplete)

  //   const progressBarLeft = this.$('.progress-bar--left');
  //   progressBarLeft.css("width", `${(percentComplete)*100}%`);

  //   const progressBarRight = this.$('.progress-bar--right');
  //   progressBarRight.css("width", `${(1 - percentComplete)*100}%`)

  //   return percentComplete;
  // }),

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


  // didInsertElement(){
  //   this._super(...arguments);

  //   const updatedItemsCompleted = this.get('checklistItemsCompleted');
  //   const currentChecklistItemIDArray = this.get('_currentChecklistItemIDArray');

  //   const currentListItemsCompleted = updatedItemsCompleted.filter((itemID) =>{
  //     return currentChecklistItemIDArray.includes(itemID);
  //   });

  //   const percentComplete = currentListItemsCompleted.length / currentChecklistItemIDArray.length;

  //   const progressBarLeft = this.$('.progress-bar--left');
  //   progressBarLeft.css("width", `${(percentComplete)*100}%`);

  //   const progressBarRight = this.$('.progress-bar--right');
  //   progressBarRight.css("width", `${(1 - percentComplete)*100}%`)

  // },

  actions: {
    toggleSidebar(){
      this.toggleProperty('sidebarOpen');
    },

    updateCurrentList(currentList){
      this.set('currentList', currentList)
    },

    updateProgressBar(){
      // const updatedItemsCompleted = this.get('checklistItemsCompleted');
      // const currentChecklistItemIDArray = this.get('_currentChecklistItemIDArray');

      // const currentListItemsCompleted = updatedItemsCompleted.filter((itemID) =>{
      //   return currentChecklistItemIDArray.includes(itemID);
      // });

      // const percentComplete = currentListItemsCompleted.length / currentChecklistItemIDArray.length;

      // this.set('percentComplete', percentComplete);

      // const progressBarLeft = this.$('.progress-bar--left');
      // progressBarLeft.css("width", `${(percentComplete)*100}%`);

      // const progressBarRight = this.$('.progress-bar--right');
      // progressBarRight.css("width", `${(1 - percentComplete)*100}%`)
    }
  }
});
