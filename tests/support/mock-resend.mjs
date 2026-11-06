/*
 * Lažni Resend za testove. Naslov mejla bira ponašanje:
 * „ODBIJ” vraća grešku, „SPORO” ne odgovara 30 sekundi.
 * GET vraća sve primljene mejlove.
 */
import { createServer } from "node:http";

const mails = [];

createServer((req, res) => {
  const json = (status, body) => {
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify(body));
  };
  if (req.method === "GET") return json(200, mails);

  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    const mail = JSON.parse(raw || "{}");
    const subject = String(mail.subject);
    if (subject.includes("ODBIJ")) {
      return json(422, { name: "validation_error", message: "lažno odbijanje", statusCode: 422 });
    }
    if (subject.includes("SPORO")) return setTimeout(() => json(200, { id: "sporo" }), 30_000);
    mails.push(mail);
    json(200, { id: "lazni-id" });
  });
}).listen(9555, "127.0.0.1");
