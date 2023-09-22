import PropTypes from "prop-types"; // Importer PropTypes pour définir les types des props
import {
  createContext, // Importer createContext pour créer un contexte
  useCallback, // Importer useCallback pour mémoriser une fonction stable
  useContext, // Importer useContext pour accéder au contexte
  useEffect, // Importer useEffect pour effectuer des effets de bord
  useState, // Importer useState pour gérer l'état local
} from "react"; // Importer des fonctions de React

const DataContext = createContext({}); // Créer un contexte nommé DataContext avec une valeur par défaut vide

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json"); // Charger des données depuis un fichier JSON
    return json.json(); // Convertir la réponse en JSON
  },
};

export const DataProvider = ({ children }) => { // Créer un composant DataProvider qui prend des enfants comme props
  const [error, setError] = useState(null); // Déclarer une variable d'état 'error' avec la valeur initiale null
  const [data, setData] = useState(null); // Déclarer une variable d'état 'data' avec la valeur initiale null

  const getData = useCallback(async () => { // Définir une fonction getData en utilisant useCallback
    try {
      setData(await api.loadData()); // Charger les données à partir de la source API et les stocker dans 'data'
    } catch (err) {
      setError(err); // En cas d'erreur, stocker l'erreur dans 'error'
    }
  }, []);

  const events = data?.events; // Extraire la liste des événements de 'data'
  const sortedEvents = events?.sort((evtA, evtB) => new Date(evtA.date) > new Date(evtB.date) ? -1 : 1); // Trier les événements par date
  const last = sortedEvents?.[0]; // Obtenir le dernier événement de la liste triée

  useEffect(() => { // Utiliser useEffect pour effectuer des actions lorsque le composant est monté
    if (data) return; // Si les données existent, ne rien faire
    getData(); // Sinon, appeler la fonction getData pour charger les données
  });

  return (
    <DataContext.Provider // Fournir le contexte avec les données, les erreurs et le dernier événement
       /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        data,
        error,
        last,
      }}
    >
      {children} {/* Rendre les composants enfants à l'intérieur du contexte */}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Propriété children de type node requise
};

export const useData = () => useContext(DataContext); // Créer un hook useData pour accéder aux données du contexte

export default DataContext; // Exporter le contexte par défaut
