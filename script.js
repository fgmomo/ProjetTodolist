function validateForm() {
    let tache = document.forms["myForm"]["tache"].value;
    let date = document.forms["myForm"]["date"].value;
    let priori = document.forms["myForm"]["priori"].value;

    // Vérifier si tous les champs sont remplis
    if (tache === "" || date === "" || priori === "")  {
        alert("Tous les champs doivent être remplis");
        return false; // Empêcher la soumission du formulaire
    }

    // Créer l'élément pour le nom de la tâche
    let ache3 = document.createElement("h3");
    ache3.innerHTML = tache;

    // Créer l'élément pour la priorité
    let prioPara = document.createElement("p");
    prioPara.classList.add("priori");
    prioPara.innerHTML = priori;

    // Créer l'élément pour la date
    let datePara = document.createElement("p");
    datePara.classList.add("echeance");
    datePara.innerHTML = "Échéance: " + date;

    // Créer l'élément pour les détails de la tâche
    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("tache-details");
    detailsDiv.appendChild(prioPara);
    detailsDiv.appendChild(datePara);

    // Créer le conteneur pour le checkbox
    let tacheStatus = document.createElement("div");
    tacheStatus.classList.add("tache-status");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute('onchange', 'completeTache(this)');
    tacheStatus.appendChild(checkbox);

    // Créer le conteneur pour les boutons d'action
    let tacheActions = document.createElement("div");
    tacheActions.classList.add("tache-actions");
    // let pencilIcon = document.createElement("p");
    // pencilIcon.innerHTML = "<i class='bi bi-pencil-square'></i>";
    let trashIcon = document.createElement("p");
    trashIcon.innerHTML = "<i class='bi bi-trash3' onclick='deleteTask(this)'></i>";
    // tacheActions.appendChild(pencilIcon);
    tacheActions.appendChild(trashIcon);

    // Créer le conteneur de la tâche
    let tacheItem = document.createElement("div");
    tacheItem.classList.add("tache-item");
    tacheItem.appendChild(tacheStatus);
    tacheItem.appendChild(ache3);
    tacheItem.appendChild(detailsDiv);
    tacheItem.appendChild(tacheActions);

    // Ajouter le conteneur de la tâche à la liste des tâches
    const tacheList = document.querySelector(".tache-list");
    tacheList.appendChild(tacheItem);
    saveData(); // Sauvegarder les données

    // Effacer les champs du formulaire après la soumission
    document.forms["myForm"]["tache"].value = "";
    document.forms["myForm"]["date"].value = "";
    document.forms["myForm"]["priori"].value = "";
}

function saveData() {
    const tacheList = document.querySelector(".tache-list");
    localStorage.setItem("data", tacheList.innerHTML);

    // Enregistrer l'état de chaque case à cocher
    let checkboxes = document.querySelectorAll('.tache-item input[type="checkbox"]');
    let checkboxStates = [];
    checkboxes.forEach(function(checkbox) {
        checkboxStates.push(checkbox.checked);
    });
    localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
}

function showData() {
    const tacheList = document.querySelector(".tache-list");
    tacheList.innerHTML = localStorage.getItem("data");

    // Récupérer et appliquer l'état de chaque case à cocher
    let checkboxStates = JSON.parse(localStorage.getItem("checkboxStates"));
    if (checkboxStates) {
        let checkboxes = document.querySelectorAll('.tache-item input[type="checkbox"]');
        checkboxes.forEach(function(checkbox, index) {
            checkbox.checked = checkboxStates[index];
        });
    }
}
showData();

function completeTache(checkbox) {
    let taskItem = checkbox.closest('.tache-item');
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
    saveData(); // Sauvegarder les données à chaque changement
}

function deleteTask(icon) {
    let taskItem = icon.closest('.tache-item');
    taskItem.remove();
    saveData(); // Sauvegarder les données après la suppression
}
