---
title: A desktop in a browser tab
date: 2026-07-20
summary: Why this site boots instead of scrolls.
hidden: true
---

Most people who open this site got an email from me an hour earlier. They have
about fifteen seconds and one question: can he actually build things?

Bullet points answer that with claims. So the site is a small window manager
instead. Menu bar, dock, windows you drag and stack and maximise.

You can't fake dragging. Focus order works or it doesn't. A window keeps its
scroll position while another one animates in, or it visibly doesn't. None of
this is a screenshot.

I'm not doing a retro thing. If this were about nostalgia I'd have added
scanlines and a boot chime and stopped there. The window system is here because
it's the least deniable demo I could come up with.

It does cost more than a scroll would. Drag offsets that survive re-renders,
which means Motion owns the position and React owns nothing that can snap it
back. A second shell for phones, because a 390px-wide window manager is nobody's
idea of fun.

And restraint, which turned out to be the hard one. Everything playful is hidden
behind someone actually poking at it, and the first pass over the desktop stays
plain on purpose. Fifteen seconds is not enough time to spend on jokes.
