// Norwegian Bokmål
const messages = {
  default: 'Vennligst fyll ut dette feltet.',
  required: 'Dette feltet er påkrevd.',
  prepositions: {
    and: ' og ',
    or: ' eller '
  },

  // Numbers, Sizes
  less: 'Verdien må være mindre enn {val}.',
  less_equal: 'Verdien må være mindre enn eller lik {val}.',
  bigger: 'Verdien må være større enn {val}.',
  bigger_equal: 'Verdien må være større enn eller lik {val}.',
  between: 'Verdien må være mellom {val}',
  number: 'Vennligst skriv inn et gyldig tall.',


  // Strings
  exact: 'Må inneholde de følgende tegnene: {val}',
  extensions: 'Vennligst last opp en fil med følgende filendinger: {val}.',
  contains: 'Må inneholde følgende verdi: {val}.',
  minlength: 'Må være minst {val} tegn.',
  maxlength: 'Må være mindre enn {val} tegn.',
  starts: 'Teksten må starte med "{val}".',
  ends: 'Teksten må slutte på "{val}".',

  // Booleans
  boolean: 'Dette feltet må være "true" eller "false".',

  // Regex
  email: 'Vennligst oppgi en gyldig epost adresse. (f.eks.: user@gmail.com)',
  url: 'Vennligst oppgi en gyldig URL adresse med http:// eller https://',
  https: 'URLen må begynne med https://',
  credit_card: 'Vennligst oppgi et gyldig kreditt kort nummer.',
  ip_v4: 'Vennligst oppgi en gyldig IPV4 adresse. (f.eks.: 172.16.254.1)',
  ip_v6: 'Vennligst oppgi en gyldig IPV6 adresse. (f.eks.: 3ffe:1900:4545:3:200:f8ff:fe21:67cf)',
  alpha: 'Bare bokstaver er tillatt.',
  alpha_numeric: 'Ingen spesialtegn er tillat, bare tall og bokstaver.',
};

module.exports = messages;
