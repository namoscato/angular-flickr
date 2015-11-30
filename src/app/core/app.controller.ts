namespace app.core {
    'use strict';

    /**
     * @ngdoc controller
     * @module flickrAlbumDemo.core
     * @name AppController
     */
    export class AppController {

        /**
         * @ngdoc method
         * @name AppController#onChange
         * @description Handler executed when multiselect control changes
         * @param {String} label
         */
        onChange(label: string) {
            console.log('onChange', label);
        }
    }

    angular
        .module('flickrAlbumDemo.core')
        .controller('AppController', AppController);
}
