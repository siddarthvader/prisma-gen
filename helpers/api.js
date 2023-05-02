export function postRequest(URL, headers, body) {
  return fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
