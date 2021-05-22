const puppeteer = require('puppeteer');

        
function test2(first, last){

    document.getElementById("person1").innerHTML="Shot Marilyns";
    document.getElementById("person2").innerHTML="Marilyn Diptych";
    document.getElementById("person3").innerHTML="Marilyn Manson";
    document.getElementById("person4").innerHTML="Marilyn Manson (band)";
    document.getElementById("person5").innerHTML="Mary Lynne (song)";
    // document.getElementById("mm_people6").innerHTML="r";
    // document.getElementById("mm_people7").innerHTML="e";
    // document.getElementById("mm_people8").innerHTML="e";
    // document.getElementById("mm_people9").innerHTML="r";
    // document.getElementById("mm_people10").innerHTML="e";
    document.getElementById("mm").innerHTML="Marilyn Monroe";

};


function test1(){

    document.getElementById("mm_bio").innerHTML="Marilyn Monroe (/ˈmærɪlɪn mənˈroʊ/; born Norma Jeane Mortenson; June 1, 1926 – August 4, 1962) was an American actress, model, and singer. Famous for playing comedic 'blonde bombshell' characters, she became one of the most popular sex symbols of the 1950s and early 1960s and was emblematic of the era's sexual revolution. She was a top-billed actress for only a decade, but her films grossed $200 million (equivalent to $2 billion in 2019) by the time of her death in 1962.[1] Long after her death, she continues to be a major icon of pop culture.[2] In 1999, the American Film Institute ranked Monroe sixth on its list of the greatest female screen legends from the Golden Age of Hollywood.";
    document.getElementById("mm_people").innerHTML="t";

};



async function scrapeProduct(first, last){

    document.getElementById("functest").innerHTML="#1a It works, " + first.value + last.value;

    // const url = "https://en.wikipedia.org/wiki/Marilyn_Monroe";

    const url = "https://en.wikipedia.org/wiki/" + first.value + "_" + last.value;

    document.getElementById("functest").innerHTML="#1b It works, " + first.value + last.value;


    (async () => {

        document.getElementById("functest").innerHTML="#1c It works, " + first.value + last.value;



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

   })();
    // browser.close();
};