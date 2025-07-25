// Fonction pour récupérer le contenu d'un élément HTML dont l'id est strID.
// Si l'élément est un champs de formulaire, le contenu est la valeur (.value) de ce champs.
// Pour les autres types d'éléments, il s'agit du contenu entre les balises (.innerHTML).
function getContenuElement(strID) {
    let objBalise = document.getElementById(strID);

    if (!objBalise) {
        console.error(`Attention! L'élément avec ID "${strID}" est introuvable.`);
        return null;
    }

   return ('value' in objBalise) ? objBalise.value : objBalise.innerHTML;
}

// Fonction pour affecter le contenu d'un élément HTML dont l'id est strID.
// Si l'élément est un champs de formulaire, la valeur (.value) de ce champs est modifiée.
// Pour les autres types d'éléments, le contenu entre les balises (.innerHTML) est modifié.
function setContenuElement(strID, strValeur) {
    let objBalise = document.getElementById(strID);

    if (!objBalise) {
        console.error(`Attention! L'élément avec ID "${strID}" est introuvable.`);
        return;
    }

    if ('value' in objBalise) {
        objBalise.value = strValeur;
    } else {
        objBalise.innerHTML = strValeur;
    }
}

// Cette fonction retourne les sélecteurs de mise en forme
// de l'élément HTML dont l'id est strID.
function getStyle(strID) {
    let objBalise = document.getElementById(strID);

    if (!objBalise) {
        console.error(`Attention! L'élément avec ID "${strID}" est introuvable.`);
        return null;
    }
    
    return objBalise.className;
}

// Cette fonction affecte des sélecteurs de mise en forme
// de l'élément HTML dont l'id est strID.
function setStyle(strID, strSelecteurs) {
    let objBalise = document.getElementById(strID);

    if (!objBalise) {
        console.error(`Attention! L'élément avec ID "${strID}" est introuvable.`);
        return;
    }
    
    objBalise.className = strSelecteurs;
}

// Cette fonction masque ou affiche l'élément HTML dont l'id est strID.
// Un élément masqué n'occupe pas d'espace sur une page Web.
function masquerElement(strID, binMasque) {
    let objBalise = document.getElementById(strID);

    if (!objBalise) {
        console.error(`Attention! L'élément avec ID "${strID}" est introuvable.`);
        return;
    }

    objBalise.style.display = binMasque ? 'none' : 'inline';
}

// Cette fonction cache ou rend visible l'élément HTML dont l'id est strID.
// Un élément caché occupe son espace mais est invisible sur une page Web.
function cacherElement(strID, binCache) {
    let objBalise = document.getElementById(strID);

    if (!objBalise) {
        console.error(`Attention! L'élément avec ID "${strID}" est introuvable.`);
        return;
    }

    objBalise.style.visibility = binCache ? 'hidden' : 'visible';
}

// Cette fonction récupère et retourne 
// la valeur d'une donnée transmise à une page Web.
// Si la donnée n'est pas récupérable, cette fonction retourne null. 
function recupereDonnee(nomDonnee) {
    // Récupère les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);
  
    // Récupère la valeur associée au nom donné
    const valeur = params.get(nomDonnee);
  
    // Si une valeur est trouvée, on la décode proprement (remplacement des + par des espaces, puis décodage URL)
    return valeur ? decodeURIComponent(valeur.replace(/\+/g, ' ')) : null;
}

// Cette fonction enregistre un cookie.
// Si le cookie est déjà présent sa valeur est remplacée.
// intDuree représente la durée du cookie en jours.
// Si la durée est négative, le cookie est automatiquement détruit.
// S'il n'y a pas de durée, le cookie est créé mais détruit à la fermeture du navigateur
function enregistreCookie(strNomCookie, strValeurCookie, intDuree) {
    let strEcheance = '';
    if (intDuree) {  
        // Transforme la durée en date d'échéance
        let objDate = new Date();
        objDate.setTime(objDate.getTime() + (intDuree * 24 * 60 * 60 * 1000));
        strEcheance = '; expires=' + objDate.toGMTString();
    }
   
    // Ajoute le cookie
    document.cookie = strNomCookie + '=' + strValeurCookie + strEcheance;
}

// Cette fonction récupère la valeur d'un cookie.
// Si le cookie n'existe pas, cette fonction retourne null.
function recupereCookie(strNomCookie) {
    // Va chercher tous les cookies accessibles
    let tabStrCookies = document.cookie.split(';');
    let strValeurCookie = null;
    for (let i = 0; i < tabStrCookies.length; i++) {
        // Sépare le nom de sa valeur
        let tabNomEtValeurCookie = tabStrCookies[i].split('=');
        // Enlève l'espace avant le nom
        if (tabNomEtValeurCookie[0].charAt(0) == ' ')
            tabNomEtValeurCookie[0] = tabNomEtValeurCookie[0].substring(1);
        if (tabNomEtValeurCookie[0] == strNomCookie) {
            // Le nom a été trouvé; va chercher sa valeur
            strValeurCookie = tabNomEtValeurCookie[1];
        }
    }
    return strValeurCookie;
}
