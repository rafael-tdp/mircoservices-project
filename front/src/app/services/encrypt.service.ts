import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';




@Injectable({
    providedIn: 'root'
})
export class EncryptService {

    /**
 * Variable utilisée comme clé de chiffrement pour l'algorithme AES
 */
    AESKey = {
        symetricKey: "B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF"
    }

    /**
     * Définition de la clé
     * @memberof EncryptService
     */
    key = `${this.AESKey.symetricKey}`;

    constructor() {
    }

    /**
     * permet de set le localstorage avec des données chiffrées
     * @memberof EncryptService
     */
    public setData(key: string, value: string) {
        localStorage.setItem(key, this.encrypt(value));
    }

    /**
     * permet de déchiffrer les données au sein du code source grâce à la clé
     * @memberof EncryptService
     */
    public getData(key: string) {
        let data = localStorage.getItem(key) || "";
        return this.decrypt(data);
    }

    /**
     * Chiffrement du texte passé en paramètre avec l'algorithme AES
     * @memberof EncryptService
     */
    private encrypt(plainText: string): string {
        return CryptoJS.AES.encrypt(plainText, this.key).toString();
    }

    /**
     * Déchiffrement du texte passé en paramètre avec l'algorithme AES en utilisant la clé
     * @memberof EncryptService
     */
    private decrypt(cypherText: string) {
        return CryptoJS.AES.decrypt(cypherText, this.key).toString(CryptoJS.enc.Utf8);
    }

}
