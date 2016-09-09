// Validators
(function(window, document) {
  const validators = {
    required: function (el) {
      return el.type === 'checkbox' || el.type === 'radio' ?
              el.checked :
              el.value.length;
    },
    minlength: function (el, length) {
      return el.value.length > length;
    },
    maxlength: function (el, length) {
      return el.value.length < length;
    },
    email: function (el) {
      let emailRegEx = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
      return el.value.match(emailRegEx) !== null;
    },
    regex: function (el, regex) {
      return el.value.match(regex) !== null;
    },
    exact: function (el, length) {
      return el.value.length == length;
    },
    number: function (el) {
      return el.value.match(/^[0-9]+$/g)
    },
    url: function (el, url) {
      let urlRegex = /^((((https?|ftps?|gopher|telnet|nntp):\/\/)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:]])?$/;
      return el.value.match(urlRegex) !== null;
    },
    https: function (el, valid) {
      let regex = valid ? /^https/ : /^(?!https)/

      return el.value.match(regex) !== null;
    },
    less: function (el, value) {
      return parseFloat(el.value) < value;
    },
    bigger: function (el, value) {
        return parseFloat(el.value) > value;
    },
    less_equal: function (el, value) {
      return parseFloat(el.value) <= value;
    },
    bigger_equal: function (el, value) {
        return parseFloat(el.value) >= value;
    },
    between: function (el, value) {
      if (this._typeof(value) === 'array') {
        let total = value.length;
        let val = parseFloat(el.value);

        for (let i = 0, t = total; i < t; ++i) {
          let pairs = value[i];
          let min = pairs[0];
          let max = pairs[1];

          if (val >= min && val <= max) {
            return true;
          }
        }

        return false;
      }

      throw new Error('Please, in "between" validator, provide an array at least two values.')
    },
    extensions: function (el, exts) {
      for (let i = 0, t = exts.length; i < t; ++i) {
        let ext = exts[i];

        if (el.value.indexOf(`.${ext}`) !== -1) return true;
      }
    },
    credit_card: function (el) {
      let ccRegex = /^3(?:[47]\d([ -]?)\d{4}(?:\1\d{4}){2}|0[0-5]\d{11}|[68]\d{12})$|^4(?:\d\d\d)?([ -]?)\d{4}(?:\2\d{4}){2}$|^6011([ -]?)\d{4}(?:\3\d{4}){2}$|^5[1-5]\d\d([ -]?)\d{4}(?:\4\d{4}){2}$|^2014\d{11}$|^2149\d{11}$|^2131\d{11}$|^1800\d{11}$|^3\d{15}$/;

      return el.value.match(ccRegex) !== null;
    },
    ip_v4: function (el) {
      let ipRegex = /^(?:(?:1\d{0,2}|[3-9]\d?|2(?:[0-5]{1,2}|\d)?|0)\.){3}(?:1\d{0,2}|[3-9]\d?|2(?:[0-5]{1,2}|\d)?|0)$/;

      return el.value.match(ipRegex) !== null;
    },
    ip_v6: function (el) {
      let ipRegex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

      return el.value.match(ipRegex) !== null;
    },
    alpha: function (el) {
      let regex = /^[a-zA-Z0-9]+$/;

      return el.value.match(regex) !== null;
    },
    starts: function (el, value) {
      return el.value.indexOf(value) === 0;
    },
    ends: function (el, value) {
      if (String.prototype.hasOwnProperty('endsWith')) {
        return el.value.endsWith(value);
      }
    }
  };

  const messages = {
    default: 'Please, fill this field.',
    required: 'This field is required.',
    minlength: 'Please, this field needs minimum {val} characters.',
    maxlength: 'Please, this field needs maximum {val} characters.',
    email: 'Please, provide a valid email address.',
    exact: 'Plase, this field needs to have {val} characters.',
    url: 'Please, provide a valid URL address with http:// or https://.',
    https: 'Your URL must starts with https://',
    less: 'The value needs to be less than {val}.',
    less_equal: 'The value needs to be less than or equal to {val}.',
    bigger: 'The value needs to be bigger than {val}.',
    bigger_equal: 'The value needs to be less than or equal to {val}.',
    between: 'The value must be between {val}',
    extensions: 'Please, upload a file with some of these extensions: {val}.',
    credit_card: 'Please, enter a valid credit card number.',
  };

  const Boss = {
    constructor: this,
    // Private attr
    _errorClassInput: 'boss--is-wrong',
    _errorClassSpan: 'boss--error',

    // Public attrs
    errors: [],
    sendErrors: true,

    // Public Methods
    validate: function (form, validations) {
      console.time('Validate');
      var self = this;
      self.form = form;
      self.errors = [];

      return new Promise(function (resolve, reject) {
        let vals = Object.keys(validations);

        for (let i = 0, t = vals.length; i < t; i++) {
          let name = vals[i];
          let el = form[name];
          let rules = validations[name];

          if (el) {
            Object.keys(rules).some(r => {
              if (('required' in rules) || el.value.length) {
                let validate = validators[r].bind(self);
                let rule = rules[r];
                let message = messages[r];
                let value = rule;

                if (self._typeof(rule) === 'object') {
                  message = rule.message;
                  value = rule.value;
                }

                if (!validate(el, value, rules)) {
                  self.errors.push({
                    el,
                    rule: r,
                    value,
                    message: message || messages['default']
                  });
                }
              }
            });
          }
        }

        if (self.errors.length) {
          if (self.sendErrors) self._sendErrors();

          console.timeEnd('Validate');
          return reject(self.errors);
        }

        console.timeEnd('Validate');

        return resolve();
      });
    },

    setErrorClass: function (className) {
      this._errorClassSpan = `${className} boss--error`;
    },

    // Private Methods
    _clearErrors: function () {
      let errorLabelElements = document.querySelectorAll('.boss--error');
      let errorInputElements = document.querySelectorAll('.boss--is-wrong');

      if (errorInputElements) {
        [].forEach.call(errorInputElements, el => {
          el.classList.remove(this._errorClassInput.split(' '));
        });
      }

      if (errorLabelElements) {
        [].forEach.call(errorLabelElements, el => {
          this._removeNode(el);
        });
      }
    },

    _sendErrors: function () {
      let errors = this.errors;

      this._clearErrors();

      for (let i = 0, t = errors.length; i < t; ++i) {
        this._appendError(errors[i]);
      }
    },

    _insertAfter: function (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    _removeNode: function (el) {
      el.parentElement.removeChild(el);
    },
    _appendError: function (err) {
      let label = document.createElement('label');

      label.innerText = this._supplant(err.message, {
        val: err.value.toString()
      });

      label.htmlFor = err.el.id || null;

      label.className = `${this._errorClassSpan} boss--error-${err.rule}`;

      err.el.classList.add(this._errorClassInput);

      this._insertAfter(label, err.el);
    },
    _supplant: function(str, o) {
      return str.replace(/{([^{}]*)}/g,function(a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    },
    _typeof: function (value) {
      return Object.prototype.toString
              .call(value)
              .replace(/(\[|\])/g, '')
              .split(' ')[1]
              .toLowerCase();
    }
  };

  window.Boss = Boss;
})(window, document);

let form = document.querySelector('#form');

let validations = {
  name: {
    required: true
  },
  age: {
    between: [[5, 10], [50, 70]]
  },
  photo: {
    required: true,
    extensions: ['jpg', 'png']
  },
  email: {
    email: true
  },
  cep: {
    regex: {
      value: /^\d{5}-\d{3}$|^\d{8}$/,
      message: 'Please, fill in this format 00.000-000.'
    }
  },
  renavam: {
    exact: 10,
    number: true
  },
  url: {
    required: true,
    url: true,
    https: true
  },
  terms: {
    required: true
  },
  cc: {
    credit_card: true
  }
};

form.addEventListener('submit', e => {
  let validate = Boss.validate(form, validations);

  validate.catch(err => {
    e.preventDefault();
  });
});
