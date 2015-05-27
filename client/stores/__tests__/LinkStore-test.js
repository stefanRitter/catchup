jest.dontMock('../LinkStore');
jest.dontMock('object-assign');

describe('LinkStore', function() {

  var LinkStore;

  beforeEach(function() {
    LinkStore = require('../LinkStore');
  });

  it('provides the current page number', function() {
    expect(LinkStore.getCurrentPage()).toBe(0);
  });

});
