const puppeteer = require('puppeteer');

const strings = [
    'a', 'b', 'c', 'd', 'e'
]; 

async function doSearch() {
    const browser = await puppeteer.launch(
        { headless: false },
        {defaultViewport: null}
    );
    const page = await browser.newPage();
    await page.goto('https://presearch.org/login',{
        waitUntil: 'load',
        timeout: 0
    });
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout:0 }).then(async() => {
        for (let string of strings) {
            const page = await browser.newPage();
            await page.goto('https://presearch.org',{
                waitUntil: 'networkidle2'
            });
            await page.type('#search', string);
            const el = await page.$$('button');
            await page.$$eval('.rounded', elHandles => elHandles.forEach(el => el.click()))
        }
    })
//   await browser.close();
}

doSearch();