import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // Récupérer les données du contexte DataContext
  const [index, setIndex] = useState(0); // Initialiser un état local 'index' à 0

  // Trier les événements par date en ordre décroissant
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  const imgSlide = data?.focus?.length; // Obtenir le nombre total d'images de diapositive

  const nextCard = () => { // Définir une fonction nextCard
    setTimeout(
      () => setIndex(index < imgSlide - 1 ? index + 1 : 0), // Passer à la diapositive suivante (ou revenir à la première) toutes les 5 secondes
      5000
    );
  };

  useEffect(() => { // Appeler nextCard lorsque le composant est monté
    nextCard();
  });

  return (
    <div className="SlideCardList"> {/* Élément contenant le carrousel */}
      {/* Mapping des diapositives des événements */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title} // Clé unique basée sur le titre de l'événement
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`} // Appliquer la classe 'display' si l'index correspond à la diapositive actuelle, sinon 'hide'
        >
          <img src={event.cover} alt="forum" /> {/* Afficher l'image de l'événement */}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3> {/* Afficher le titre de l'événement */}
              <p>{event.description}</p> {/* Afficher la description de l'événement */}
              <div>{getMonth(new Date(event.date))}</div> {/* Afficher le mois de la date de l'événement en utilisant la fonction getMonth */}
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((focus, radioIdx) => (
            <input
              key={focus.title} // Clé unique basée sur le titre de l'événement
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Cocher le bouton radio si l'index correspond à la diapositive actuelle
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider; // Exporter le composant Slider
