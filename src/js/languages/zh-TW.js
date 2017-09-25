// Traditional Chinese
const messages = {
  default: '請填寫此欄位.',
  required: '此欄位必填',
  prepositions: {
    and: ' 和 ',
    or: ' 或 '
  },

  // Numbers, Sizes
  less: '數字必須小於 {val}。',
  less_equal: '數字必須小於或等於 {val}。',
  bigger: '數字必須大於 {val}。',
  bigger_equal: '數字必須大於或等於 {val}。',
  between: '數字必須介於 {val} 之間。',
  number: '請填寫正確的數字。',


  // Strings
  exact: '必須為 {val} 個字',
  extensions: '請上傳下列副檔名的檔案: {val}.',
  contains: '必須包含: {val}.',
  minlength: '必須多於 {val} 個字。',
  maxlength: '必須少於 {val} 個字。',
  starts: '請以 "{val}" 為開頭。',
  ends: '請以 "{val}" 為結尾。',

  // Booleans
  boolean: '此欄必須為 "是" 或 "否"。',

  // Regex
  email: '請填寫正確的郵件信箱地址 (例: user@gmail.com)。',
  url: '請填寫正確的網址，以 http:// 或 https:// 開頭。',
  https: '您的網址必須以 https:// 開頭。',
  credit_card: '請填寫正確的信用卡卡號。',
  ip_v4: '請填寫正確的 IPV4 地址。 (例: 172.16.254.1)',
  ip_v6: '請填寫正確的 IPV6 地址。 (例: 3ffe:1900:4545:3:200:f8ff:fe21:67cf)',
  alpha: '請填寫英文字母。',
  alpha_numeric: '請勿填寫英文字母及數字以外的特殊符號。',
};

module.exports = messages;
