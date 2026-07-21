const fallbackToAppShell = (request) => {
  const url = new URL(request.url);
  url.pathname = '/index.html';
  url.search = '';
  return new Request(url, request);
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get('accept')?.includes('text/html');

    if (response.status === 404 && request.method === 'GET' && acceptsHtml) {
      return env.ASSETS.fetch(fallbackToAppShell(request));
    }

    return response;
  }
};
