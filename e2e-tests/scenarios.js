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

    it('should render at least 1 list item', function() {
      expect(element.all(by.css('md-list-item')).count()).
        toBeGreaterThan(1);
    });

    it('should render chat-details when user clicks chat link', function(){
      element.all(by.css('md-list-item button')).
        first().
        click();
      expect(browser.getLocationAbsUrl()).toMatch("/chat-details");
    });

  });

  describe('chat-details', function() {

    beforeEach(function() {
      browser.get('index.html#!/chat-list');
      element.all(by.css('md-list-item button')).
        first().
        click();
    });

    it('should render chat-details when user navigates to /chat-details', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Chat Details/);

      expect(element.all(by.css('message-recieved')).count()).
        toEqual(3);

      expect(element.all(by.css('message-sent')).count()).
        toEqual(1);

      expect(element.all(by.css('message-recieved .myapp-message img')).first().getAttribute('src')).
        toMatch(/assets\/emoticons\/smile.png/);

      expect(element.all(by.css('message-sent .myapp-message img')).first().getAttribute('src')).
        toMatch(/assets\/emoticons\/disappointed.png/);
    });

  });


  describe('chat-details', function() {

    beforeEach(function() {
      browser.get('index.html#!/chat-list');
      element.all(by.css('md-list-item button')).
        get(1).
        click();
    });

    it('should render 2nd chat-details clicked by user', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Chat Details/);

      expect(element.all(by.css('message-recieved .myapp-message img')).first().getAttribute('src')).
        toMatch(/assets\/images\/bender.jpg/);
    });

  });

  describe('chat-details service error', function() {

    beforeEach(function() {
      browser.get('index.html#!/chat-list');
      element.all(by.css('md-list-item button')).
        get(5).
        click();
    });

    it('should render chat-details and dialog with error', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Chat Details/);

      expect(element.all(by.css('md-dialog h2')).first().getText()).
        toMatch(/Service Error/);
    });

  });

});
