namespace amo.flickrAlbum {
    'use strict';

    export interface IImageDirectiveBindings {
        height?: number;
        imageAlt?: string;
        imageHeight: string;
        imageSource: string;
        imageWidth: string;
        width?: number;
    }

    /**
     * @ngdoc directive
     * @module amo.flickrAlbum
     * @name amoImage
     */
    export class ImageDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoImageController';
        controllerAs: string = 'image';
        restrict: string = 'E';
        replace: boolean = true;
        scope: Object = {
            height: '=',
            imageAlt: '=',
            imageHeight: '=',
            imageSource: '=',
            imageWidth: '=',
            width: '='
        };
        templateUrl: string = 'flickr-album/photo/image/image.html';

        /**
         * @name amoImage#instance
         * @description Returns a new directive instance
         * @returns {Object}
         */
        static instance(): ng.IDirective {
            return new ImageDirective();
        }
    }

    angular
        .module('amo.flickrAlbum')
        .directive('amoImage', ImageDirective.instance);
}
