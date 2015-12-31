describe('amoFlickrConfiguration', function() {
    var result,
        target;

    beforeEach(module('amo.flickr.core', function(amoFlickrConfigurationProvider) {
        amoFlickrConfigurationProvider
            .setApiKey('API KEY')
            .setThumbnailSize(100)
            .setUserId(1);
    }));

    beforeEach(inject(function(amoFlickrConfiguration) {
        target = amoFlickrConfiguration;
    }));

    describe('When bootstrapping the app', function() {
        it('should set the API key', function() {
            expect(target.apiKey).toEqual('API KEY');
        });

        it('should set the thumbnail size', function() {
            expect(target.thumbnailSize).toEqual(100);
        });

        it('should set the user ID', function() {
            expect(target.userId).toEqual(1);
        });
    });
});
