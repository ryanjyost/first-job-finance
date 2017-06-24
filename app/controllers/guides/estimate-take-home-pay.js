import Ember from 'ember';

export default Ember.Controller.extend({
  repo: Ember.inject.service(),
  skoosh: 'skoo!sh',

  guideInfo: {
      title: 'Estimate Take-Home Pay Before Your First Paycheck',
      link: 'guides.estimate-take-home-pay',
      modules: [

        //1. Gross Income
        { title: 'Start with Gross Income',
          link: 'guides.estimate-take-home-pay.module1.section1',
          sections: [
            { title: 'Gross Income - What it is & Why It Matters',
              link: 'guides.estimate-take-home-pay.module1.section1'
            },
            { title: 'Salary or hourly?', // explain if other!
              link: 'guides.estimate-take-home-pay.module1.section2'
            },
            { title: 'Your gross income',
              link: 'guides.estimate-take-home-pay.module1.section3'
            },
            { title: 'Payroll period - how frequently you\'re paid',
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
        ]},

        //2. Take out pre-tax retirement savings
        { title: 'Pre-tax retirement savings',
          link: 'guides.estimate-take-home-pay.module1.section1',
          sections: [
            { title: '\"Pre-tax\" - what it is and why it matters',
              link: 'guides.estimate-take-home-pay.module1.section1'
            },
            { title: 'Types of Employer-Provided Plans',
              link: 'guides.estimate-take-home-pay.module1.section2'
            },
            { title: 'What about an IRA?', // unless you have Payroll deduction, use after-tax and deduct on taxes
              link: 'guides.estimate-take-home-pay.module1.section3'
            },
            { title: 'Employer Matching contribution',
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
            { title: 'Your pre-tax retirement savings',
              link: 'guides.estimate-take-home-pay.module1.section4'
            }
        ]},


        //3. Take out any pre-tax benefits
        { title: 'Pre-tax employee benefits',
          link: 'guides.estimate-take-home-pay.module1.section1',
          sections: [
            { title: 'Retirement Savings',
              link: 'guides.estimate-take-home-pay.module1.section2'
            },
            { title: 'Flexible Spending Account / Cafeteria Plan',
              link: 'guides.estimate-take-home-pay.module1.section3'
            },
            { title: 'Medical Insurance & Health Savings Accounts',
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
            { title: 'Other pre-tax benefits',
              link: 'guides.estimate-take-home-pay.module1.section4'
            }
        ]},

        //4. Taxes
        { title: 'Brace yourself for taxes',
          link: 'guides.estimate-take-home-pay.module1.section1',
          sections: [
            { title: 'Tax withholding - what it is & why it matters',
              link: 'guides.estimate-take-home-pay.module1.section2'
            },
            { title: 'Federal Income Tax Withholding',
              link: 'guides.estimate-take-home-pay.module1.section3'
            },
            { title: 'State Income Tax Withholding', // mention city too
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
            { title: 'FICA Taxes',
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
            { title: 'Your total tax withholding',
              link: 'guides.estimate-take-home-pay.module1.section4'
            }
        ]},

        //4. Take-Home Pay
        { title: 'Your estimated take-home pay',
          link: 'guides.estimate-take-home-pay.module1.section1',
          sections: [
            { title: 'Tax withholding - what it is & why it matters',
              link: 'guides.estimate-take-home-pay.module1.section2'
            },
            { title: 'Federal Income Tax Withholding',
              link: 'guides.estimate-take-home-pay.module1.section3'
            },
            { title: 'State Income Tax Withholding', // mention city too
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
            { title: 'FICA Taxes',
              link: 'guides.estimate-take-home-pay.module1.section4'
            },
            { title: 'Your total tax withholding',
              link: 'guides.estimate-take-home-pay.module1.section4'
            }
        ]},
      ]
    }
});
