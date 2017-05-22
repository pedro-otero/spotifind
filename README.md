# Spotifind

Spotifind is a Node.JS library that finds in what shows and movies a Spotify track has been featured. This is done using the [Tunefind][1] api.

## Usage

In the root of your Node project run `npm install spotifind`

```javascript
let user = /* your app user */, pass = /* your user pwd */;
const Spotifind = require('spotifind');
const spotifind = new Spotifind(user, pass);

spotifind.findFeaturings(/*track*/).then(function (results) {
    /* handle results */
});
```

## Functions

### findFeaturings(spotifyTrack)
Returns a promise that resolves to an object that contains a `movies` and a `shows` array containing the information of such featurings. The `spotifyTrack` argument must be a track exactly as returned from the [Spotify Web API][2]. Can be either simple or regular track object, since all that's required from it is the `artists` array and the `name`.

## Testing
Spotifind uses [Jasmine][6] for testing. The `test` script runs all the tests, including integration tests. For the integration tests to run succesfully you need to provide your own API keys in a `api-keys.json` file in the root of the folder of this project. This file is already ignored in `.gitignore`.

### Known issues
As of May 2017 Tunefind has not planned a release for a search endpoint and searching sequentially on the `/artist` endpoint of the API is too slow. For those reasons Spotifind relies on inferring the id of an artist from their name. This does not work in all cases. Two examples are in this project in the form of failing unit tests.

[1]: https://www.tunefind.com/api
[2]: https://developer.spotify.com/web-api/
[6]: https://jasmine.github.io/