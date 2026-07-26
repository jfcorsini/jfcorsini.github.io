---
title: The lock screen is not the lock
date: 2026-07-26
summary: Friends wanted my recipe tool. Every generation spends my money.
hidden: true
---

I built something that turns a photo of a handwritten recipe into a readable
one. People I know want to use it. Every generation spends my Anthropic credit,
so it needed a door.

Here is the door I almost shipped:

```tsx
if (password === import.meta.env.VITE_APP_PASSWORD) setUnlocked(true);
```

`VITE_` and `NEXT_PUBLIC_` ship to the browser. The password is in the bundle,
and usually so is the key it was supposed to protect.

So now the lock screen is decoration. The real check is one line at the top of
every route that costs me anything, before I even parse the body:

```ts
const auth = await authorize(request);
if ("error" in auth) return auth.error;
```

The API key never leaves the server. The browser only ever holds a code, and I
can kill one code without touching the rest.

The part I got wrong: codes are six characters, because people type them on
phones. My first version validated them properly and let you guess forever.
Now it is eight failures per IP and a fifteen-minute lockout, counted in the
database — serverless instances get recycled, and an in-memory counter goes with
them.

Codes still get forwarded. Nothing stops that. Fine while I know everyone I
handed one to. Less fine the day I want to sell them.
