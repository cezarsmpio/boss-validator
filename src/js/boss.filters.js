const filters = {
  trim: function (value) {
    return typeof value === 'string' ? value.trim() : value;
  },
  uppercase: function (value) {
    return typeof value === 'string' ? value.toUpperCase() : value;
  },
  lowercase: function (value) {
    return typeof value === 'string' ? value.toLowerCase() : value;
  },
  base64_encode: function (value) {
    return btoa(value);
  },
  base64_decode: function (value) {
    return typeof value === 'string' ? atob(value) : value;
  },
  urlencode: function (url) {
    return encodeURI(url);
  },
  urldecode: function (url) {
    return decodeURI(url);
  },
  json_parse: function (json) {
    return JSON.parse(json);
  },
  json_decode: function (json) {
    return JSON.stringify(json);
  },
  slug: function (text) {
    // Thansk to https://gist.github.com/mathewbyrne/1280286
    return text.toString().toLowerCase().trim()
                  .replace(/\s+/g, '-')           // Replace spaces with -
                  .replace(/&/g, '-and-')         // Replace & with 'and'
                  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                  .replace(/\-\-+/g, '-');        // Replace multiple - with single -
  },
  html_escape: function (html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
  },
  html_unescape: function (html) {
    return html
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
  }
};

module.exports = filters;
