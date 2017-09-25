// Simplified Chinese
const messages = {
  default: 'Please fill in this field.',
  required: 'This field is required.',
  prepositions: {
    and: ' and ',
    or: ' or '
  },

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

module.exports = messages;
