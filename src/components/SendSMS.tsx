import { useState } from "react";

export default function SendSMS() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send SMS message");
      }

      setStatus("Message sent successfully");
      setTo("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone number:
        <input type="tel" value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}
