# rinse-url

This is a javascript library to remove unnecessary parameters, such as user-tracking codes, from a URL.
In other words, for a given URL, it returns the shortest URL that has the same content.

## How to use

```javascript
import { rinseUrl, RinseOptions } from 'rinse-url';

const url = 'https://youtu.be/ElDPCKO1EhE?si=LrGi9WKADPEoF5nz';

// optional
const options: RinseOptions = {
  testInterval: 1000, // interval to check if the content is the same
  similarityThreshold: 0.9, // cosine similarity threshold
};

const rinsedUrl = await rinseUrl(url, options);
console.log(rinsedUrl); // https://youtu.be/ElDPCKO1EhE
```

## Algorithm

`rinse-url` finds URL parameters that doesn't affect the content of the page and removes them.
It removes parameters one by one and checks if the content of the page changes.

It considers the two pages are the same if the following conditions are met:

- meta tags (title, description, keywords) are the same
- canonical URL is the same
- check if the main content of the two pages are similar enough (cosine similarity)

`rinse-url` uses `Readability.js` to extract the main content of the page.

## How to publish

From the [documentation](https://nx.dev/recipes/nx-release/publish-in-ci-cd):

1. Run `nx release --skip-publish` locally. This will create a commit with the version and changelog updates, then create a tag for the new version.
2. Push the changes (including the new tag) to the remote repository with `git push && git push --tags`.
3. The CI workflow will automatically trigger and publish the packages to the npm registry.
