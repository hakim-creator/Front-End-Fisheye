import Api from "../api/Api.js";
import Photographer from "../models/Photographer.js";
import PhotographerCard from "../templates/HomePage.js";

const photographersSection = document.querySelector(".main_photographers");
const photographersApi = new Api("./data/photographers.json");


//récupérer des données de photographes à partir d'une API,
// de créer une nouvelle instance de la classe Photographer pour chaque photographe,
// de créer une nouvelle carte de photographe pour chaque instance de Photographer et d'ajouter cette carte à la section des photographes sur la page.

const displayPhotographers = async () => {
    const photographersData = await photographersApi.get();
    const photographers = photographersData.photographers;

    photographers
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
            const template = new PhotographerCard(photographer);
            const photographerCard = template.createPhotographerCard();
            photographersSection.appendChild(photographerCard);
        });
};

displayPhotographers();