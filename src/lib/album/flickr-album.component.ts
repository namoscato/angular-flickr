namespace amo.flickr.album {
    'use strict';

    export interface IFlickrAlbumComponentBindings {
        albumId: string;
        userId: string;
    }

    /**
     * @ngdoc component
     * @module amo.flickr.album
     * @name amoFlickrAlbum
     */
    angular
        .module('amo.flickr.album')
        .component('amoFlickrAlbum', {
            bindings: {
                albumId: '@',
                userId: '@'
            },
            controller: 'AmoFlickrAlbumController',
            controllerAs: 'flickrAlbum',
            templateUrl: 'flickr/album/flickr-album.html'
        });
}
