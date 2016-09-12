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
    return el.value.match(/^[0-9]+$/g);
  },
  url: function (el, url) {
    let urlRegex = /^((((https?|ftps?|gopher|telnet|nntp):\/\/)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:]])?$/;
    return el.value.match(urlRegex) !== null;
  },
  https: function (el, valid) {
    let regex = valid ? /^https/ : /^(?!https)/;

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

    throw new Error('Please, in "between" validator, provide an array at least two values.');
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
    return el.value.endsWith(value);
  }
};

export default validators;
