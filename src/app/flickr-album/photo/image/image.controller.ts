namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoImageController
     */
    export class ImageController implements IImageDirectiveBindings {
        computedHeight: number = this.height;
        computedWidth: number = this.width;
        height: number;
        imageHeight: string;
        imageSource: string;
        imageWidth: string;
        width: number;

        /**
         * @ngInject
         */
        constructor() {
            // TODO: Handle case when both height and width are set
            if (angular.isDefined(this.height)) {
                this.computedWidth = this.height / Number(this.imageHeight) * Number(this.imageWidth);
            } else if (angular.isDefined(this.width)) {
                this.computedHeight = this.width / Number(this.imageWidth) * Number(this.imageHeight);
            }
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoImageController', ImageController);
}
