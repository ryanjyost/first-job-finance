import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  itemsCompleted: null,
  percentCompleted: null,
  percentIncomplete: null,

  init(){
    this._super(...arguments);

    const itemsCompleted = this.get('itemsCompleted');
    this.set('itemsCompleted', itemsCompleted);
  },

   didReceiveAttrs(){
    this._super(...arguments);

    const itemsCompleted = this.get('itemsCompleted');
    this.set('itemsCompleted', itemsCompleted);
  },

   didInsertElement(){
    this._super(...arguments);

    const itemsCompleted = this.get('itemsCompleted');
    const currentChecklistItemIDArray = this.get('_currentChecklistItemIDArray');

    const currentListItemsCompleted = itemsCompleted.filter((itemID) =>{
      return currentChecklistItemIDArray.includes(itemID);
    });

    const percentCompleted = currentListItemsCompleted.length / currentChecklistItemIDArray.length;
    const percentIncomplete = 1 - percentCompleted;

    this.set('percentCompleted', percentCompleted);
    this.set('percentIncomplete', percentIncomplete);

    const progressBarLeft = this.$('.progress-bar--left');
    progressBarLeft.css("width", `${(percentCompleted)*100}%`);

    const progressBarRight = this.$('.progress-bar--right');
    progressBarRight.css("width", `${(percentIncomplete)*100}%`)

  },



  actions:{
    updateProgressBar(itemID, isComplete){
      const updatedItemsCompleted = this.get('itemsCompleted');
      const currentChecklistItemIDArray = this.get('_currentChecklistItemIDArray');

      const currentListItemsCompleted = updatedItemsCompleted.filter((itemID) =>{
        return currentChecklistItemIDArray.includes(itemID);
      });

      const percentCompleted = currentListItemsCompleted.length / currentChecklistItemIDArray.length;
      const percentIncomplete = 1 - percentCompleted;

      this.set('percentCompleted', percentCompleted);
      this.set('percentIncomplete', percentIncomplete);


      const progressBarLeft = this.$('.progress-bar--left');
      progressBarLeft.css("width", `${(percentCompleted)*100}%`);

      const progressBarRight = this.$('.progress-bar--right');
      progressBarRight.css("width", `${(percentIncomplete)*100}%`)
    }
  },


  _currentChecklistItemIDArray: computed.mapBy('checklistInfo.items', 'id'),

  // _completedItemsInCurrentChecklist: computed('_currentChecklistItemIDArray', 'itemsCompleted', function(){
  //   console.log(this.get('_currentChecklistItemIDArray'))
  //   return 7
  // }),


  // percentCompleted: Ember.computed('itemsCompleted', function(){
  //   const checklistInfo = this.get('checklistInfo');

  //   //make an array of item id's in this current checklist
  //   const checklistItemsIDArray = checklistInfo.items.map((item) => {
  //     return item.id;
  //   });

  //   //make an array of id's of completed items that are in the current list
  //   const itemsCompletedInCurrentChecklist = this.get('itemsCompleted').filter((itemID) => {
  //     return checklistItemsIDArray.includes(itemID);
  //   });

  //   const percentCompleted = (itemsCompletedInCurrentChecklist.length)/(checklistItemsIDArray.length);
  //   //console.log(percentCompleted)

  //   const progressBarLeft = this.$('.progress-bar--left');
  //   progressBarLeft.css("width", "25%");

  //   const progressBarRight = this.$('.progress-bar--right');
  //   progressBarRight.css("width", `${(1 - 0.5)*100}%`)

  //   return 0.25;
  // }),


});
