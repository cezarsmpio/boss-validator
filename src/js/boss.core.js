import validators from './boss.validators';
import messages from './boss.messages';

let Boss = {
  // Private attr
  _errorClassInput: 'boss--is-wrong',
  _errorClassSpan: 'boss--error',

  // Public attrs
  errors: [],
  sendErrors: true,

  // Public Methods
  validate: function (form, validations) {
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

        return reject(self.errors);
      }

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

module.exports = Boss;
