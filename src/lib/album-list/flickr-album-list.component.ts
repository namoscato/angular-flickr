namespace amo.flickr.albumList {
    'use strict';

    export interface IFlickrAlbumListComponentBindings {
        userId: string;
    }

    /**
     * @ngdoc component
     * @module amo.flickr.albumList
     * @name amoFlickrAlbumList
     */
    angular
        .module('amo.flickr.albumList')
        .component('amoFlickrAlbumList', {
            bindings: {
                userId: '@'
            },
            controller: 'AmoFlickrAlbumListController',
            controllerAs: 'flickrAlbumList',
            templateUrl: 'flickr/album-list/flickr-album-list.html'
        });
}
