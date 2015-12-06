namespace amo.flickrAlbum {
    'use strict';

    interface IImageStyle {
        left?: string
    }

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoImageController
     */
    export class ImageController implements IImageDirectiveBindings {
        computedHeight: number;
        computedWidth: number;
        height: number;
        imageHeight: string;
        imageSource: string;
        imageStyle: IImageStyle = {};
        imageWidth: string;
        source: string;
        thumbnailSource: string;
        width: number;

        /**
         * @ngInject
         */
        constructor($scope: ng.IScope) {
            let asynchronousImage: HTMLImageElement,
                width: number;

            $scope.$watchGroup([
                'image.imageSource',
                'image.width',
                'image.height'
            ], (values: Array<number|IFlickrPhoto>) => {
                if (angular.isUndefined(values[0])) { return; }

                if (angular.isDefined(this.thumbnailSource)) {
                    this.source = this.thumbnailSource;

                    asynchronousImage = new Image();
                    asynchronousImage.onload = () => {
                        $scope.$apply(() => {
                            this.source = asynchronousImage.src;
                        });
                    };
                    asynchronousImage.src = this.imageSource;
                } else {
                    this.source = this.imageSource;
                }

                this.computedHeight = null;
                this.computedWidth = null;

                if (angular.isUndefined(values[1]) && angular.isUndefined(values[2])) { return; }

                if (angular.isUndefined(this.height)) { // Only width is defined
                    this.setWidth(this.width);
                } else if (angular.isUndefined(this.width)) { // Only height is defined
                    this.setHeight(this.height);
                } if (this.getComputedWidth() > this.width) { // Both are defined, landscape
                    this.setWidth(this.width);
                } else { // Both are defined, portrait
                    this.setHeight(this.height);
                }
            });
        }

        /**
         * @name AmoImageController#getComputedHeight
         * @description Returns the computed height for the image
         * @returns {Number}
         */
        private getComputedHeight(): number {
            return this.width / Number(this.imageWidth) * Number(this.imageHeight)
        }

        /**
         * @name AmoImageController#getComputedWidth
         * @description Returns the computed width for the image
         * @returns {Number}
         */
        private getComputedWidth(): number {
            return this.height / Number(this.imageHeight) * Number(this.imageWidth)
        }

        /**
         * @name AmoImageController#setHeight
         * @param {Number} height
         * @description Sets the image height
         */
        private setHeight(height: number) {
            this.computedHeight = height;
            this.computedWidth = this.getComputedWidth();
            this.setLeftOffset();
        }

        /**
         * @name AmoImageController#setLeftOffset
         * @param {Number} [offset]
         * @description Sets the left offset, used to center the image horizontally
         */
        private setLeftOffset(offset?: number): void {
            if (angular.isUndefined(offset)) {
                offset = (this.width - this.getComputedWidth()) / 2;
            }

            this.imageStyle.left = offset + 'px';
        }

        /**
         * @name AmoImageController#setWidth
         * @param {Number} width
         * @description Sets the image width
         */
        private setWidth(width: number) {
            this.computedHeight = this.getComputedHeight();
            this.computedWidth = width;
            this.setLeftOffset(0);
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoImageController', ImageController);
}
