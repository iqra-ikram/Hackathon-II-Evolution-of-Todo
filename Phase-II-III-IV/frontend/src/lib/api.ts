const API_URL = '/api/backend';

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchClient(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOptions } = options;
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

      const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });
  
    if (!response.ok) {
      // Try to parse error message
      let errorMessage = response.statusText;
      try {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
          // Not JSON, probably HTML
          console.error("Non-JSON API response:", text.substring(0, 500));
          errorMessage = `API Error (${response.status}): The server returned a non-JSON response. Check console for details.`;
        }
      } catch (e) {
        // Failed to read text
        console.error("Failed to read response text:", e);
      }
      throw new Error(errorMessage);
    }
  
    if (response.status === 204) {
      return null;
    }
  
    return response.json();
  }