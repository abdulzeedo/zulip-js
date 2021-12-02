import helper from './helper';

interface ErrorType extends Error{
  res?: Response
}

async function api<T>(baseUrl: string, config: Config, method: ApiMethods, params: T) {
  const url = new URL(baseUrl);
  const auth = Buffer.from(`${config.username}:${config.apiKey}`).toString(
    'base64'
  );
  const authHeader = `Basic ${auth}`;
  const options = { method, headers: { Authorization: authHeader }, body: null };
  if (method === 'POST') {
    options.body = new helper.FormData();
    Object.keys(params).forEach((key) => {
      let data = params[key];
      if (Array.isArray(data)) {
        data = JSON.stringify(data);
      }
      options.body.append(key, data);
    });
  } else if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const response = await helper.fetch(url.href, options);
  try {
    return response.json();
  } catch (e) {
    if (e instanceof SyntaxError) {
      // We probably got a non-JSON response from the server.
      // We should inform the user of the same.
      let message = 'Server Returned a non-JSON response.';
      if (response.status === 404) {
        message += ` Maybe endpoint: ${method} ${response.url.replace(
          config.apiURL,
          ''
        )} doesn't exist.`;
      } else {
        message += ' Please check the API documentation.';
      }
      const error: ErrorType = new Error(message);
      error.res = response;
      throw error;
    }
    throw e;
  }
}

export default api;
