describe('AmoFlickrPhotoController', function() {
    var target;

    var scopeSpy;

    beforeEach(module('amo.flickr.core'));

    beforeEach(inject(function($controller) {
        scopeSpy = jasmine.createSpyObj('$scope', ['$watchGroup']);

        target = $controller('AmoFlickrPhotoController', {
            $scope: scopeSpy
        });

        target.photo = {
            height_s: 10,
            width_s: 20,
            url_s: 'S URL',
            url_t: 'T URL',
        };
        target.size = 's';
    }));

    describe('When initializing a Flickr photo', function() {
        it('should watch for photo, width and height changes', function() {
            expect(scopeSpy.$watchGroup).toHaveBeenCalledWith(
                [
                    'flickrPhoto.photo',
                    'flickrPhoto.width',
                    'flickrPhoto.height'
                ],
                jasmine.any(Function)
            );
        });

        describe('and the photo is undefined', function() {
            beforeEach(function() {
                scopeSpy.$watchGroup.calls.argsFor(0)[1]([]);
            });

            it('should not do anything', function() {
                expect(target.imageSource).toEqual(undefined);
            });
        });

        describe('and the photo is null', function() {
            beforeEach(function() {
                scopeSpy.$watchGroup.calls.argsFor(0)[1]([null]);
            });

            it('should not do anything', function() {
                expect(target.imageSource).toEqual(undefined);
            });
        });

        describe('without a thumbnail', function() {
            beforeEach(function() {
                scopeSpy.$watchGroup.calls.argsFor(0)[1]([{}]);
            });

            it('should set image height', function() {
                expect(target.imageHeight).toEqual(10);
            });

            it('should set image source', function() {
                expect(target.imageSource).toEqual('S URL');
            });

            it('should set image width', function() {
                expect(target.imageWidth).toEqual(20);
            });

            it('should not set thumbnail source', function() {
                expect(target.thumbnailSource).toEqual(undefined);
            });
        });

        describe('with a thumbnail', function() {
            beforeEach(function() {
                target.thumbnailSize = 't';

                scopeSpy.$watchGroup.calls.argsFor(0)[1]([{}]);
            });

            it('should set thumbnail source', function() {
                expect(target.thumbnailSource).toEqual('T URL');
            });
        });
    });
});
