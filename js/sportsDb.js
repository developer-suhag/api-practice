document.getElementById('search-error').style.display = 'none'
const spinner = document.getElementById('loading-spinnner')

document.getElementById('search-btn').addEventListener('click', () => {
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;

  // clear 
  const teamSection = document.getElementById('team-section')
  const displayTeam = document.getElementById('display-team');
  // console.log(searchText);
  const displayDetails = document.getElementById('show-deatils');
  if (searchText != '') {
    document.getElementById('search-error').style.display = 'none'
    // console.log(searchText);
    searchField.value = '';
    getTeam(searchText)
    // clear display details
    displayDetails.textContent = ''
  } else if (searchText == '') {
    // clear 
    displayTeam.innerHTML = "";
    displayDetails.textContent = ''
    document.getElementById('search-error').style.display = 'block'
  }

});

const getTeam = async team => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
  spinner.classList.remove('d-none')
  const res = await fetch(url)
  const data = await res.json();
  spinner.classList.add("d-none");
  showTeams(data.teams);
};
// const getTeam = team => {
//   const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
//   spinner.classList.remove('d-none')
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       // setTimeout(() => {
//       //   spinner.classList.add("d-none");
//       //   showTeams(data.teams);
//       // }, 1500);
//       spinner.classList.add("d-none");
//       showTeams(data.teams);

//     })
//   // const res = await fetch(url)
//   // const data = await res.json();
//   // showTeams(data.teams);
// };

const showTeams = teams => {
  const displayTeam = document.getElementById('display-team');
  displayTeam.textContent = '';
  teams.forEach(team => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div onclick="showDetails('${team.strTeam}')" class="card">
        <img src="${team.strTeamBadge}" class="card-img-top p-3" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${team.strTeam}</h5>
          <p class="card-text">
            ${team.strDescriptionEN.slice(0,150)}...
          </p>
        </div>
      </div>
        `;
    displayTeam.appendChild(div)
  });
};


const showDetails = async teamId => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayTeamDeatils(data.teams[0]);
};

const displayTeamDeatils = team => {
  const displayDetails = document.getElementById('show-deatils');
  displayDetails.textContent = '';
  const teamCard = document.createElement('div')
  teamCard.innerHTML = `
    <div class="card w-50 mx-auto">
      <img src="${team.strTeamBadge}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${team.strTeam}</h5>
        <h3>Country: ${team.strCountry}</h3>
        <p class="card-text">
          ${team.strDescriptionEN.slice(0,300)}
        </p>
      </div>
  </div>
  `;
  displayDetails.appendChild(teamCard)
};


// loading spinner 
// document.getElementById('loading-spinnner');
// const spinner = document.getElementById('loading-spinnner')
// spinner.style.display = 'block'
// const lodingSipnner = () => {
//   // console.log('hello');
//   spinner.style.display = 'none'

// }