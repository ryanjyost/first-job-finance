import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  type: 'button',
  classNames: ['button-option'],
  attributeBindings: ['type'],
  label: null,
  value: null,
  currentSelected: null,

  init(){
    this._super(...arguments);
  },

  didReceiveAttrs(){
    this._super(...arguments);
    let value = this.get('value');
    this.set('value', value);

    let currentSelected = this.get('currentSelected');
    this.set('currentSelected', currentSelected);
  },

  isSelected: Ember.computed('currentSelected', function(){
    //console.log(this.get('currentSelected'));
    return this.get('value') == this.get('currentSelected');
  }),

  click(){
    let value = this.get('value');
    this.set('currentSelected', value);
    this.get('select')(value);
  }
});
