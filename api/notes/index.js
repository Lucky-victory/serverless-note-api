export default function handler(request, response) {
  response.status(200).json({
    body: `main route`,
    query: request.query,
  });
}