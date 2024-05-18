import Api from "../api/Api.js";
import PhotographerHeader from "../templates/PhotographerHeader.js";
import PhotographerMedias from "../templates/PhotographerMedias.js";
import Photographer from "../models/Photographer.js";
import MediasFactory from "../factories/MediasFactory.js";
import { displayTotalLikes } from "../utils/likes.js";
import { openCloseFormContact, validateForm } from "../utils/form.js";
import { openCloseFilterMenu, displayMediaWithFilter } from "../utils/filter.js";
import { displayLightbox } from "../utils/lightbox.js";

const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

//cette fonction récupère un photographe et ses médias associés par son ID à partir d'une API,
// crée des instances de Photographer et MediasFactory pour le photographe et les médias,
// puis renvoie un objet contenant le photographe et les médias.

export const getPhotographerById = async () => {
    const { photographers, media } = await photographersApi.get();
    const photographer = photographers
        .map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media.photographerId == photographerId);
    return { photographer, medias };
};

//afficher la page de profil d'un photographe spécifique.
//récupère les informations d'un photographe et de ses médias associés, crée et affiche l'en-tête et les médias du photographe,

const displayProfile = async () => {
    const { photographer, medias } = await getPhotographerById();
    const headerTemplate = new PhotographerHeader(photographer);
    headerTemplate.createPhotographerHeader();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();

    displayTotalLikes();
    openCloseFormContact();
    validateForm();
    openCloseFilterMenu();
    displayMediaWithFilter(mediasTemplate)
    displayLightbox(mediasTemplate);
};

displayProfile();