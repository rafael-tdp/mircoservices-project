

/**
 * Interface UserInt
 * @export
 * @interface UserInt
 */
export interface UserInt {

    /**
   * Id de l'utilisateur
   * @type {string}
   * @memberof UserInt
   */
    _id: string;

    /**
     * Prenom de l'utilisateur
     * @type {string}
     * @memberof UserInt
     */
    firstname: string;

    /**
     * Prenom de l'utilisateur
     * @type {string}
     * @memberof UserInt
     */
    lastname: string;

    /**
     * Adresse Mail de l'utilisateur
     * @type {string}
     * @memberof UserInt
     */
    email: string;

    /**
     * Token d'acces
     * @type {string}
     * @memberof UserInt
     */
    token: string;

}

/**
 * Interface User
 * @export
 * @class User
 * @implements {UserInt}
 */
export class User implements UserInt {
    /**
     * Creates an instance of User.
     * @param {string} _id Id de l'utilisateur
     * @param {string} firstname Prénom de l'utilisateur
     * @param {string} lastname Prénom de l'utilisateur
     * @param {string} email Email de l'utilisateur
     * @param {string} token Token pour les accès
     * @memberof UserInt
     */
    constructor(
        public _id: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public token: string,
    ) {
    }

    /**
     * Permet de créer un objet User grâce à un objet
     * @param json Objet Neutre sans type particulier
     */
    public static fromObject(json: User): User {
        return new User(
            json._id,
            json.firstname,
            json.lastname,
            json.email,
            json.token
        );
    }
}
