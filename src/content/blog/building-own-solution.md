---
title: Creating a simple solution for my problem
date: 2026-07-30
summary: I was tired of paying for a solution that was only partially working, so I built one for myself.
---

I have been using [YNAB](https://www.ynab.com/) for over two years and have always enjoyed how making your budget helps to plan what you are spending throughout the month / year. The tool is great and I warmly recommend, but unfortunately YNAB does not have direct integration with my Finnish bank, which makes things difficult.

Without direct bank integration, I need to manually add my transaction in the platform. I did that for a while, but realized it was always taking too much of my time. Next I started downloading a CSV of my transactions from my bank to import to YNAB, but the formatting was wrong and YNAB was not able to import that directly. I even built [one tool](https://csv2ynab.vercel.app/) just to convert any bank CSV into the YNAB formatting, which made it simpler for me. This was useful, and I have used it for a while.

Lately though I noticed that I only use YNAB to look at my transactions, categories and charts. I don't really focus on the budget, so I am paying a yearly fee just to look a charts of my transactions. So I decided that this should be simple enough and I can build it. Presenting then my newest project [Money Tracker](https://money.jfcorsini.com/) - name to be changed I guess? The first feature is to handle the full export from YNAB, hence keeping all my historical data that took me years to create.

Similar to many many apps that exist, but I built this integrating LLMS to help me use less time creating entries and more time understanding it. Features such as:

- automatically categorize transactions with LLM when importing;
- summarize months to understand patterns;
- one chat interface to ask questions about all data;
- and more to come once I feel that something is needed.

So far the project is open to try it out, but I have all LLM features hidden behind a feature flag because I don't want to spend extra tokens from my account. Next thing would be to setup a simple subscription and some limits on the LLM to avoid giving me too high cost.

To build this I also created a whole auth platform that will let me quickly build new projects while having proper authentication flows. But that is for a next blog post.

If you need more features or you are interested in the topic, do let me know!
