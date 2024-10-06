# rinse-url

This is a javascript library to remove unnecessary parameters, such as user-tracking codes, from a URL.
In other words, for a given URL, it returns the shortest URL that has the same content.

## Algorithm

`rinse-url` finds URL parameters that doesn't affect the content of the page and removes them.
It removes parameters one by one and checks if the content of the page changes.

It considers the two pages are the same if the following conditions are met:
- meta tags (title, description, keywords) are the same
- canonical URL is the same
- check if the main content of the two pages are similar enough (cosine similarity)

`rinse-url` uses `Readability.js` to extract the main content of the page.