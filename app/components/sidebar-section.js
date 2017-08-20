import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  selected: false,

  selected: Ember.computed('currentSection', function(){
    return this.get('currentSection')[0] === this.get('module') &&
      this.get('currentSection')[1] === this.get('section.id');
  }),

  click(){
    //current section coordinates [module id, section id]
    const clickedSection = [this.get('module'), this.get('section.id')];
    this.get('passUpCurrentSection')(clickedSection);
  }
});
