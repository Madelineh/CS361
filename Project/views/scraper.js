// var require = (function () {
//     var cache = {};
//     function loadScript(url) {
//         var xhr = new XMLHttpRequest(),
//             fnBody;
//         xhr.open('get', url, false);
//         xhr.send();
//         if (xhr.status === 200 && xhr.getResponseHeader('Content-Type') === 'application/x-javascript') {
//             fnBody = 'var exports = {};\n' + xhr.responseText + '\nreturn exports;';
//             cache[url] = (new Function(fnBody)).call({});
//         }
//     }
//     function resolve(module) {
//         //TODO resolve urls
//         return module;
//     }
//     function require(module) {
//         var url = resolve(module);
//         if (!Object.prototype.hasOwnProperty.call(cache, url)) {
//             loadScript(url);
//         }
//         return cache[url];
//     }
//     require.cache = cache;
//     require.resolve = resolve;
//     return require;
// }());

// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const axios = require('axios');

        
function test2(first, last){

    document.getElementById("mm_bio").innerHTML="";

    if (first.value === "Marilyn"){

        document.getElementById("instructions").innerHTML="Select The Person To Search";

        document.getElementById("person1").innerHTML="Shot Marilyns";
        document.getElementById("person2").innerHTML="Marilyn Diptych";
        document.getElementById("person3").innerHTML="Marilyn Manson";
        document.getElementById("person4").innerHTML="Marilyn Manson (band)";
        document.getElementById("person5").innerHTML="Mary Lynne (song)";

        document.getElementById("mm").innerHTML="Marilyn Monroe";

    } else if (last.value === "Washington"){
        document.getElementById("instructions").innerHTML="Select The Person To Search"

        document.getElementById("person1").innerHTML="Washington (state)";
        document.getElementById("person2").innerHTML="Washington, D.C.";


        document.getElementById("gw").innerHTML="George Washington";
    } else{



        document.getElementById("wam").innerHTML="Wolfgang Amadeus Mozart";
    }

};


function test1(){

    document.getElementById("mm_bio").innerHTML="Marilyn Monroe (/ˈmærɪlɪn mənˈroʊ/; born Norma Jeane Mortenson; June 1, 1926 – August 4, 1962) was an American actress, model, and singer. Famous for playing comedic 'blonde bombshell' characters, she became one of the most popular sex symbols of the 1950s and early 1960s and was emblematic of the era's sexual revolution. She was a top-billed actress for only a decade, but her films grossed $200 million (equivalent to $2 billion in 2019) by the time of her death in 1962.[1] Long after her death, she continues to be a major icon of pop culture.[2] In 1999, the American Film Institute ranked Monroe sixth on its list of the greatest female screen legends from the Golden Age of Hollywood.";
    
    document.getElementById("instructions").innerHTML="";
            document.getElementById("person1").innerHTML="Norma Jeane Baker";
        document.getElementById("person2").innerHTML="James Dougherty";
        document.getElementById("jdm").innerHTML="Joe DiMaggio";
        document.getElementById("person4").innerHTML="Arthur Miller";
        document.getElementById("person5").innerHTML="Gladys Pearl Baker";
        document.getElementById("mm").innerHTML="";

};

function test3(){

    document.getElementById("mm_bio").innerHTML="George Washington (February 22, 1732[b] – December 14, 1799) was an American political leader, military general, statesman, and Founding Father who served as the first president of the United States from 1789 to 1797. Previously, he led Patriot forces to victory in the nation's War for Independence. He presided at the Constitutional Convention of 1787, which established the U.S. Constitution and a federal government. Washington has been called the Father of His Country for his manifold leadership in the formative days of the new nation.";
    document.getElementById("instructions").innerHTML="";
    document.getElementById("person1").innerHTML="John Adams";
        document.getElementById("person2").innerHTML="James Wilkinson";
        document.getElementById("person3").innerHTML="Alexander Hamilton";
        document.getElementById("person4").innerHTML="Henry Knox";
        document.getElementById("gw").innerHTML="James Madison";

};

function test5(){

    document.getElementById("mm_bio").innerHTML="Joseph Paul DiMaggio[a] (November 25, 1914 – March 8, 1999), nicknamed Joltin' Joe and The Yankee Clipper, was an American baseball center fielder who played his entire 13-year career in Major League Baseball for the New York Yankees. Born to Sicilian Italian immigrants in California, he is widely considered one of the greatest baseball players of all time, and had a 56-game hitting streak (May 15 – July 16, 1941), a record that still stands.";
    document.getElementById("instructions").innerHTML="";
    document.getElementById("person1").innerHTML="Yogi Berra";
        document.getElementById("person2").innerHTML="Marilyn Monroe";
        document.getElementById("person3").innerHTML="Giuseppe DiMaggio";
        document.getElementById("person4").innerHTML="Rosalia DiMaggio";
        document.getElementById("gw").innerHTML="Saint Paul";

};



async function scrapeProduct(first, last){

    document.getElementById("functest").innerHTML="#1a It works, " + first.value + last.value;

    // const url = "https://en.wikipedia.org/wiki/Marilyn_Monroe";

    const url = "https://en.wikipedia.org/wiki/" + first.value + "_" + last.value;

    document.getElementById("functest").innerHTML="#1b It works, " + first.value + last.value;


    (async () => {

        document.getElementById("functest").innerHTML="#1c It works, " + first.value + last.value;



        const browser = await puppeteer.launch({headless: true});
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