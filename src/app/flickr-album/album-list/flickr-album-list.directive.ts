namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc service
     * @module amo.flickrAlbum
     * @name amoFlickrApiService
     * @requires $http
     */
    export class FlickrAlbumListDirective implements ng.IDirective {
        bindToController = true;
        controller = 'AmoFlickrAlbumListController';
        controllerAs = 'flickrAlbumList';
        replace = true;
        restrict = 'E';
        templateUrl = 'flickr-album/album-list/flickr-album-list.html';

        static instance(): ng.IDirective {
            return new FlickrAlbumListDirective();
        }
    }

    angular
        .module('amo.flickrAlbum')
        .directive('amoFlickrAlbumList', FlickrAlbumListDirective.instance);
}
