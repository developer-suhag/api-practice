document.getElementById('search-btn').addEventListener('click', () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    searchField.value = '';
    getTeam(searchText)
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
    teams.forEach(team => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${team.strTeamJersey}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${team.strTeam}</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
        </div>
      </div>
        `;
        displayTeam.appendChild(div)
    });
}