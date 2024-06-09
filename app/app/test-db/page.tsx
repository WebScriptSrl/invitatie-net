"use client";

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [inviteResult, setInviteResult] = useState<any>(null);

  async function submitUser() {
    const user = {
      firstName: "Calin 2",
      lastName: "Balls2",
      username: "mr-balls3",
    };

    const res = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setResult(data);
    setUserId(data.id);
  }

  console.log(result);

  async function submitInvite() {
    const invite = {
      userId: userId,
    };

    const res = await fetch("/api/test/invite", {
      method: "POST",
      body: JSON.stringify(invite),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setInviteResult(data);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Test DB Page</h1>
      <button onClick={submitUser}>Submit Data</button>

      {result && (
        <div>
          <h2>User</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <button onClick={submitInvite}>Submit Invite</button>

      {inviteResult && (
        <div>
          <h2>Invite</h2>
          <pre>{JSON.stringify(inviteResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
