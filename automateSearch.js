const puppeteer = require('puppeteer');

//strings to be searched
const strings = [
    'a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e'
]; 

//Automatically Search after login in presearch.org (Working on Date: 29 Oct 2021)
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
            // await page.waitForNavigation({ waitUntil: 'networkidle0', timeout:0 });
            // await page.close();
        }
    })
//   await browser.close();
}

doSearch();