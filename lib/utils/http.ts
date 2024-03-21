export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch or parse data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
