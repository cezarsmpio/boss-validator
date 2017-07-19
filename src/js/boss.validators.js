const validators = {
  required: function (el) {
    return 'type' in el && (el.type === 'checkbox' || el.type === 'radio') ?
            el.checked :
            (typeof el.value === 'string') ? !!el.value.length : false;
  },

  // Numbers, Sizes
  number: function (el) {
    return el.value.match(/^[0-9]+$/g);
  },
  less: function (el, value) {
    return !!parseFloat(el.value) ? parseFloat(el.value) < value : false;
  },
  bigger: function (el, value) {
    return !!parseFloat(el.value) ? parseFloat(el.value) > value : false;
  },
  less_equal: function (el, value) {
    return !!parseFloat(el.value) ? parseFloat(el.value) <= value : false;
  },
  bigger_equal: function (el, value) {
    return !!parseFloat(el.value) ? parseFloat(el.value) >= value : false;
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

    throw new Error('"between" validator needs an array of at least one array of two values.');
  },

  // Strings
  exact: function (el, length) {
    if (typeof el.value !== 'string') return false;

    return el.value.length == length;
  },
  minlength: function (el, length) {
    if (typeof el.value !== 'string') return false;

    return el.value.length >= length;
  },
  maxlength: function (el, length) {
    if (typeof el.value !== 'string') return false;

    return el.value.length <= length;
  },
  extensions: function (el, exts) {
    for (let i = 0, t = exts.length; i < t; ++i) {
      let ext = exts[i];

      if (el.value.indexOf(`.${ext}`) !== -1) return true;
    }
  },
  starts: function (el, value) {
    return el.value.indexOf(value) === 0;
  },
  ends: function (el, value) {
    return el.value.endsWith(value);
  },
  contains: function (el, value) {
    return el.value.indexOf(value) >= 0;
  },

  // Booleans
  boolean: function (el) {
    let bool = String(el.value);

    return bool === 'true' || bool === 'false';
  },

  // Regex
  email: function (el) {
    let emailRegEx = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
    return el.value.match(emailRegEx) !== null;
  },
  regex: function (el, regex) {
    return el.value.match(regex) !== null;
  },
  url: function (el, url) {
    let urlRegex = /^((((https?|ftps?|gopher|telnet|nntp):\/\/)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:]])?$/;
    return el.value.match(urlRegex) !== null;
  },
  https: function (el, valid) {
    let regex = valid ? /^https/ : /^(?!https)/;

    return el.value.match(regex) !== null;
  },
  credit_card: function(el) {
    /* jshint expr: true */
    let cardNumber = String(el.value);
    let b,c,d,e;

    for(d = +cardNumber[b = cardNumber.length-1], e=0; b--;)
      c = +cardNumber[b], d += ++e % 2 ? 2 * c % 10 + (c > 4) : c;
    return (d%10) === 0;
  },
  ip_v4: function (el) {
    let ipRegex = /^(?:(?:1\d{0,2}|[3-9]\d?|2(?:[0-5]{1,2}|\d)?|0)\.){3}(?:1\d{0,2}|[3-9]\d?|2(?:[0-5]{1,2}|\d)?|0)$/;

    return el.value.match(ipRegex) !== null;
  },
  ip_v6: function (el) {
    let ipRegex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    return el.value.match(ipRegex) !== null;
  },
  alpha_numeric: function (el) {
    let regex = /^[a-zA-Z0-9]+$/;

    return el.value.match(regex) !== null;
  },
  alpha: function (el) {
    let regex = /^[a-zA-Z]+$/;

    return el.value.match(regex) !== null;
  },
};

module.exports = validators;
