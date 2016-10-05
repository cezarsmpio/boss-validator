let v = require('./boss.validators');
let m = require('./boss.messages');
let f = require('./boss.filters');

let Boss = {
  // Private attr
  _errorClassInput: 'boss--is-wrong',
  _errorClassSpan: 'boss--error',

  // Public attrs
  errors: [],
  options: {
    appendErrors: true,
    errorElement: 'label'
  },
  validators: v,
  messages: m,

  // Public Methods
  configure: function(newOptions) {
    this.options = Object.assign({}, this.options, newOptions);
  },

  configureMessages: function (msgs) {
    try {
      if (this._typeof(msgs) !== 'object') {
        throw new Error('configureMessages: Please, your messages needs to be an object of keys and values (string).');
      }

      this.messages = Object.assign({}, this.messages, msgs);
    }
    catch (err) {
      console.error(err.getMessage());
    }
  },

  addValidator: function (v) {
    this.validators[v.name] = v.validator.bind(this);
    this.messages[v.name] = v.message || false;
  },

  validate: function (form, validations) {
    var self = this;
    self.form = form;
    self.errors = [];

    return new Promise(function (resolve, reject) {
      let vals = Object.keys(validations);

      for (let i = 0, t = vals.length; i < t; i++) {
        let name = vals[i];
        let el = form[name];

        if (el) {
          let rules = validations[name];
          let rulesKeys = Object.keys(rules);

          for (let j = 0, tt = rulesKeys.length; j < tt; j++) {
            let r = rulesKeys[j];

            if ((rules.hasOwnProperty('required')) || el.value.length) {
              let validate = self.validators[r];
              let rule = rules[r];
              let message = self.messages[r];

              if (self._typeof(rule) === 'object') {
                message = rule.message;
                value = rule.value;
              }

              if (!validate.call(self, el, rule, rules)) {
                if (r == 'between') {
                  let transformation = '';

                  for(let i = 0, t = rule.length; i < t ; ++i) {
                    transformation += rule[i].join(' and ');
                    if (i != t - 1) {
                      transformation += ' or ';
                    }
                  }

                  rule = transformation;
                }
                self.errors.push({
                  el,
                  rule: r,
                  value: rule,
                  message: self._supplant(message || self.messages['default'], {
                    val: rule.toString()
                  })
                });
              }
            }
          } // end for
        } // end if
      } // end for

      if (self._typeof(form) === 'htmlformelement' && self.options.appendErrors) {
        self._appendErrors();
      }

      if (self.errors.length) return reject(self.errors);

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

  _appendErrors: function () {
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
    let label = document.createElement(this.options.errorElement || 'label');

    label.innerHTML = this._supplant(err.message, {
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

module.exports = Boss;
