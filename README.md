# boss-validator

> The simplest library to validate data or forms.

```html
<form id="contact">
  <input type="text" name="fullname" placeholder="Your full name" />
  <input type="email" name="email" placeholder="Valid emails adress" />
  <input type="number" name="age" placeholder="Your age" />
  <textarea name="message" placeholder="Your message"></textarea>

  <button>Send!</button>
</form>

<script>
  var form = document.querySelector('#contact');

  var rules = {
    fullname: {
      required: true,
      minlength: 2,
      maxlength: 60
    },
    email: {
      required: true,
      email: true
    },
    age: {
      bigger_equal: 18,
      number: true
    },
    message: {
      required: true,
      minlength: 5,
      maxlength: 2000
    }
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    Boss
      .validate(form, rules)
      .then(() => {
        console.log('Form is valid!');
      })
      .catch(errors => {
        console.log('Oops..! Form is invalid, please review it.');
      });
  });
</script>
```

## Index

* [Installation](#installation)
* [Validators](#validators)
* [Messages](#messages)
* [Transforms](#transforms)
* [Methods](#methods)
* [TODO](#todo)
* [Browser Support](#browser-support)

## Installation

#### npm
```
npm install boss-validator
```
#### bower
```
bower install boss-validator
```

#### CDN
```html
<script src="https://cdn.rawgit.com/cezarlz/boss/master/dist/js/boss.min.js"></script>
```

## Validators

### Defaults

* required

### Numbers

* less
* less_equal
* bigger
* bigger_equal
* between

### Strings

* exact
* minlength
* maxlength
* extensions - For upload inputs
* starts
* ends
* contains

### Booleans

* boolean

### Regex

* email
* regex - Create a custom regex
* url
* https
* credit_card
* ip_v4
* ip_v6
* alpha_numeric
* alpha

## Messages

Each validator has a specific error message, so as to provide verbosity. Although, there is also a default message for cases where there isn't a specific message for that validator. This is the `default` and you can override it.

```javascript
const messages = {
  default: 'Please fill in this field.',
  required: 'This field is required.',

  // Numbers, Sizes
  less: 'The value needs to be less than {val}.',
  less_equal: 'The value needs to be less than or equal to {val}.',
  bigger: 'The value needs to be bigger than {val}.',
  bigger_equal: 'The value needs to be less than or equal to {val}.',
  between: 'The value must be between {val}',
  number: 'Please enter a valid number.',


  // Strings
  exact: 'Must contain the following characters: {val}',
  extensions: 'Please upload a file with the following extensions: {val}.',
  contains: 'Must contain the following value: {val}.',
  minlength: 'Must be at least {val} characters long.',
  maxlength: 'Must be less than {val} characters long.',
  starts: 'This field should start with "{val}".',
  ends: 'This field should end with "{val}".',

  // Booleans
  boolean: 'This field needs to be "true" or "false".',

  // Regex
  email: 'Please provide a valid email address. (ex: user@gmail.com)',
  url: 'Please provide a valid URL address with http:// or https://',
  https: 'Your URL must start with https://',
  credit_card: 'Please enter a valid credit card number.',
  ip_v4: 'Please enter a valid IPV4 address. (ex: 172.16.254.1)',
  ip_v6: 'Please enter a valid IPV6 address. (ex: 3ffe:1900:4545:3:200:f8ff:fe21:67cf)',
  alpha: 'Only letters are allowed.',
  alpha_numeric: 'No special characters allowed, just numbers and letters.',
};
```

By the way, we have some pre-defined messages in other languages. The languages supported are:

* English (Default)
* German (Standard) - _Translation needed_
* Spanish - _Translation needed_
* French - _Translation needed_
* Italian - _Translation needed_
* Japanese - _Translation needed_
* Brazilian Portuguese - _Translation needed_
* Russian - _Translation needed_
* Chinese - _Translation needed_

**If you want to help us with the translations, please just open a PR :)**

## Transforms

Transforms are a way to change the data of your form or object. You can call it using the mehotd `transform` or passing a filter params when you use the `validate` method.

It's simple, take a look:

```javascript
let transformedData = Boss.transform(yourData, {
  name: ['trim', 'uppercase'], // array of filters
  key: ['trim', 'base64_encode'],
  html: ['html_escape']
});

// or...

Boss.validate(yourData, rules, transforms)
  .then(data => {
    console.log(data.transformed); // Filtered data
    console.log(data.source); // Original data
  });
```

The transforms available are:

* `trim`
* `uppercase` and `lowercase`
* `base64_encode` and `base64_decode`
* `urlencode` and `urldecode`
* `json_parse`
* `slug`
* `html_escape` and `html_unescape`


## Methods

### Boss.validate(form, rules [, transforms])

### Boss.validate(object, rules [, transforms])

For each object in `object`, there must be a `value` property.

```javascript
let fields = {
  ip: {
    value: '192.168.0.1'
  }
};

let rules = {
  ip: {
    ip_v4: true
  }
};

Boss.validate(fields, rules);
```

If you want, you can override and create custom messages at the moment of validation. You just need to pass an object with the properties `value` and `message`.

```javascript
let form = document.querySelector('#contact-form');

let rules = {
  email: {
    required: true,
    email: {
      value: true,
      message: 'Introduzca una dirección de correo electrónico válida.'
    }
  },
  cep: {
    required: {
      value: true,
      message: 'Por favor, este campo é obrigatório.'
    },
    regex: {
      value: /^\d{2}\.\d{3}-\d{3}$/,
      message: 'O CEP deve ser preenchido no seguinte formato: 00.000-00.'
    }
  }
};

Boss.validate(form, rules);
```

### Boss.transform(data, transforms)

Returns the filtered data.

### Boss.configure(object)

```javascript
// Default values
Boss.configure({
  errorElement: 'label',
  apeendErrors: true // Append the error after the input
});
```

### Boss.configureMessages(object)

You can simply override existing validation messages or create new ones.

```javascript
Boss.configureMessages({
  default: 'You shall not pass!',
  required: 'Dude, please!',
  my_custom_validator: 'Your name is not <strong>Gandalf</strong>.'
});
```

### Boss.loadLanguage(language)

You can create and override an idiom to another. `boss-validator` loads by default the language `en-US`, but if you need, we have others languages: German, Spanish, French, Italian, Japanese, Brazilian Portuguese, Russian and Chinese. Some of them need of translation, if you want to help, please contribute.

```javascript
import { ja } from 'boss-validator/js/languages/all';

Boss.loadLanguage(japanese);

// or

import { it } from 'boss-validator/js/languages/all';

Boss.loadLanguage(it);
```

The `loadLanguage` method is "async", that is, you can call at anytime and the next validation will be using the new language. This method is an alias to `Boss.configureMessages`.

### Boss.addValidator(object)

Power to create custom validators. Easy.

```javascript
Boss.addValidator({
  name: 'my_custom_validator',
  validator: function (el, value, rule) {
    return el.value === 'Gandalf';
  }
});

Boss.validate(form, {
  nickname: {
    my_custom_validator: true
  }
});
```

You can even create a validator and pass along its message.

```javascript
Boss.addValidator({
  name: 'long_name',
  validator: function (el) {
    return el.value.length >= 50;
  },
  message: 'Your name is not long!'
});

Boss.validate(form, {
  fullname: {
    validator: true
  }
});
```

### Boss.setErrorClass(className)

```javascript
Boss.setErrorClass('error__field');
```

## TODO

Why not to help?

- [x] :rocket:
- [x] Publish on `npm install -i boss-validator` and `bower install boss-validator`
- [x] Improve and review the messages
- [x] Create filters
- [ ] Create a easy way to extend I18n messages
- [ ] Create unit tests !important
- [ ] Create more useful validators
- [ ] Improve this documentation
- [ ] Create gh-pages branch
- [ ] Create a logo

## Browser Support

The lib `boss-validator` needs to support these features:

* `Object.keys`
* `Promise`
* `String.prototype.endsWith`
* `Element.prototype.classList`
* `Object.assign`

If you aren't sure about these features, please, use this smart polyfill:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Object.keys,Promise,String.prototype.endsWith,Element.prototype.classList,Object.assign"></script>
```

---

Made with :heart: by community!
