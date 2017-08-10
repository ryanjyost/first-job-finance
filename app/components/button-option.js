import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  type: 'button',
  classNames: ['button-group_option'],
  attributeBindings: ['type'],
  label: null,
  value: null,
  currentSelected: null,

  init(){
    this._super(...arguments);
  },

  didReceiveAttrs(){
    this._super(...arguments);

    const value = this.get('value');
    this.set('value', value);

    const currentSelected = this.get('currentSelected');
    this.set('currentSelected', currentSelected);
  },

  isSelected: Ember.computed('currentSelected', function(){
    return this.get('value') == this.get('currentSelected');
  }),

  click(){
    const value = this.get('value');
    this.set('currentSelected', value);
    this.get('select')(value); //pass value to update action in button group
  }
});
