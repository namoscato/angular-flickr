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
    angular
        .module('amo.flickr.core')
        .component('amoImage', {
            bindings: {
                height: '<?',
                imageAlt: '<?',
                imageHeight: '<',
                imageSource: '<',
                imageWidth: '<',
                thumbnailSource: '<',
                width: '<?'
            },
            controller: 'AmoImageController',
            controllerAs: 'image',
            templateUrl: 'flickr/core/photo/image/image.html'
        });
}
