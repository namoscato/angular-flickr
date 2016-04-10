describe('amoFlickrAlbumList', function() {
    var result,
        target;

    var amoFlickrApiServiceSpy;

    var amoFlickrApiServiceFetchAlbumListSpy;

    beforeEach(module('amo.flickr.albumList'));

    beforeEach(inject(function($componentController, $rootScope) {
        amoFlickrApiServiceSpy = jasmine.createSpyObj('amoFlickrApiService', ['fetchAlbumList']);

        amoFlickrApiServiceFetchAlbumListSpy = jasmine.createSpyObj('amoFlickrApiService.fetchAlbumList', ['then']);
        amoFlickrApiServiceSpy.fetchAlbumList.and.returnValue(amoFlickrApiServiceFetchAlbumListSpy);

        target = $componentController(
            'amoFlickrAlbumList',
            {
                $scope: $rootScope.$new(),
                amoFlickrApiService: amoFlickrApiServiceSpy
            },
            {
                userId: 1
            }
        );
    }));

    describe('When loading an album list', function() {
        beforeEach(function() {
            target.$onInit();
        });

        it('should fetch the album list', function() {
            expect(amoFlickrApiServiceSpy.fetchAlbumList).toHaveBeenCalled();
        });

        describe('with one or more albums', function() {
            beforeEach(function() {
                amoFlickrApiServiceFetchAlbumListSpy.then.calls.argsFor(0)[0]([
                    { id: 1 },
                    { id: 2 },
                ]);
            });

            it('should expose albums', function() {
                expect(target.albums).toEqual([
                    { id: 1 },
                    { id: 2 },
                ]);
            });

            it('should set first album as active', function() {
                expect(target.currentAlbumId).toEqual(1);
            });
        });

        describe('with no albums', function() {
            beforeEach(function() {
                amoFlickrApiServiceFetchAlbumListSpy.then.calls.argsFor(0)[0]([]);
            });

            it('should expose albums', function() {
                expect(target.albums).toEqual([]);
            });
        });
    });

    /**
     * isAlbumActive
     */
    
    describe('When determining the status of an', function() {
        beforeEach(function() {
            target.currentAlbumId = 1;
        });

        describe('active album', function() {
            beforeEach(function() {
                result = target.isAlbumActive({ id: 1 });
            });

            it('should return true', function() {
                expect(result).toEqual(true);
            });
        });

        describe('inactive album', function() {
            beforeEach(function() {
                result = target.isAlbumActive({ id: 2 });
            });

            it('should return false', function() {
                expect(result).toEqual(false);
            });
        });
    });
});
