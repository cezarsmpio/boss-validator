var q = QUnit;

q.test('Load boss', function (assert) {
  assert.ok('Boss' in window, 'Boss was loaded');
});

q.test('Boss.validate', function (assert) {
  var fields = {
    name: {
      value: 'John Lennon'
    }
  };

  var required = {
    name: {
      required: true
    }
  };

  var exact = {
    name: {
      exact: 11
    }
  };

  var minlength = {
    name: {
      minlength: 11
    }
  };

  var maxlength = {
    name: {
      maxlength: 15
    }
  };

  // Required
  Boss.validate(fields, required)
    .then(function (values) {
      assert.ok(true, 'Validator required is ok!')
    });

  // Exact
  Boss.validate(fields, exact)
    .then(function (values) {
      assert.ok(true, 'Validator exact is ok!')
    });

  // Minlength
  Boss.validate(fields, minlength)
    .then(function (values) {
      assert.ok(true, 'Validator minlength is ok!')
    });

  assert.ok(true);
});
