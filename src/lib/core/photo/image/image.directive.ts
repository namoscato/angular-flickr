namespace amo.flickr.core {
    'use strict';

    export interface IImageDirectiveBindings {
        height?: number;
        imageAlt?: string;
        imageHeight: string;
        imageSource: string;
        imageWidth: string;
        thumbnailSource?: string;
        width?: number;
    }

    /**
     * @ngdoc directive
     * @module amo.flickr.core
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
            thumbnailSource: '=',
            width: '='
        };
        templateUrl: string = 'flickr/core/photo/image/image.html';

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
        .module('amo.flickr.core')
        .directive('amoImage', ImageDirective.instance);
}
