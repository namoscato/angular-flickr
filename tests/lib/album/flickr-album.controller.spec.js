describe('AmoFlickrAlbumController', function() {
    var result,
        target;

    var scopeSpy,
        amoFlickrApiServiceSpy;

    var amoFlickrApiServiceFetchAlbumSpy;

    beforeEach(module('amo.flickr.album'));

    beforeEach(inject(function($controller) {
        scopeSpy = jasmine.createSpyObj('$scope', [
            '$apply',
            '$on',
            '$watch',
        ]);

        amoFlickrApiServiceSpy = jasmine.createSpyObj('amoFlickrApiService', ['fetchAlbum']);

        amoFlickrApiServiceFetchAlbumSpy = jasmine.createSpyObj('amoFlickrApiService.fetchAlbum', ['then']);
        amoFlickrApiServiceSpy.fetchAlbum.and.returnValue(amoFlickrApiServiceFetchAlbumSpy);

        target = $controller('AmoFlickrAlbumController', {
            $element: [
                {
                    offsetWidth: 400,
                    offsetHeight: 200
                }
            ],
            $scope: scopeSpy,
            amoFlickrApiService: amoFlickrApiServiceSpy,
            amoFlickrConfiguration: {
                thumbnailSize: 100
            }
        });

        target.userId = 1;
    }));

    describe('When loading a Flickr album', function() {
        it('should set photo height', function() {
            expect(target.photoHeight).toEqual(98);
        });

        it('should set photo width', function() {
            expect(target.photoWidth).toEqual(400);
        });

        it('should expose thumbnail size', function() {
            expect(target.thumbnailSize).toEqual(100);
        });

        it('should listen for window resize events', function() {
            expect(scopeSpy.$on).toHaveBeenCalledWith(
                'amo.flickr.windowResize',
                jasmine.any(Function)
            );
        });

        it('should listen for next navigation events', function() {
            expect(scopeSpy.$on).toHaveBeenCalledWith(
                'amo.flickr.navigateNext',
                jasmine.any(Function)
            );
        });

        it('should listen for previous navigation events', function() {
            expect(scopeSpy.$on).toHaveBeenCalledWith(
                'amo.flickr.navigatePrevious',
                jasmine.any(Function)
            );
        });

        it('should watch for album ID changes', function() {
            expect(scopeSpy.$watch).toHaveBeenCalledWith(
                'flickrAlbum.albumId',
                jasmine.any(Function)
            );
        });
    });

    describe('When resizing the window', function() {
        beforeEach(function() {
            spyOn(target, 'setPhotoSize');

            scopeSpy.$on.calls.argsFor(getScopeOnCallIndex('amo.flickr.windowResize'))[1]();

            scopeSpy.$apply.calls.argsFor(0)[0]();
        });

        it('should set photo size', function() {
            expect(target.setPhotoSize).toHaveBeenCalled();
        });
    });

    describe('When navigating to the next picture via the keyboard', function() {
        beforeEach(function() {
            spyOn(target, 'navigateNextPhoto');

            scopeSpy.$on.calls.argsFor(getScopeOnCallIndex('amo.flickr.navigateNext'))[1]();

            scopeSpy.$apply.calls.argsFor(0)[0]();
        });

        it('should navigate to the next photo', function() {
            expect(target.navigateNextPhoto).toHaveBeenCalled();
        });
    });

    describe('When navigating to the next picture via the keyboard', function() {
        beforeEach(function() {
            spyOn(target, 'navigatePreviousPhoto');

            scopeSpy.$on.calls.argsFor(getScopeOnCallIndex('amo.flickr.navigatePrevious'))[1]();

            scopeSpy.$apply.calls.argsFor(0)[0]();
        });

        it('should navigate to the previous photo', function() {
            expect(target.navigatePreviousPhoto).toHaveBeenCalled();
        });
    });

    describe('When the Flickr album is', function() {
        describe('undefined', function() {
            beforeEach(function() {
                scopeSpy.$watch.calls.argsFor(0)[1]();
            });

            it('should do nothing', function() {
                expect(amoFlickrApiServiceSpy.fetchAlbum).not.toHaveBeenCalled();
            });
        });

        describe('defined', function() {
            beforeEach(function() {
                scopeSpy.$watch.calls.argsFor(0)[1](10);
            });

            it('should fetch album', function() {
                expect(amoFlickrApiServiceSpy.fetchAlbum).toHaveBeenCalledWith(10, 1);
            });

            describe('and the album has photos', function() {
                beforeEach(function() {
                    amoFlickrApiServiceFetchAlbumSpy.then.calls.argsFor(0)[0]({
                        photo: [
                            {}
                        ]
                    });
                });

                it('should load first photo', function() {
                    expect(target.currentPhotoIndex).toEqual(0);
                });

                it('should expose album', function() {
                    expect(target.album).toEqual({
                        photo: [
                            {}
                        ]
                    })
                });
            });

            describe('and the album has no photos', function() {
                beforeEach(function() {
                    amoFlickrApiServiceFetchAlbumSpy.then.calls.argsFor(0)[0]({
                        photo: []
                    });
                });

                it('should initialize current photo index', function() {
                    expect(target.currentPhotoIndex).toEqual(-1);
                });
            });
        });
    });

    /**
     * getCurrentPhoto
     */
    
    describe('When getting the current photo', function() {
        describe('and the album is undefined', function() {
            beforeEach(function() {
                result = target.getCurrentPhoto();
            });

            it('should return null', function() {
                expect(result).toEqual(null);
            });
        });

        describe('and the album is defined', function() {
            beforeEach(function() {
                target.currentPhotoIndex = 1;
                target.album = {
                    photo: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                    ]
                };

                result = target.getCurrentPhoto();
            });

            it('should return current photo', function() {
                expect(result).toEqual({ id: 2 });
            });
        });
    });

    /**
     * isPhotoActive
     */
    
    describe('When determining if the photo is active', function() {
        describe('and the current photo is undefined', function() {
            beforeEach(function() {
                result = target.isPhotoActive({ id: 1 });
            });

            it('should return false', function() {
                expect(result).toEqual(false);
            });
        });

        describe('and the photo', function() {
            beforeEach(function() {
                target.album = {
                    photo: [
                        { id: 10 },
                        { id: 20 },
                        { id: 30 },
                    ]
                };

                target.currentPhotoIndex = 1;
            });

            describe('is inactive', function() {
                beforeEach(function() {
                    result = target.isPhotoActive({ id: 10 });
                });

                it('should return false', function() {
                    expect(result).toEqual(false);
                });
            });

            describe('is active', function() {
                beforeEach(function() {
                    result = target.isPhotoActive({ id: 20 });
                });

                it('should return true', function() {
                    expect(result).toEqual(true);
                });
            });
        });
    });

    /**
     * navigateNextPhoto
     */
    
    describe('When navigating to the next photo', function() {
        beforeEach(function() {
            target.album = {
                photo: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                ]
            };
        });

        describe('and we are not at the end of the album', function() {
            beforeEach(function() {
                target.currentPhotoIndex = 1;

                target.navigateNextPhoto();
            });

            it('should advance active photo', function() {
                expect(target.currentPhotoIndex).toEqual(2);
            });
        });

        describe('and we are at the end of the album', function() {
            beforeEach(function() {
                target.currentPhotoIndex = 2;

                target.navigateNextPhoto();
            });

            it('should not advance the active photo', function() {
                expect(target.currentPhotoIndex).toEqual(2);
            });
        });
    });

    /**
     * navigatePreviousPhoto
     */
    
    describe('When navigating to the previous photo', function() {
        describe('and we are not at the beginning of the album', function() {
            beforeEach(function() {
                target.currentPhotoIndex = 1;

                target.navigatePreviousPhoto();
            });

            it('should decrement active photo', function() {
                expect(target.currentPhotoIndex).toEqual(0);
            });
        });

        describe('and we are at the beginning of the album', function() {
            beforeEach(function() {
                target.currentPhotoIndex = 0;

                target.navigatePreviousPhoto();
            });

            it('should not decrement the active photo', function() {
                expect(target.currentPhotoIndex).toEqual(0);
            });
        });
    });

    /**
     * @param {String} eventName
     * @returns {Number} Call index
     */
    function getScopeOnCallIndex(eventName) {
        var args = scopeSpy.$on.calls.allArgs(),
            i;

        for (i = 0; i < args.length; i++) {
            if (args[i][0] === eventName) {
                return i;
            }
        }

        return -1;
    }
});
