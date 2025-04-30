export const alerts = [
    {
      id: 1,
      title: "Avis d'ébullition d'eau",
      arrondissement: "Ville-Marie",
      date: "2023-06-15",
      subject: "Eau",
      summary: "Un avis d'ébullition d'eau est en vigueur dans le secteur suivant.",
      content: `
        <h2>Avis d'ébullition d'eau</h2>
        <p>Un avis d'ébullition d'eau est en vigueur dans le secteur suivant:</p>
        <ul>
          <li>Avenue du Président-Kennedy, entre les rues Saint-Urbain et Jeanne-Mance</li>
          <li>Boulevard De Maisonneuve Ouest, entre les rues Saint-Urbain et Jeanne-Mance</li>
        </ul>
        <p>Cet avis est en vigueur jusqu'à nouvel ordre.</p>
        <h3>Mesures préventives</h3>
        <p>Nous vous recommandons de faire bouillir l'eau du robinet à gros bouillons pendant au moins une minute avant de la consommer.</p>
      `,
    },
    {
      id: 2,
      title: "Fermeture de rue - Travaux d'aqueduc",
      arrondissement: "Rosemont–La Petite-Patrie",
      date: "2023-06-20",
      subject: "Travaux",
      summary: "Fermeture de la rue Beaubien Est entre les rues Saint-Denis et Saint-Hubert.",
      content: `
        <h2>Fermeture de rue - Travaux d'aqueduc</h2>
        <p>La rue Beaubien Est sera fermée entre les rues Saint-Denis et Saint-Hubert du 20 juin au 15 juillet 2023.</p>
        <h3>Impact sur la circulation</h3>
        <p>Des détours seront mis en place. Nous vous invitons à planifier vos déplacements en conséquence.</p>
        <h3>Impact sur le stationnement</h3>
        <p>Le stationnement sera interdit dans la zone des travaux pendant toute la durée du chantier.</p>
      `,
    },
    {
      id: 3,
      title: "Opération de déneigement",
      arrondissement: "Ahuntsic-Cartierville",
      date: "2023-12-05",
      subject: "Déneigement",
      summary: "Une opération de déneigement sera en cours dans l'arrondissement.",
      content: `
        <h2>Opération de déneigement</h2>
        <p>Une opération de déneigement aura lieu dans l'arrondissement Ahuntsic-Cartierville à partir du 5 décembre 2023.</p>
        <h3>Respectez la signalisation</h3>
        <p>Veuillez respecter la signalisation temporaire interdisant le stationnement pour faciliter le déneigement.</p>
        <h3>Stationnement alternatif</h3>
        <p>Des espaces de stationnement alternatifs sont disponibles dans les terrains municipaux pendant la durée de l'opération.</p>
      `,
    },
    {
      id: 4,
      title: "Fermeture temporaire de la piscine municipale",
      arrondissement: "Le Plateau-Mont-Royal",
      date: "2023-07-10",
      subject: "Loisirs",
      summary: "La piscine municipale du parc Laurier sera fermée pour entretien.",
      content: `
        <h2>Fermeture temporaire de la piscine municipale</h2>
        <p>La piscine municipale du parc Laurier sera fermée pour entretien du 10 au 15 juillet 2023.</p>
        <h3>Piscines alternatives</h3>
        <p>Pendant cette période, nous vous invitons à fréquenter les piscines des parcs suivants:</p>
        <ul>
          <li>Piscine Baldwin (parc Baldwin)</li>
          <li>Piscine Sir-Wilfrid-Laurier (parc Sir-Wilfrid-Laurier)</li>
        </ul>
      `,
    },
    {
      id: 5,
      title: "Changement d'horaire - Collecte des matières recyclables",
      arrondissement: "Mercier–Hochelaga-Maisonneuve",
      date: "2023-08-01",
      subject: "Environnement",
      summary: "Modification de l'horaire de collecte des matières recyclables dans le secteur est.",
      content: `
        <h2>Changement d'horaire - Collecte des matières recyclables</h2>
        <p>À compter du 1er août 2023, l'horaire de collecte des matières recyclables sera modifié dans le secteur est de l'arrondissement Mercier–Hochelaga-Maisonneuve.</p>
        <h3>Nouveau jour de collecte</h3>
        <p>La collecte aura désormais lieu le jeudi au lieu du mardi.</p>
        <h3>Rappel important</h3>
        <p>Veuillez sortir vos bacs la veille de la collecte après 20h ou avant 7h le jour même.</p>
      `,
    },
  ];
  
  export const arrondissements = [
    "Tous les arrondissements",
    "Ahuntsic-Cartierville",
    "Anjou",
    "Côte-des-Neiges–Notre-Dame-de-Grâce",
    "L'Île-Bizard–Sainte-Geneviève",
    "Lachine",
    "LaSalle",
    "Le Plateau-Mont-Royal",
    "Le Sud-Ouest",
    "Mercier–Hochelaga-Maisonneuve",
    "Montréal-Nord",
    "Outremont",
    "Pierrefonds-Roxboro",
    "Rivière-des-Prairies–Pointe-aux-Trembles",
    "Rosemont–La Petite-Patrie",
    "Saint-Laurent",
    "Saint-Léonard",
    "Verdun",
    "Ville-Marie",
    "Villeray–Saint-Michel–Parc-Extension"
  ];
  
  export const subjects = [
    "Tous les sujets",
    "Eau",
    "Travaux",
    "Déneigement",
    "Loisirs",
    "Environnement",
    "Sécurité",
    "Transport",
    "Événements"
  ];