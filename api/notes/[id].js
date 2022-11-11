export default function handler(request, response) {
  response.status(200).json({
    body: `you requested for ${request.query.id}`,
    query: request.query,
  });
}
