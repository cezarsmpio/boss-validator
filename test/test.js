let Boss = require('../dist/js/boss.min');
let expect = require('chai').expect;

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
    it('The required messages usiging configureMessages needs to equal "Este campo é obrigatório."', function (done) {
      Boss.configureMessages({
        required: 'Este campo é obrigatório.'
      });

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
});

describe('Test validators', function () {
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
      expect(Boss.addValidator({
        name: 'foo',
        validator: function () {
          return true
        }
      })).to.be.undefined;
      done();
    });
  });
});
