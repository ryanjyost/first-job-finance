import Ember from 'ember';

export default Ember.Component.extend({
  selected: null,

  init(){
    this._super(...arguments);

    let selected = this.get('selected');
    this.set('selected', selected);
  },

  didInsertElement(){
    let selected = this.get('selected');
    this.set('selected', selected)

    //set starting position of range thumb to equal repo value
    let select = this.$('.dropdown-select');
    select.val(selected);

  },

  change(){

    //set starting position of range thumb to equal repo value
    let select = this.$('.dropdown-select');
    let selected = select.val();

    this.get('update')(selected);
  }
});
