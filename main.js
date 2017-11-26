const { byCountry } = require('alexa-top-sites'); // npm package
const readline = require('readline');
const fs = require('fs');
const createHTML = require('create-html'); // npm package

const TO_ALEXA = 'https://www.alexa.com/siteinfo/';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Enter input data, smth like that [US de Ua pl Ca] 
rl.question('Please, write country or countries ISO code: ', (inputData) => {
    
    console.log('You write: ' + inputData);
    
    rl.close();
    process.stdin.destroy();

    handlingInputData(inputData);
});

function handlingInputData(countriesCodeStr) {
    // Get only unique values
    const ISOCodeArray = Array.from(new Set(
        countriesCodeStr.toUpperCase().split(' ')
    ));
    
    ISOCodeArray.forEach((code) => {
        if (checkISOCode(code)) {
            getSitesList(code);
        } 
    });
}

function checkISOCode(ISOCode) {
    // ISO code must be two a-z or A-Z letters 
    // Using RegExp for test ISO code
    const checked = /^[a-zA-Z]{2}$/.test(ISOCode);
    
    if (checked) {
        return true;
    } else {
        console.log(`${ ISOCode || 'Empty line' } is invalid! Must be two letters ISO country code, ISO31661 alpha 2. Restart and try again.`);
        return false;
    }
}

function getSitesList(code) {
    // npm package 'alexa-top-sites
    byCountry(code) 
        .then((res) => {
            // res is an object with list Top Sites in current country
            createHTMLFile(res, code);
        })
        .catch((err) => {
            console.error(err);
        }); 
}
 
function createHTMLFile(list, currentISOCode) {
    const table = createTable(list);

    const html = createHTML({
        title: currentISOCode,
        lang: 'en',
        body: table
    });

    fs.writeFile(`${ currentISOCode }.html`, html, (err) => {
    
        if (err) {
            console.log(err);
        } else {
            console.log(`${ currentISOCode }.html has been saved in root dir!`);
        }
    });
}

function createTable(list) {
    let table = '';
    let tableBody = '';

    const tableBegin = `
        <table border="1" style="border-collapse: collapse">
            <tr>
                <th>Country Rank</th>
                <th>Site URL</th>
                <th>Link to Alexa + Global Rank</th>
            </tr>
    `;
    
    const tableEnd = `
        </table>
    `;

    for (let i = 0, rank = 1, length = list.sites.length; i < length; i++, rank++) {
        // Getting domain name for transition to Alexa
        let domain = list.sites[i].replace(/https?:\/\//, '');

        tableBody += `
            <tr>
                <td>
                    ${ rank }
                </td>
                <td>
                    <a href="${ list.sites[i] }" target="_blank" >${ list.sites[i] }</a>
                </td>
                <td>
                    <a href="${ TO_ALEXA + domain }" target="_blank" >View on Alexa</a>
                </td>
            </tr>
        `;
    }

    // Put together a table
    return tableBegin + tableBody + tableEnd;
}
