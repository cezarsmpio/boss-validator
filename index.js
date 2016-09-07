// Validators
(function(window, document) {
  const validators = {
    required: function (el) {
      return el.value.length;
    },
    minlength: function (el, length) {
      return el.value.length > length;
    },
    maxlength: function (el, length) {
      return el.value.length < length;
    },
    email: function (el) {
      return el.type === 'email';
    }
  };

  const messages = {
    required: 'This field is required.',
    minlength: 'Please, this field needs minimum {val} characters.',
    maxlength: 'Please, this field needs maximum {val} characters.',
    email: 'Please, provide a valid email.'
  };

  const Boss = {
    constructor: this,
    errorClass: 'boss--error',

    messages,
    validators,

    validate: function (form, validations) {
      this.form = form;

      [].forEach.call(form, el => {
        let { name, type } = el;
        let rules = validations[name];

        if (rules) {
          Object.keys(rules).forEach(rule => {
            let validate = validators[rule];

            if (!validate(el, rules[rule])) {
              this.helpers.appendError.call(this, el, rule, rules[rule]);
            }
          });
        }
      });
    },
    setErrorClass: function (className) {
      this.errorClass = `${className} boss--error`;
    },

    helpers: {
      insertAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      },
      appendError: function (el, rule, ruleValue) {
        let span = document.createElement('span');
        span.innerText = this.helpers.supplant(this.messages[rule], {
          val: ruleValue
        });
        span.className = `${this.errorClass} boss-error-${rule}`;

        this.helpers.insertAfter(span, el);
      },
      supplant: function(str, o) {
        return str.replace(/{([^{}]*)}/g,function(a, b) {
          var r = o[b];
          return typeof r === 'string' || typeof r === 'number' ? r : a;
        });
      }
    }
  };

  window.Boss = Boss;
})(window, document);

Boss.nass = 'Limite do front-end';

let form = document.querySelector('#form');

let validations = {
  name: {
    required: true,
    minlength: 10,
    maxlength: 20
  },
  email: {
    required: true,
    email: true
  }
};

Boss.validate(form, validations);
