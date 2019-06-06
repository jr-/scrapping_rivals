const fs = require('fs');
const { parse } = require('json2csv');
const puppeteer = require("puppeteer");

async function scrapping() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const baseURL = 'https://n.rivals.com/prospect_rankings/rivals150/';
  const baseYear = 2003;
  const maxYear = 2021;
  // const maxYear = 2003;

  let actualYear = baseYear;
  const allPlayers = [];
  
  let actualURL = baseURL + actualYear;
  let actualPlayersInformations;
  
  
  while (actualYear < maxYear+1) {
    await page.goto(actualURL);
    await page.goto(actualURL);
    await page.goto(actualURL);
    await page.goto(actualURL);
    await page.goto(actualURL);
    await page.goto(actualURL);
    // CACHE 30 by 30 players

    actualPlayersInformations = await page.evaluate(() =>
      Array.from(document.querySelectorAll("table.sortable-table.rankings.list.gradient-long tbody tr"))
        .map(tr => ({
          name: tr.querySelector("td.player-name-prospects").innerText.trim(),
          rank: tr.querySelector("td.rank").innerText.trim(),
          position: tr.querySelector("td.position").innerText.trim(),
          location: tr.querySelector("td.location-prospects").innerText.trim(),
          commitCollege: tr.querySelector("td.school-name-prospects").innerText.trim(),
        }))
    );

    console.log(actualPlayersInformations.length, actualYear);
   
    const actualYearStr = actualYear.toString();

    for (const actualPlayer of actualPlayersInformations) {
      actualPlayer.year = actualYearStr;
      actualPlayer.name = actualPlayer.name.replace(/\n/g, ' ');
      actualPlayer.location = actualPlayer.location.replace(/\n/g, ' ');
      const charPos = actualPlayer.commitCollege.indexOf('\n');

      if (charPos > 0) {
          actualPlayer.commitCollege = actualPlayer.commitCollege.substring(0, charPos);
      }
      allPlayers.push(actualPlayer);
    }

    actualYear += 1;
    actualURL = baseURL + actualYear;
  }

  await browser.close();

  return allPlayers;
}

(async () => {
  const allPlayers = await scrapping();
  console.log(allPlayers.length);
  console.log(allPlayers);
  const fields = ['name', 'rank', 'position', 'location', 'commitCollege', 'year'];
  const opts = { fields };
  
  try {
    const csv = parse(allPlayers, opts);
    fs.writeFile('players.csv', csv, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
  } catch (err) {
    console.error(err);
  }
})();  