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

export default messages;
