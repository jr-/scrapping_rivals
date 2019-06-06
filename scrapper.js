const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const baseURL = 'https://n.rivals.com/prospect_rankings/rivals150/';
  const baseYear = 2003;
  const maxYear = 2019;

  let actualYear = baseYear;
  const allPlayers = [];
  
  let actualURL = baseURL + actualYear;
  let actualPlayersInformations;
  
  
  while (baseYear < maxYear+1) {
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
    console.log(actualPlayersInformations.length);

    for (const actualPlayer of actualPlayersInformations) {
      actualPlayer.year = actualYear;
      allPlayers.push(actualPlayer);
    }

    actualYear += 1;
    actualURL = baseURL + actualYear;
  }
  

  



  // format text
  // name \n => espaço
  // location \n => espaço
  // commitCollege pegar até a primeira \

  
  
 
  await page.goto(actualURL);

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

  console.log(actualPlayersInformations.length);

  for (const actualPlayer of actualPlayersInformations) {
    actualPlayer.year = actualYear;
    allPlayers.push(actualPlayer);
  }

  //console.log(allPlayers);

  await browser.close();
})();
