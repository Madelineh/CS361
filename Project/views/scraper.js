const puppeteer = require('puppeteer');

        // function test(first, last){
    
        //     document.getElementById("functest").innerHTML="It works, " + first.value + last.value;
        // }



async function scrapeProduct(first, last){

    document.getElementById("functest").innerHTML="#1a It works, " + first.value + last.value;

    const url = "https://en.wikipedia.org/wiki/" + first + "_" + last;


    (async () => {
         document.getElementById("functest").innerHTML="#1b It works, " + first.value + last.value;



        const browser = await puppeteer.launch();
        document.getElementById("functest").innerHTML="#2a It works, " + first.value + last.value;
        const page = await browser.newPage();
        document.getElementById("functest").innerHTML="#2b It works, " + first.value + last.value;
        // const url = "https://en.wikipedia.org/wiki/" + first + "_" + last;
        document.getElementById("functest").innerHTML="#2c It works, " + first.value + last.value;
        await page.goto(url);
        document.getElementById("functest").innerHTML="#2d It works, " + first.value + last.value;

        const [el] = await page.$x('//*[@id="mw-content-text"]/div[1]/table/tbody/tr[2]/td/a/img');
        const src = await el.getProperty('src');
        const srcTxt = await src.jsonValue();
        document.getElementById("functest").innerHTML="#3 It works, " + first.value + last.value;

        const [el2] = await page.$x('//*[@id="mw-content-text"]/div[1]/p[3]');
        const txt = await el2.getProperty('textContent');
        const rawTxt = await txt.jsonValue();
        document.getElementById("functest").innerHTML="#4 It works, " + first.value + last.value;

        const [el3] = await page.$x('//*[@id="toc"]/ul');
        const txt2 = await el3.getProperty('textContent');
        const contents = await txt2.jsonValue();

        var test="This works!";

        // console.log({srcTxt, rawTxt, contents});
        document.getElementById("mm_image").innerHTML=srcTxt;
        document.getElementById("mm_bio").innerHTML=rawTxt;
        document.getElementById("mm_contents").innerHTML=contents;

       document.getElementById("functest").innerHTML="#5 It works, " + first.value + last.value;

   });
    // browser.close();
};