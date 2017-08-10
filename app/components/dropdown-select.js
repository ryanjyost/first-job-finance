import Ember from 'ember';

export default Ember.Component.extend({
  selected: null,

  init(){
    this._super(...arguments);

    const selected = this.get('selected');
    this.set('selected', selected);
  },

  didInsertElement(){
    const selected = this.get('selected');
    this.set('selected', selected)

    //set initial selected option on dropdown
    const select = this.$('.dropdown-select');
    select.val(selected);
  },

  didReceiveAttrs(){
    this._super(...arguments);

    const selected = this.get('selected');
    this.set('selected', selected)
  },

  change(){
    const select = this.$('.dropdown-select');
    const selected = select.val();

    this.set('selected', selected)
    this.get('update')(selected);
  }
});
