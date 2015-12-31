describe('amoFlickrApiService', function() {
    var result,
        target;

    var httpSpy,
        qSpy,
        amoFlickrApiConfigurationFactorySpy,
        amoFlickrConfigurationSpy;

    var getSpy,
        httpGetSpy;

    beforeEach(module('amo.flickr.core'));

    beforeEach(module(function($provide) {
        $provide.service('$http', function() {
            httpSpy = jasmine.createSpyObj('$http', ['get']);

            httpGetSpy = jasmine.createSpyObj('$http.get', ['then']);
            httpSpy.get.and.returnValue(httpGetSpy);

            return httpSpy;
        });

        $provide.service('$q', function() {
            qSpy = jasmine.createSpyObj('$q', ['reject']);
            return qSpy;
        });

        $provide.factory('amoFlickrApiConfigurationFactory', function() {
            return {
                origin: 'ORIGIN'
            };
        });

        $provide.factory('amoFlickrConfiguration', function() {
            return {
                apiKey: 'API KEY',
                userId: 1
            };
        });

        getSpy = jasmine.createSpyObj('get', ['then']);
    }));

    beforeEach(inject(function(amoFlickrApiService) {
        target = amoFlickrApiService;
    }));

    /**
     * get
     */

    describe('When executing a GET request', function() {
        describe('without configuration', function() {
            beforeEach(function() {
                target.get('METHOD');
            });

            it('should fetch the data', function() {
                expect(httpSpy.get).toHaveBeenCalledWith(
                    'ORIGIN',
                    {
                        params: {
                            api_key: 'API KEY',
                            format: 'json',
                            method: 'flickr.METHOD',
                            nojsoncallback: 1
                        }
                    }
                );
            });

            describe('successfully', function() {
                beforeEach(function() {
                    result = httpGetSpy.then.calls.argsFor(0)[0]({
                        data: {
                            stat: 'success'
                        }
                    });
                });

                it('should return data', function() {
                    expect(result).toEqual({
                        stat: 'success'
                    });
                });
            });

            describe('unsuccessfully', function() {
                beforeEach(function() {
                    httpGetSpy.then.calls.argsFor(0)[0]({
                        data: {
                            stat: 'fail'
                        }
                    });
                });

                it('should reject returned promise', function() {
                    expect(qSpy.reject).toHaveBeenCalledWith({
                        stat: 'fail'
                    });
                });
            });
        });

        describe('with configuration', function() {
            beforeEach(function() {
                target.get('METHOD', {
                    params: {
                        key: 'VALUE'
                    }
                });
            });

            it('should fetch the data', function() {
                expect(httpSpy.get).toHaveBeenCalledWith(
                    'ORIGIN',
                    {
                        params: {
                            api_key: 'API KEY',
                            format: 'json',
                            method: 'flickr.METHOD',
                            nojsoncallback: 1,
                            key: 'VALUE'
                        }
                    }
                );
            });
        });
    });

    /**
     * fetchAlbum
     */
    
    describe('When fetching an album', function() {
        beforeEach(function() {
            spyOn(target, ['get']);
            target.get.and.returnValue(getSpy);
        });

        describe('without a user ID', function() {
            beforeEach(function() {
                target.fetchAlbum(10);

                result = getSpy.then.calls.argsFor(0)[0]({
                    photoset: 'PHOTOSET'
                });
            });

            it('should fetch album data', function() {
                expect(target.get).toHaveBeenCalledWith(
                    'photosets.getPhotos',
                    {
                        params: {
                            extras: 'url_s,url_o',
                            photoset_id: 10,
                            user_id: 1
                        }
                    }
                );
            });

            it('should return photoset', function() {
                expect(result).toEqual('PHOTOSET');
            });
        });

        describe('with a user ID', function() {
            beforeEach(function() {
                target.fetchAlbum(10, 2);
            });

            it('should fetch album data', function() {
                expect(target.get).toHaveBeenCalledWith(
                    'photosets.getPhotos',
                    {
                        params: {
                            extras: 'url_s,url_o',
                            photoset_id: 10,
                            user_id: 2
                        }
                    }
                );
            });
        });
    });

    /**
     * fetchAlbumList
     */
    
    describe('When fetching an album list', function() {
        beforeEach(function() {
            spyOn(target, ['get']);
            target.get.and.returnValue(getSpy);
        });

        describe('without a user ID', function() {
            beforeEach(function() {
                target.fetchAlbumList();

                result = getSpy.then.calls.argsFor(0)[0]({
                    photosets: {
                        photoset: 'PHOTOSET'
                    }
                });
            });

            it('should fetch album data', function() {
                expect(target.get).toHaveBeenCalledWith(
                    'photosets.getList',
                    {
                        params: {
                            per_page: 100,
                            user_id: 1
                        }
                    }
                );
            });

            it('should return album list', function() {
                expect(result).toEqual('PHOTOSET');
            });
        });

        describe('with a user ID', function() {
            beforeEach(function() {
                target.fetchAlbumList(2);
            });

            it('should fetch album data', function() {
                expect(target.get).toHaveBeenCalledWith(
                    'photosets.getList',
                    {
                        params: {
                            per_page: 100,
                            user_id: 2
                        }
                    }
                );
            });
        });
    });
});
