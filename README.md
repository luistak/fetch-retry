# fetch-retry
This library is a wrapper over the fetch function adding a retry and delay functionality

## Usages

### Common usage
```js
import fetchRetry from 'fetch-retry';

// Mocked urls:
let url500 = 'https://www.mocky.io/v2/5e593e992f0000d09896258c';
let url506 = 'https://www.mocky.io/v2/5e597a792f0000f21c9626e0';
let url401 = 'https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3';
let url200 = 'https://www.mocky.io/v2/5e597c002f0000f21c9626e6';

fetchRetry(url200)
  .then(response => response.json())
  .then(data => console.log({ data }))
// > { data: { luis: 'takahashi' }
```

### Limit
```js
import fetchRetry from 'fetch-retry';

fetchRetry(url401, { limit: 3 });
// > ERROR: GET https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3 net::ERR_ABORTED 401 (Unauthorized)
// > ERROR: GET https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3 net::ERR_ABORTED 401 (Unauthorized)
// > ERROR: GET https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3 net::ERR_ABORTED 401 (Unauthorized)
```

### Delay
```js
import fetchRetry from 'fetch-retry';

fetchRetry(url401, { limit: 3, delay: 3000 });
// Wait 3000 miliseconds
// > ERROR: GET https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3 net::ERR_ABORTED 401 (Unauthorized)
// Wait 3000 miliseconds
// > ERROR: GET https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3 net::ERR_ABORTED 401 (Unauthorized)
// Wait 3000 miliseconds
// > ERROR: GET https://www.mocky.io/v2/5e597b2e2f0000d97b9626e3 net::ERR_ABORTED 401 (Unauthorized)
```