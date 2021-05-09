        const puppeteer = require('puppeteer');

        // function test(first, last){
    
        //     document.getElementById("functest").innerHTML="It works, " + first + last;
        // }

        async function scrapeProduct(first, last){
            // const puppeteer = require('puppeteer');

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const url = "https://en.wikipedia.org/wiki/" + first + "_" + last;
            await page.goto(url);

            const [el] = await page.$x('//*[@id="mw-content-text"]/div[1]/table/tbody/tr[2]/td/a/img');
            const src = await el.getProperty('src');
            const srcTxt = await src.jsonValue();

            const [el2] = await page.$x('//*[@id="mw-content-text"]/div[1]/p[3]');
            const txt = await el2.getProperty('textContent');
            const rawTxt = await txt.jsonValue();

            const [el3] = await page.$x('//*[@id="toc"]/ul');
            const txt2 = await el3.getProperty('textContent');
            const contents = await txt2.jsonValue();

            var test="This works!";

            console.log({srcTxt, rawTxt, contents});
            // document.getElementById("mm_image").innerHTML=srcTxt;
            // document.getElementById("mm_bio").innerHTML=rawTxt;
            // document.getElementById("mm_contents").innerHTML=contents;

            // document.getElementById("functest").innerHTML=test;


            browser.close();
        }

        var firstn = "Marilyn";
        var lastn = "Monroe";

        scrapeProduct(firstn, lastn);