async function getGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/uchiw4/repos?sort=created&direction=desc&per_page=4'); 
        const repos = await response.json();

        const repoGrid = document.getElementById('repoGrid');
        repos.forEach(repo => {
            const repoCard = document.createElement('a'); // Changez 'div' par 'a'
            repoCard.className = "repo-card";
            repoCard.href = repo.html_url;
            repoCard.target = "_blank";
            repoCard.innerHTML = `
                <h3 class="repo-title">${repo.name}</h3>
                <p class="repo-description">${repo.description || "Pas de description disponible"}</p>
            `;
            repoGrid.appendChild(repoCard);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des dépôts GitHub:", error);
    }
}

getGitHubRepos();

document.getElementById('saveNote').addEventListener('click', function() {
    const notes = document.getElementById('notesArea').value;
    localStorage.setItem('userNotes', notes);
});

// Charger les notes lorsque la page est chargée
window.addEventListener('DOMContentLoaded', (event) => {
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
        document.getElementById('notesArea').value = savedNotes;
    }
});


