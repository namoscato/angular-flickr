namespace amo.flickr.album {
    'use strict';

    export interface IFlickrAlbumThumbnailActiveEvent {
        offsetLeft: number;
        offsetRight: number;
        positionLeft: number;
    }

    /**
     * @ngdoc controller
     * @module amo.flickr.album
     * @name AmoFlickrAlbumThumbnailController
     * @requires $element
     * @requires $scope
     */
    export class FlickrAlbumThumbnailController implements IFlickrAlbumThumbnailDirectiveBindings {
        isPhotoActive: boolean;
        index: number;
        onClick: Function;
        photo: amo.flickr.core.IFlickrPhoto;
        thumbnailSize: number;

        /**
         * @ngInject
         */
        constructor(
            private $element: JQuery,
            private $scope: ng.IScope) {
        }

        /**
         * @name AmoFlickrAlbumThumbnailController#$onChanges
         * @description Handler called with one-way bindings change
         * @param {Object} changes
         */
        private $onChanges(changes: any) {
            let bounds: ClientRect,
                position: JQueryCoordinates;

            if (angular.isUndefined(changes.isPhotoActive) || !changes.isPhotoActive.currentValue) {
                return;
            }

            bounds = this.$element[0].getBoundingClientRect();
            position = this.$element.position();

            this.$scope.$emit('amo.flickr.thumbnailActive', {
                offsetLeft: bounds.left,
                offsetRight: bounds.right,
                positionLeft: position.left
            });
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumThumbnailController#setPhotoIndex
         * @description Sets the current photo index
         */
        setPhotoIndex() {
            this.onClick({
                index: this.index
            });
        }
    }

    angular
        .module('amo.flickr.album')
        .controller('AmoFlickrAlbumThumbnailController', FlickrAlbumThumbnailController);
}
