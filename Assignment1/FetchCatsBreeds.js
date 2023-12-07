const fs = require("fs");
const fetchCats = async (page) => {
  var allBreed = [];
  if (page) {
    //Page 0 and page 1 is copy of each other Therefore Page 0 excluded
    for (i = 1; i <= page; i++) {
      const response = await fetch(`https://catfact.ninja/breeds?page=${i}`, {
        method: "GET",
      });
      const result = await response.json();
      allBreed.push(...result.data);
    }
  } else {
    const response = await fetch("https://catfact.ninja/breeds", {
      method: "GET",
    });
    allBreed = response.json();
  }
  return allBreed;
};
const breedsByCountry = async (allBreed) => {
  const breedsKey = await allBreed.map((value, index) => {
    return Object.values(value)[1];
  });
  const catBreedsByCountry = {};
  breedsKey.forEach((country) => {
    for (const items of allBreed) {
      if (!catBreedsByCountry[country]) {
        catBreedsByCountry[country] = [];
      }
      if (country === items.country) {
        catBreedsByCountry[country].push({
          breed: items.breed,
          origin: items.origin,
          coat: items.coat,
          patters: items.pattern,
        });
      }
    }
  });
  return catBreedsByCountry;
};
const catfact = async () => {
  const result = await fetchCats();
  // 1)log response AS-IS to TEXT FILE
  fs.writeFile(
    "CatBreedsByCountry.txt",
    JSON.stringify(result, null, 2),
    (error) => {
      return error;
    }
  );
  //Page 0 and page 1 is copy of each other Therefore Page 0 excluded
  const totalpage = result.last_page;
  // 2) Totalpages
  console.log(`Number of pages= ${totalpage}`);
  //3) Data from all Pages
  const allBreed = await fetchCats(totalpage);
  const catBreedsByCountry = await breedsByCountry(allBreed);
  //4)get all Cat breeds by Country

  console.log(catBreedsByCountry);
};
catfact();
