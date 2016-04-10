namespace amo.flickr.core {
    'use strict';

    export interface IFlickrPhotoDirectiveBindings {
        height?: number;
        photo: IFlickrPhoto;
        size: string;
        thumbnailSize?: string,
        width?: number;
    }

    /**
     * @ngdoc directive
     * @module amo.flickr.core
     * @name amoFlickrPhoto
     */
    angular
        .module('amo.flickr.core')
        .component('amoFlickrPhoto', {
            bindings: {
                height: '<?',
                photo: '<',
                size: '@',
                thumbnailSize: '@?',
                width: '<?'
            },
            controller: 'AmoFlickrPhotoController',
            controllerAs: 'flickrPhoto',
            templateUrl: 'flickr/core/photo/flickr-photo.html'
        });
}
