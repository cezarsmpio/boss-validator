let Boss = require('../dist/js/boss.min');
let expect = require('chai').expect;

let mock = {
  rules: {
    required: true,
    less: 10,
    less_equal: 20,
    bigger: 30,
    bigger_equal: 30,
    between: [[0, 10]],
    exact: 10,
    minlength: 5,
    maxlength: 8,
    starts: 'boss',
    ends: 'validator',
    contains: 'oss',
    boolean: true,
    email: true,
    regex: /^[0-9]{1,5}$/,
    https: true,
    url: true,
    credit_card: true,
    ip_v4: true,
    ip_v6: true,
    alpha_numeric: true,
    alpha: true
  },
  valid: {
    required: 'Cezar Luiz Sampaio',
    less: 5,
    less_equal: 20,
    bigger: 50,
    bigger_equal: 30,
    between: 5,
    exact: 'abcdefghij',
    minlength: 'abcde',
    maxlength: 'hello',
    starts: 'boss-validator',
    ends: 'boss-validator',
    contains: 'boss-validator',
    boolean: true,
    email: 'cezarluiz.c@gmail.com',
    regex: '12345',
    https: 'https://github.com',
    url: 'http://github.com',
    credit_card: '4111111111111111',
    ip_v4: '192.168.0.1',
    ip_v6: '2001:cdba:0000:0000:0000:0000:3257:9652',
    alpha_numeric: '123abc',
    alpha: 'ABCabc'
  },
  invalid: {
    required: false,
    less: 20,
    less_equal: 25,
    bigger: 10,
    bigger_equal: 10,
    between: 15,
    exact: 'boss',
    minlength: null,
    maxlength: 'hello, wonderful world!',
    starts: 'validator-boss',
    ends: 'validator-boss',
    contains: 'bozz-validator',
    boolean: {},
    email: 'cezarluiz.c',
    regex: 'abcde',
    https: 'http://github.com',
    url: 'github.lol',
    credit_card: '4111111111111112',
    ip_v4: '300.0.0.1',
    ip_v6: '127.0.0.1',
    alpha_numeric: '!@#$%',
    alpha: '123456789'
  }
};

describe('Boss initial load', function () {
  before(function () {
    window.Boss = Boss;
  });

  it('Boss exist in window scope', function () {
    expect(window).to.have.property('Boss');
  });
});

describe('Boss messages', function () {
  describe('Using configureMessages method', function () {
    before(function () {
      Boss.configureMessages({
        required: 'Este campo é obrigatório.'
      });
    });

    it('The required messages usiging configureMessages needs to equal "Este campo é obrigatório."', function (done) {
      let fields = {
        name: { value: '' }
      };

      let rules = {
        name: { required: true }
      };

      Boss.validate(fields, rules)
        .catch(err => {
          expect(err.shift().message).to.equal('Este campo é obrigatório.');
          done();
        });
    });
  })

  describe('Languages', function () {
    // TODO: Create tests to validate the load language
  });
});

describe('Test validators and transforms', function () {
  describe('Create custom validators', function () {
    it('Throw a TypeError if addValidator param is not a object', function (done) {
      expect(() => { Boss.addValidator('foo') }).to.throw(TypeError);
      expect(() => { Boss.addValidator(1) }).to.throw(TypeError);
      expect(() => { Boss.addValidator(true) }).to.throw(TypeError);
      expect(() => { Boss.addValidator(NaN) }).to.throw(TypeError);
      expect(() => { Boss.addValidator(undefined) }).to.throw(TypeError);
      expect(() => { Boss.addValidator(3.14) }).to.throw(TypeError);
      expect(() => { Boss.addValidator([]) }).to.throw(TypeError);
      expect(() => { Boss.addValidator(null) }).to.throw(TypeError);
      done();
    });

    it('Throw a TypeError if addValidators object param have not name and a validators', function (done) {
      expect(() => { Boss.addValidator({}) }).to.throw(TypeError);
      done();
    });

    it('Throw a TypeError if the validator property is not a function', function (done) {
      expect(() => { Boss.addValidator({name: 'foo', validator: null}) }).to.throw(TypeError);
      done();
    });

    it('Throw a TypeError if the name property is not a string', function (done) {
      expect(() => { Boss.addValidator({ name: 3.14, validator: function () {} }) }).to.throw(TypeError);
      done();
    });

    it('Create a custom validator without errors using the method addValidator', function (done) {
      let validator = Boss.addValidator({
        name: 'foo',
        validator: function () {
          return true
        }
      });

      expect(validator).to.be.undefined;
      done();
    });
  });

  describe('Validators', function () {
    before(function () {
      Boss.configureMessages({
        required: 'This field is required.'
      });
    });

    describe('Valid and correct values', function () {
      it('required', function (done) {
        Boss.validate(
          { field: { value: mock.valid.required } },
          { field: { required: mock.rules.required  }}
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.required);
          done();
        });
      });

      it('less', function (done) {
        Boss.validate(
          { field: { value: mock.valid.less } },
          { field: { less: mock.rules.less  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.less);
          done();
        })
      });

      it('less_equal', function (done) {
        Boss.validate(
          { field: { value: mock.valid.less_equal } },
          { field: { less_equal: mock.rules.less_equal  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.less_equal);
          done();
        })
      });

      it('bigger', function (done) {
        Boss.validate(
          { field: { value: mock.valid.bigger } },
          { field: { bigger: mock.rules.bigger  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.bigger);
          done();
        })
      });

      it('bigger_equal', function (done) {
        Boss.validate(
          { field: { value: mock.valid.bigger_equal } },
          { field: { bigger_equal: mock.rules.bigger_equal  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.bigger_equal);
          done();
        })
      });

      it('between', function (done) {
        Boss.validate(
          { field: { value: mock.valid.between } },
          { field: { between: mock.rules.between  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.between);
          done();
        })
      });

      it('exact', function (done) {
        Boss.validate(
          { field: { value: mock.valid.exact } },
          { field: { exact: mock.rules.exact  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.exact);
          done();
        })
      });

      it('minlength', function (done) {
        Boss.validate(
          { field: { value: mock.valid.minlength } },
          { field: { minlength: mock.rules.minlength  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.minlength);
          done();
        })
      });

      it('maxlength', function (done) {
        Boss.validate(
          { field: { value: mock.valid.maxlength } },
          { field: { maxlength: mock.rules.maxlength  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.maxlength);
          done();
        })
      });

      it('starts', function (done) {
        Boss.validate(
          { field: { value: mock.valid.starts } },
          { field: { starts: mock.rules.starts  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.starts);
          done();
        })
      });

      it('ends', function (done) {
        Boss.validate(
          { field: { value: mock.valid.ends } },
          { field: { ends: mock.rules.ends  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.ends);
          done();
        })
      });

      it('contains', function (done) {
        Boss.validate(
          { field: { value: mock.valid.contains } },
          { field: { contains: mock.rules.contains  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.contains);
          done();
        })
      });

      it('boolean', function (done) {
        Boss.validate(
          { field: { value: mock.valid.boolean } },
          { field: { boolean: mock.rules.boolean  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.boolean);
          done();
        })
      });

      it('email', function (done) {
        Boss.validate(
          { field: { value: mock.valid.email } },
          { field: { email: mock.rules.email  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.email);
          done();
        })
      });

      it('regex', function (done) {
        Boss.validate(
          { field: { value: mock.valid.regex } },
          { field: { regex: mock.rules.regex  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.regex);
          done();
        })
      });

      it('url', function (done) {
        Boss.validate(
          { field: { value: mock.valid.url } },
          { field: { url: mock.rules.url  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.url);
          done();
        })
      });

      it('https', function (done) {
        Boss.validate(
          { field: { value: mock.valid.https } },
          { field: { https: mock.rules.https  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.https);
          done();
        })
      });

      it('credit_card', function (done) {
        Boss.validate(
          { field: { value: mock.valid.credit_card } },
          { field: { credit_card: mock.rules.credit_card  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.credit_card);
          done();
        })
      });

      it('ip_v4', function (done) {
        Boss.validate(
          { field: { value: mock.valid.ip_v4 } },
          { field: { ip_v4: mock.rules.ip_v4  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.ip_v4);
          done();
        })
      });

      it('ip_v6', function (done) {
        Boss.validate(
          { field: { value: mock.valid.ip_v6 } },
          { field: { ip_v6: mock.rules.ip_v6  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.ip_v6);
          done();
        })
      });

      it('alpha_numeric', function (done) {
        Boss.validate(
          { field: { value: mock.valid.alpha_numeric } },
          { field: { alpha_numeric: mock.rules.alpha_numeric  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.alpha_numeric);
          done();
        })
      });

      it('alpha', function (done) {
        Boss.validate(
          { field: { value: mock.valid.alpha } },
          { field: { alpha: mock.rules.alpha  } }
        ).then((res) => {
          expect(res.source.field.value).to.equal(mock.valid.alpha);
          done();
        })
      });
    })
    describe('Invalid values', function () {
      it('required', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.required } },
          { field: { required: mock.rules.required  }}
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        });
      });

      it('less', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.less } },
          { field: { less: mock.rules.less  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('less_equal', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.less_equal } },
          { field: { less_equal: mock.rules.less_equal  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('bigger', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.bigger } },
          { field: { bigger: mock.rules.bigger  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('bigger_equal', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.bigger_equal } },
          { field: { bigger_equal: mock.rules.bigger_equal  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('between', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.between } },
          { field: { between: mock.rules.between  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('exact', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.exact } },
          { field: { exact: mock.rules.exact  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('minlength', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.minlength } },
          { field: { minlength: mock.rules.minlength  } }
        )
        .catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        });
      });

      it('maxlength', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.maxlength } },
          { field: { maxlength: mock.rules.maxlength  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('starts', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.starts } },
          { field: { starts: mock.rules.starts  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('ends', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.ends } },
          { field: { ends: mock.rules.ends  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('contains', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.contains } },
          { field: { contains: mock.rules.contains  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('boolean', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.boolean } },
          { field: { boolean: mock.rules.boolean  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('email', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.email } },
          { field: { email: mock.rules.email  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('regex', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.regex } },
          { field: { regex: mock.rules.regex  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('url', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.url } },
          { field: { url: mock.rules.url  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('https', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.https } },
          { field: { https: mock.rules.https  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('credit_card', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.credit_card } },
          { field: { credit_card: mock.rules.credit_card  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('ip_v4', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.ip_v4 } },
          { field: { ip_v4: mock.rules.ip_v4  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('ip_v6', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.ip_v6 } },
          { field: { ip_v6: mock.rules.ip_v6  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('alpha_numeric', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.alpha_numeric } },
          { field: { alpha_numeric: mock.rules.alpha_numeric  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });

      it('alpha', function (done) {
        Boss.validate(
          { field: { value: mock.invalid.alpha } },
          { field: { alpha: mock.rules.alpha  } }
        ).catch((err) => {
          let o = err.shift();

          expect(o).to.have.property('message');
          expect(o).to.have.property('rule');
          expect(o).to.have.property('value');
          expect(o).to.have.property('el');
          done();
        })
      });
    })
  });

  describe('Transforms', function () {
    let mock = {
      trim: { value: '   boss   ' },
      uppercase: { value: 'boss' },
      lowercase: { value: 'BOSS' },
      baseEncode: { value: 'boss' },
      baseDecode: { value: 'Ym9zcw==' },
      urlEncode: { value: 'https://google.com.br?q=boss validator is the best lib ever' },
      urlDecode: { value: 'https://google.com.br?q=boss%20validator%20is%20the%20best%20lib%20ever' },
      jsonParse: { value: '{"id": 1}' },
      slug: { value: '-BOSS validatoR iS - tHe BEST & ever áíóéñúç-' },
      escape: { value: '<h1>Boss Validator</h1>' },
      unescape: { value: '&lt;h1&gt;Boss Validator&lt;/h1&gt;' }
    };

    it('trim must return "boss" not "   boss   "', function () {
      let transform = Boss.transform(mock, {
        trim: ['trim']
      });

      expect(transform.trim.value).to.equal('boss');
    });

    it('uppercase must return "BOSS" not "boss"', function () {
      let transform = Boss.transform(mock, {
        uppercase: ['uppercase']
      });

      expect(transform.uppercase.value).to.equal('BOSS');
    });

    it('lowercase must return "boss" not "BOSS"', function () {
      let transform = Boss.transform(mock, {
        lowercase: ['lowercase']
      });

      expect(transform.lowercase.value).to.equal('boss');
    });

    it('base64_encode must return "Ym9zcw==" not "boss"', function () {
      let transform = Boss.transform(mock, {
        baseEncode: ['base64_encode']
      });

      expect(transform.baseEncode.value).to.equal('Ym9zcw==');
    });

    it('base64_decode must return "boss" not "Ym9zcw=="', function () {
      let transform = Boss.transform(mock, {
        baseDecode: ['base64_decode']
      });

      expect(transform.baseDecode.value).to.equal('boss');
    });

    it('urlencode must return a valid URL encoded', function () {
      let transform = Boss.transform(mock, {
        urlEncode: ['urlencode']
      });

      expect(transform.urlEncode.value).to.equal('https://google.com.br?q=boss%20validator%20is%20the%20best%20lib%20ever');
    });

    it('urldecode must return a valid URL decoded with spaces', function () {
      let transform = Boss.transform(mock, {
        urlDecode: ['urldecode']
      });

      expect(transform.urlDecode.value).to.equal('https://google.com.br?q=boss validator is the best lib ever');
    });

    it('json_parse must be a valid object and property "id" must to equal "1"', function () {
      let transform = Boss.transform(mock, {
        jsonParse: ['json_parse']
      });

      expect(transform.jsonParse.value).to.be.an('object');
      expect(transform.jsonParse.value).to.have.property('id');
      expect(transform.jsonParse.value).to.deep.equal({ id: 1 });
    });

    it('slug needs to remove the accents and put "-" between the spaces', function () {
      let transform = Boss.transform(mock, {
        slug: ['slug']
      });

      expect(transform.slug.value).to.equal('boss-validator-is-the-best-and-ever-aioenuc');
    });

    it('html_escape needs to be escaped replacing html chars', function () {
      let transform = Boss.transform(mock, {
        escape: ['html_escape']
      });

      expect(transform.escape.value).to.equal('&lt;h1&gt;Boss Validator&lt;/h1&gt;');
    });

    it('html_unescape needs to convert to a valid html', function () {
      let transform = Boss.transform(mock, {
        unescape: ['html_unescape']
      });

      expect(transform.unescape.value).to.equal('<h1>Boss Validator</h1>');
    });
  })
});
