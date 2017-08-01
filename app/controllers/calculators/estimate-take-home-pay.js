import Ember from 'ember';

export default Ember.Controller.extend({

  finance: Ember.inject.service(),

  //constants
  payFrequencyButtons: [{label: 'monthly', value: 'monthly'},{label: 'semi-monthly', value: 'semi-monthly'},{label: 'bi-weekly', value: 'bi-weekly'},{label: 'weekly', value: 'weekly'}],

  incomeTypeButtons: [{label: 'hourly', value: 'hourly'},{label: 'salary', value: 'salary'}],

  listOfStates: ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"
                ],

  fedTaxWithholdingMonthly: Ember.computed('model.annualIncome', function(){
    let annualIncome = this.get('model.annualIncome');

    let result = this.get('finance').fedTaxWithholding(annualIncome, 0.05, 1, "semi-monthly")

    return result;
  }),

  currentStateName: Ember.computed('model.stateIndex', function(){
    let listOfStates = this.get('listOfStates'),
        stateIndex = this.get('model.stateIndex')

    return listOfStates[stateIndex];
  }),


  maxPreTaxSavingsRate: Ember.computed(
    'model.employerPlanDeferralRate',
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      let rate = this.get('model.employerPlanDeferralRate'),
          annualIncome = this.get('model.annualIncome'),
          incomeType = this.get('model.incomeType'),
          hourlyWage = this.get('model.hourlyWage'),
          workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
          workingWeeksPerYear = this.get('model.workingWeeksPerYear');

        if(incomeType === "hourly"){
          let annualIncome = hourlyWage*workingHoursPerWeek*workingWeeksPerYear;

          if(annualIncome - 18000 < 0)
            return 1

          return 18000/annualIncome;
        }

        //max of gross annual income or $18,000
        if(annualIncome - 18000 < 0){
          return 1
        }

        //percentage of income that can be contributed to pre-tax employer plan
        return 18000/annualIncome;
  }),

  employerPlanDeferralAmount: Ember.computed(
    'model.employerPlanDeferralRate',
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      let rate = this.get('model.employerPlanDeferralRate'),
          annualIncome = this.get('model.annualIncome'),
          incomeType = this.get('model.incomeType'),
          hourlyWage = this.get('model.hourlyWage'),
          workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
          workingWeeksPerYear = this.get('model.workingWeeksPerYear');

       if(incomeType === "hourly"){
        return (hourlyWage*workingHoursPerWeek*workingWeeksPerYear)*rate || 0;
       } else{
        return annualIncome*rate || 0;
       }
  })

});
