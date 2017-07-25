import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group'],
  buttons: [],
  currentSelected: null,

  init(){
    this._super(...arguments);
    this.errors = [];

    let currentSelected = this.get('currentSelected');
    //console.log(currentSelected);
    this.set('currentSelected', currentSelected);
  },

 didReceiveAttrs(){
    this._super(...arguments);
    this.errors = [];

    let currentSelected = this.get('currentSelected');
    //console.log(currentSelected);
    this.set('currentSelected', currentSelected);
 },

  actions:{
    handleSelect(value){
      this.set('selected', value);
      this.get('updateSelect')(value);
    }
  }

});
