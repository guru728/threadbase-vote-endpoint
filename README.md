# Threadbase Vote Endpoint

A REST API built with Express, TypeScript, Prisma, and PostgreSQL.

## Vote Endpoint

`POST /posts/:id/vote`

Records a vote for a post and increments its score.

### Responses

- `201 Created` — vote recorded successfully.
- `400 Bad Request` — invalid post ID.
- `404 Not Found` — post does not exist.
- `409 Conflict` — user has already voted for the post.