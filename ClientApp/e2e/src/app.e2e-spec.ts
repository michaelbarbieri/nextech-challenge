import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let url: string;

  beforeEach(() => {
    page = new AppPage();
    url = 'http://localhost:5000'; //todo: generalize this
  });

  it('should display the same items on Next click followed by Prev click', async function() {
    browser.get(url);
    await sleep(1000); // let data arrive

    const stories1 = element.all(by.css('.link'));
    const textOfStories1 = stories1.map(story => story.getText());

    element(by.css('#nextButton')).click();
    await sleep(1000);
    element(by.css('#prevButton')).click();
    await sleep(500);

    const stories2 = element.all(by.css('.link'));
    const textOfStories2 = stories2.map(story => story.getText());

    expect(textOfStories1).toEqual(textOfStories2);
  });

  it('should display new items on Next click', async function() {
    browser.get(url);
    await sleep(1000); // let data arrive

    const stories1 = element.all(by.css('.link'));
    const textOfStories1 = stories1.map(story => story.getText());

    element(by.css('#nextButton')).click();
    await sleep(1000);

    const stories2 = element.all(by.css('.link'));
    const textOfStories2 = stories2.map(story => story.getText());

    expect(textOfStories1).not.toEqual(textOfStories2);
  });

  it('should display only items containing filter text', async function() {
    const searchTerm: string = "rel";

    browser.get(url);
    await sleep(1000); // let data arrive

    element(by.css('#searchBox')).sendKeys(searchTerm);
    await sleep(3000); // give a few seconds since initial search can take a few

    const stories = element.all(by.css('.link'));
    const textOfStories: string[] = await stories.map(story => story.getText());
    console.log(textOfStories);
    const notMatching: string[] = textOfStories.filter(value => !value.toLowerCase().includes(searchTerm.toLowerCase()));
    expect(notMatching.length).toEqual(0);
  });



  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


function sleep(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis));
}

