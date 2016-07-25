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
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Messages/);
    });

    it('should render chat-details when user clicks chat link', function(){
      element.all(by.css('md-list-item button')).
        first().
        click();
      expect(browser.getLocationAbsUrl()).toMatch("/chat-details");
    });

  });

});
