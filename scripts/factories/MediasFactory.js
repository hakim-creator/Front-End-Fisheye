import Image from '../models/Image.js'
import Video from '../models/Video.js'

//  crée et renvoi une nouvelle instance de la classe Image ou Video en fonction des données fournies.

export default class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw 'Unknown data type'
        }
    }
}