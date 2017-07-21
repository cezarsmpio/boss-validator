// Brazilian Portuguese
const messages = {
  default: 'Por favor, preencha este campo.',
  required: 'Este campo é obrigatório.',
  prepositions: {
    and: ' e ',
    or: ' ou '
  },

  // Numbers, Sizes
  less: 'O valor precisa ser menor que {val}.',
  less_equal: 'O valor precisa ser menor ou igual a {val}.',
  bigger: 'O valor precisa ser maior que {val}.',
  bigger_equal: 'O valor precisa ser maior ou igual a {val}.',
  between: 'O valor precisa estar entre {val}.',
  number: 'Por favor, insira um número válido.',


  // Strings
  exact: 'É necessário que contenha os seguintes caracteres: {val}',
  extensions: 'Faça upload de um arquivo com as seguintes extensões: {val}.',
  contains: 'É necessário que contenha o seguinte valor: {val}.',
  minlength: 'É necessário que contenha pelo menos {val} caracteres.',
  maxlength: 'É necessário que contenha até {val} caracteres.',
  starts: 'Este campo deve começar com "{val}".',
  ends: 'Este campo deve terminar com "{val}".',

  // Booleans
  boolean: 'Este campo precisa ser "verdadeiro" ou "falso".',

  // Regex
  email: 'Por favor, insira um endereço de email válido.',
  url: 'Por favor, insira um endereço de URL válido com http:// ou https://',
  https: 'O endereço URL deve começar com https://',
  credit_card: 'Por favor, insira um número de cartão de crédito válido.',
  ip_v4: 'Por favor, insira um endereço de IPV4 válido. (ex: 172.16.254.1)',
  ip_v6: 'Por favor, insira um endereço de IPV6 válido. (ex: 3ffe:1900:4545:3:200:f8ff:fe21:67cf)',
  alpha: 'Apenas letras são permitidos.',
  alpha_numeric: 'Não são permitidos caracteres especiais, apenas letras e números.',
};

module.exports = messages;
