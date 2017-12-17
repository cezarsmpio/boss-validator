// German (Standard)
const messages = {
  default: 'Bitte füllen Sie dieses Feld aus.',
  required: 'Dieses Feld muss ausgefüllt werden.',
  prepositions: {
    and: ' und ',
    or: ' oder '
  },

  // Numbers, Sizes
  less: 'Der Wert muss kleiner als {val} sein.',
  less_equal: 'Der Wert muss kleiner oder gleich {val} sein.',
  bigger: 'Der Wert muss größer als {val} sein.',
  bigger_equal: 'Der Wert muss kleiner oder gleich {val} sein.',
  between: 'Der Wert muss zwischen {val} liegen',
  number: 'Bitte geben Sie eine gültige Zahl ein.',


  // Strings
  exact: 'Muss die folgenden Zeichen enthalten: {val}',
  extensions: 'Bitte laden Sie eine Datei mit einer der folgenden Dateiendungen hoch: {val}.',
  contains: 'Muss folgenden Wert enthalten: {val}.',
  minlength: 'Muss mindestens {val} Zeichen lang sein.',
  maxlength: 'Muss weniger als {val} Zeichen lang sein.',
  starts: 'Dieses Feld sollte mit "{val}" beginnen.',
  ends: 'Dieses Feld sollte mit "{val}" enden.',

  // Booleans
  boolean: 'Dieses Feld muss "wahr" oder "falsch" sein.',

  // Regex
  email: 'Bitte geben Sie eine gültige Email-Adresse an. (z.B.: user@gmail.com)',
  url: 'Bitte geben Sie eine gültige URL-Adresse mit http:// oder https:// an',
  https: 'Ihre URL muss mit https:// beginnen',
  credit_card: 'Bitte geben Sie eine gültige Kreditkartennummer ein.',
  ip_v4: 'Bitte geben Sie eine gültige IPV4-Adresse ein. (z.B.: 172.16.254.1)',
  ip_v6: 'Bitte geben Sie eine gültige IPV6-Adresse ein. (z.B.: 3ffe:1900:4545:3:200:f8ff:fe21:67cf)',
  alpha: 'Nur Buchstaben sind erlaubt.',
  alpha_numeric: 'Keine Sonderzeichen erlaubt, nur Zahlen und Buchstaben.',
};

module.exports = messages;
