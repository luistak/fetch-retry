let LIMIT = 1;

var sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

var fetchRetry = async (url, { limit = LIMIT, delay, ...opts } = {}) => {
  try {
    const response = await fetch(url, opts);
    const { status, statusText } = response;

    if (status >= 200 && status < 300) {
      return response;
    }

    throw new Error(statusText)
  } catch (error) {
    const shouldRetry = limit > 0;

    if (!shouldRetry) throw error;

    if (delay) await sleep(delay);

    return await fetchRetry(url, { limit: limit - 1, delay, ...opts });
  }
}

export default fetchRetry;
