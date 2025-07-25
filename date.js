/*
|-----------------------------------------------------------------------------|
| er: 
| Retourne la chaine er si intJourDuMois = 1 et binExposant = false                                       
| Retourne la chaine er en exposant si intJourDuMois = 1 et binExposant = true
| Retourne la chaîne vide dans tous les autres cas                              
|-----------------------------------------------------------------------------|
*/
function er(intJourDuMois, binExposant) {
   if (intJourDuMois !== 1) return '';
   return binExposant ? '<sup>er</sup>' : 'er';
}

/*
|-----------------------------------------------------------------------------|
| jourSemaineEnLitteral: 
| Retourne le jour de la semaine en littéral (0=Dimanche,...,6=Samedi)        
| Retourne la première lettre en majuscule si binMajuscule vaut true          
| Retourne la chaîne vide si le numéro du jour n'est pas entre 0 et 6         
|-----------------------------------------------------------------------------|
*/
function jourSemaineEnLitteral(intJourSem, binMajuscule) {
   const tabJours = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
   ];

   if (intJourSem < 0 || intJourSem > 6) return '';
   return binMajuscule ? tabJours[intJourSem] : tabJours[intJourSem].toLowerCase();
}

/*
|-----------------------------------------------------------------------------|
| moisEnLitteral: 
| Retourne le mois en littéral (0=Janvier,...,11=Décembre)                    
| Retourne la première lettre en majuscule si binMajuscule vaut true
| Retourne la chaîne vide si le numéro du mois n'est pas entre 0 et 11
|-----------------------------------------------------------------------------|
*/
function moisEnLitteral(intMois, binMajuscule) {
   const tabMois = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
   ];

   if (intMois < 0 || intMois > 11) return '';
   return binMajuscule ? tabMois[intMois] : tabMois[intMois].toLowerCase();
}

/*
|-----------------------------------------------------------------------------|
| bissextile: 
| Retourne true si l'année est bissextile sinon retourne false  
|-----------------------------------------------------------------------------|
*/
function bissextile(intAnnee) {
   return ((intAnnee % 4 == 0 && intAnnee % 100 != 0) || (intAnnee % 400 == 0));
}

/*
|-----------------------------------------------------------------------------|
| nombreJoursAnnee: 
| Retourne le nombre de jours qu'il y a dans l'année          
|-----------------------------------------------------------------------------|
*/
function nombreJoursAnnee(intAnnee) {
   return bissextile(intAnnee) ? 366 : 365;
}

/*
|-----------------------------------------------------------------------------|
| nombreJoursMois: 
| Retourne le nombre de jours dans un mois pour une année donnée       
| Retourne -1 si le mois n'est pas entre 0 et 11    
|-----------------------------------------------------------------------------|
*/
function nombreJoursMois(intMois, intAnnee) {
   switch (intMois) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
         return 31;
      case 3:
      case 5:
      case 8:
      case 10:
         return 30;
      case 1:
         return bissextile(intAnnee) ? 29 : 28;
      default:
         return -1;
   }
}

/*
|-----------------------------------------------------------------------------|
| dateValide: 
| Retourne true si la date est valide
| Retourne false dans le cas contraire
|-----------------------------------------------------------------------------|
*/
function dateValide(intJour, intMois, intAnnee) {
   const date = new Date(intAnnee, intMois, intJour);
   return (intJour == date.getDate())
}


/*
|-----------------------------------------------------------------------------|
| dateEnJourSemaine:
| Retourne le no du jour de la semaine (entre 0 et 6) 
| qui correspond à une date
| Retourne -1 si la date n'est pas valide
|-----------------------------------------------------------------------------|
*/
function dateEnJourSemaine(intJour, intMois, intAnnee) {
   if (!dateValide(intJour, intMois, intAnnee)) return -1;
   else return (new Date(intAnnee, intMois, intJour)).getDay();
}


/*
|------------------------------------------------------------------------------|
| recupereJourActuel:
| Retourne le jour actuel
|------------------------------------------------------------------------------|
*/
function recupereJourActuel() {
   return (new Date()).getDate();
}

/*
|------------------------------------------------------------------------------|
| recupereMoisActuel:
| Retourne le mois actuel
|------------------------------------------------------------------------------|
*/
function recupereMoisActuel() {
   return (new Date()).getMonth();
}

/*
|------------------------------------------------------------------------------|
| recupereAnneeActuelle:
| Retourne l'année actuelle
|------------------------------------------------------------------------------|
*/
function recupereAnneeActuelle() {
   return (new Date()).getFullYear();
}

/*
|-----------------------------------------------------------------------------|
| dateEnFormatCourt: 
| Retourne la date dans un format court: jj/mm/aaaa
| Si la date est invalide, retourne une chaine vide
| Par exemple: '01/06/2012'
|-----------------------------------------------------------------------------|
*/
function dateEnFormatCourt(intJour, intMois, intAnnee) {
   let strFormat = '';
   if (dateValide(intJour, intMois, intAnnee)) {
      intMois += 1;
      strFormat = ((intJour < 10) ? '0' + intJour : intJour) + '/' +
         ((intMois < 10) ? '0' + intMois : intMois) + '/' +
         intAnnee;
   }
   return strFormat;
}

/*
|-----------------------------------------------------------------------------|
| dateEnLitteralCourt: 
| Retourne la date dans un format littéral court
| Si la date est invalide, retourne une chaine vide
| Si le jour est 1, er est en exposant
| Par exemple: '2 juin 2012'
| Offre la possibilité d'afficher la 1ère lettre du mois en majuscule 
|-----------------------------------------------------------------------------|
*/
function dateEnLitteralCourt(intJour, intMois, intAnnee, binMoisMajuscule) {
   if (!dateValide(intJour, intMois, intAnnee)) return '';

   const strJour = intJour + er(intJour, true);
   const strMois = moisEnLitteral(intMois, binMoisMajuscule);
   return `${strJour} ${strMois} ${intAnnee}`;
}

/*
|-----------------------------------------------------------------------------|
| dateEnLitteralLong: 
| Retourne la date dans un format littéral long
| Si la date est invalide, retourne une chaine vide
| Si le jour est 1, er est en exposant
| Par exemple: 'Mercredi, le 21 mars 2012'
| Offre la possibilité d'afficher la 1ère lettre du mois en majuscule 
|-----------------------------------------------------------------------------|
*/
function dateEnLitteralLong(intJour, intMois, intAnnee, binMoisMajuscule) {
   if (!dateValide(intJour, intMois, intAnnee)) return '';

   const strJourLitteral = jourSemaineEnLitteral(dateEnJourSemaine(intJour, intMois, intAnnee), true);
   return `${strJourLitteral}, le ${dateEnLitteralCourt(intJour, intMois, intAnnee, binMoisMajuscule)}`;
}

/*
|-----------------------------------------------------------------------------|
| millisecondesEntreDeuxDates: 
| Retourne le nombre de millisecondes entre deux dates
|-----------------------------------------------------------------------------|
*/
function millisecondesEntreDeuxDates(objDate1, objDate2) {
   return objDate2.getTime() - objDate1.getTime();
}

/*
|-----------------------------------------------------------------------------|
| joursEntreDeuxDates: 
| Retourne le nombre de jours entre deux dates
|-----------------------------------------------------------------------------|
*/
function joursEntreDeuxDates(objDate1, objDate2) {
   // A PROGRAMMER

   let joursObj1 = new Date(objDate1.getFullYear(), objDate1.getMonth(), objDate1.getDate());
   let joursObj2 = new Date(objDate2.getFullYear(), objDate2.getMonth(), objDate2.getDate());
   let diff = Math.round((joursObj1.getTime() - joursObj2.getTime()) / (1000 * 3600 * 24));
   return -diff;  // J'ajoute le (-), car je cherche à savoir combien de jours pour la date (D'habitude ce sera affiché: -5 days si ca manque 5 jours)
}

/*
|-----------------------------------------------------------------------------|
| estDansMois: 
| Retourne vrai si une date objDateAVerifier se situe
| dans le mois (intMois) de l'année (intAnnee) spécifiés
| Retourn faux sinon
|-----------------------------------------------------------------------------|
*/
function estDansMois(intMois, intAnnee, objDateAVerifier) {
   // A PROGRAMMER
   return (intMois == (objDateAVerifier.getMonth())) && (intAnnee == (objDateAVerifier.getFullYear()));

}

/*
|-----------------------------------------------------------------------------|
| estMemeJournee: 
| Retourne si deux dates sont la même journée de la même année, indépendemment
| de l'heure
|-----------------------------------------------------------------------------|
*/
function estMemeJournee(objDate1, objDate2) {
   // A PROGRAMMER
   return ((objDate1.getFullYear() == objDate2.getFullYear()) && (objDate1.getMonth() == objDate2.getMonth()) && (objDate1.getDate() == objDate2.getDate()));
}
/*
|-----------------------------------------------------------------------------|
| moisLitteralEnIndex: 
| Retourne l'index d'un mois à partir de la chaine de caractères strMois
|-----------------------------------------------------------------------------|
*/
function moisLitteralEnIndex(strMois) {
   // A PROGRAMMER
   let listeMoisLitteral = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
   ];

   return listeMoisLitteral.indexOf(strMois);
}

function main() {
   // Pour tester
   let ceci = [
      moisLitteralEnIndex("Janvier"),
      moisLitteralEnIndex("Décembre"),
      moisLitteralEnIndex("Decembre"),
      moisLitteralEnIndex("Mai")
   ]
   for (let i = 0; i < ceci.length; i++) {
      console.log("Voilà: " + ceci[i]);
   }

}

