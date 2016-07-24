'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('chat app', function() {


  it('should automatically redirect to /chat-list when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/chat-list");
  });


  describe('chat-list', function() {

    beforeEach(function() {
      browser.get('index.html#!/chat-list');
    });


    it('should render chat-list when user navigates to /chat-list', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for chat list view/);
    });

  });

});
