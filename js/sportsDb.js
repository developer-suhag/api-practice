document.getElementById('search-btn').addEventListener('click', () => {
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  if (searchText == '') {

  } else {
    searchField.value = '';
    getTeam(searchText)
  }
});

const getTeam = async team => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
  const res = await fetch(url)
  const data = await res.json();
  showTeams(data.teams);
};

const showTeams = teams => {
  // console.log(teams);
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
  console.log(team);
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
}