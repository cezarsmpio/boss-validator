# boss.validator

> The simplest library to validate data or forms.

```html
<form id="contact">
  <input name="fullname" required />
  <input name="email" required />
  <input name="age" />
  <textarea name="message" required></textarea>
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
* [Methods](#methods)
* [TODO](#todo)

## Installation

#### npm
```
npm install boss.validator
```
#### bower
```
bower install boss.validator
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

For each validator, also have a error message. There is also a default message to cases where doesn't have a message to a validator, this is the `default` and you can override it.

```javascript
const messages = {
  default: 'Please, fill this field.',
  required: 'This field is required.',

  // Numbers, Sizes
  less: 'The value needs to be less than {val}.',
  less_equal: 'The value needs to be less than or equal to {val}.',
  bigger: 'The value needs to be bigger than {val}.',
  bigger_equal: 'The value needs to be less than or equal to {val}.',
  between: 'The value must be between {val}',
  number: 'Please, enter a valid number.',


  // Strings
  exact: 'Please, this field needs to have {val} characters.',
  extensions: 'Please, upload a file with some of these extensions: {val}.',
  contains: 'Please, this field needs to have the value: {val}.',
  minlength: 'Please, this field needs minimum {val} characters.',
  maxlength: 'Please, this field needs maximum {val} characters.',
  starts: 'Please, this field needs to start with "{val}".',
  ends: 'Please, this field needs to end with "{val}".',

  // Booleans
  boolean: 'This field needs to be "true" or "false".',

  // Regex
  email: 'Please, provide a valid email address.',
  url: 'Please, provide a valid URL address with http:// or https://.',
  https: 'Your URL must starts with https://',
  credit_card: 'Please, enter a valid credit card number.',
  ip_v4: 'Please, enter a valid IPV4 address.',
  ip_v6: 'Please, enter a valid IPV6 address.',
  alpha: 'Only alpha characters are allowed.',
  alpha_numeric: 'Only alpha numeric characters are allowed.',
};
```

## Methods

### Boss.validate(form, rules)

### Boss.validate(object, rules)

For each object in `object`, it needs to have the `value` property.

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

### Boss.configure(object)

```javascript
// Default values
Boss.configure({
  errorElement: 'label',
  apeendErrors: true // Append the error after the input
});
```

### Boss.configureMessages(object)

You can simply override them or create new.

```javascript
Boss.configureMessages({
  default: 'You shall not pass!',
  required: 'Dude, please!',
  my_custom_validator: 'Your name is not <strong>Gandalf</strong>.'
});
```

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

You can create a validator and pass its message too.

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
- [x] Publish on `npm install -i boss.validator` and `bower install bower.validator`
- [ ] Improve and review the messages
- [ ] Create a easy way to extend I18n messages
- [ ] Create unit tests !important
- [ ] Create more useful validators
- [ ] Improve this documentation
- [ ] Create gh-pages branch

---

Made with :heart: by community!
