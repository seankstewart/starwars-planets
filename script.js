// Using fetch or Axios, hit the Star Wars API (swapi) and create a list of all 60 planets with the names of each resident listed under each planet. 

// If time permits, lets visualize this data in bootstrap cards and add a button that sorts the planets based on population.

// Example return:
// [
//   {
//     planet_name: "Tattoine", 
//     residents: ["Luke", "Delcie", "Cody"]
//   },
//   {
//     planet_name: "Alderaan", 
//     residents: ["Aidan", "Matt", "Andy"]
//   }
// ]

// https://swapi.dev/
// https://swapi.dev/documentation

const swapi = "https://swapi.dev/api/";
const planetsEndpoint = "planets";
const peopleEndpoint = "people";
let next = "";

const getResidents = async (url) => {
  const residentData = await fetch(url).then((res) => res.json()).then(async (data) => {
    return data.name;
  });

  return residentData;
}

const getPlanets = async (url) => {
  console.log('LOADING :::::::::::::::::::::')
  let num = 0;
  const planetsData = await fetch(url).then((res) => res.json()).then(async (data) => {
    
    for (const planet of data.results) {

      const card = document.createElement("div");
      card.classList = "card";

      card.innerHTML += "<h2>" + planet.name + "</h2>";

      if (planet.residents.length === 0) {
        card.innerHTML += "<em>these are not the residents you're looking for.</em>";
      }

      for (const residentURL of planet.residents) {
        const residentName = await getResidents(residentURL);
        card.innerHTML += residentName + "<br />";
      }
      
      container.appendChild(card);

      num++;

      if (num === data.results.length && data.next !== null) {
        console.log(num)
        document.getElementById("loadMore").classList = "page-link";
        document.getElementById("loadMore").addEventListener('click', (e) => handleClick(e, data.next), {once: true});
        break;
      } else {
        document.getElementById("loadMore").classList = "page-link loading";
      }
    }
  });
}

const container = document.getElementById("planets");
getPlanets(swapi+planetsEndpoint);



const handleClick = (e, nextUrl) => {
  
  e.preventDefault();
  if (nextUrl === "") {
    return null;
  }

  document.getElementById("loadMore").classList = "page-link loading";
  getPlanets(nextUrl);
}

