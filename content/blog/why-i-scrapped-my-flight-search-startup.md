---
title: "Why I Scrapped My Flight Search Startup: The API Gatekeeping Problem in 2026"
description: "I built an AI flight search agent for Southeast Asia, then scrapped it. Every viable flight API in 2026 gates access behind scale I didn't have yet."
date: 2026-07-29
author: Azri Fadli
canonical: https://azri.dev/blog/why-i-scrapped-my-flight-search-startup
tags:
  - startups
  - travel-tech
  - api
  - ai
  - southeast-asia
keywords:
  - flight API 2026
  - startup gatekeeping
  - Skyscanner API
  - Kiwi API
  - Duffel API
  - flight search startup
  - travel tech bootstrap
  - API access barrier
  - Singapore SaaS
  - Southeast Asia startup challenges
---

I spent a good stretch of this year building FlyMeHere, an AI flight search agent for Southeast Asia. The concept was clean, the technical bet was one I actually believed in, and the natural-language layer worked well enough that demoing it to people got the reaction you want. Then I scrapped it — not because the product was wrong, and not because I ran out of energy. I scrapped it because I could not buy, apply, or bootstrap my way into a single flight pricing API that would sell to someone at my size.

That's a strange sentence to write about a software project in 2026. We're used to a world where the infrastructure is a credit card away: models, payments, maps, email, storage. Flight data is one of the last categories where that isn't true, and the gate isn't priced in dollars — it's priced in traffic you're expected to already have. This is a post-mortem about hitting an **API access barrier** that no amount of engineering could route around, and about the more useful skill I got out of it: telling a structural problem apart from an execution problem before you've burned six months on it.

## The idea

FlyMeHere was meant to be a flight search agent for the routes I actually fly: Singapore, Bangkok, Kuala Lumpur, and the messy web of regional connections around them. Instead of a rigid form with date pickers and dropdowns, you'd describe the trip the way you'd say it out loud — "Bali next month with my family, keep it cheap" — and the agent would resolve what you meant: destination, rough dates, how flexible you are, who's travelling, what you'd tolerate spending. When something was ambiguous it would make a sensible assumption rather than interrogating you.

Two things made it feel differentiated rather than like another metasearch clone. First, proactive price alerts: not "here are today's fares," but an agent that keeps watching a route you described in plain language and tells you when the shape of the market changes. Second, the niche. The big engines cover Southeast Asia poorly — ultra-low-cost regional carriers get thin coverage or none, and those are frequently the cheapest option on exactly the routes I cared about. A narrow geography plus natural language plus a watching agent felt like a real product, not a feature. I still think it was.

## The discovery

The technical work went fine. The natural-language layer went in early on Claude and the Vercel AI SDK, and pulling structured intent out of a sloppy sentence turned out to be the easy part. What I'd deferred — the way you defer the thing you assume is a procurement detail — was the actual source of fare data. So I went to sign up for a **flight API in 2026**, expecting to compare pricing tiers. Instead I spent two weeks discovering that nobody in the category sells to a solo founder with no traffic.

I started with Skyscanner, because it's the obvious first stop for a metasearch-shaped product. Their affiliate and API program has eligibility criteria that read less like a rate card and more like an audition: a real audience with 500+ followers, a content history under a year old, and a minimum of around 100K monthly active users on whatever surface you're integrating into. That last number is the one that matters. The **Skyscanner API** isn't expensive for a startup — it's structurally unavailable to one. You have to arrive already having won.

Kiwi was next, and this is the one that stung, because Kiwi's API used to be the answer to this exact problem. For years it was the scrappy, accessible option — the thing you'd point a new builder at. That changed. The current partner requirements put the bar at roughly 50K+ monthly active users, which is a smaller wall than Skyscanner's but the same wall. Then Duffel, which is genuinely the most modern developer experience in the category and the one I most wanted to use. Duffel requires KYC and business registration to get past sandbox into live fares — reasonable, given they're touching real ticketing — except that Singapore wasn't on their supported list. I'm in Singapore. That's not a wall I can climb with better traction; it's a wall I can't climb with any traction at all.

That left Amadeus, which had the one genuinely open door in the industry: the Self-Service tier, where you could get a key and start querying test data the same afternoon. It was decommissioned on 17 July 2026 — weeks before I got there. What's left is the enterprise track. Four providers, one shape: Skyscanner wants your audience, Kiwi wants your audience, Duffel wants your jurisdiction, Amadeus wants your enterprise. Not one of them has a door marked "solo founder with a working prototype and no traffic yet."

The state of flight data access as I found it, in one place:

- **Skyscanner** — around 100K+ monthly active users, 500+ followers, content history under a year old. Startups without an existing audience are effectively excluded.
- **Kiwi** — the formerly free tier is gone; the partner programme now expects roughly 50K+ monthly active users.
- **Duffel** — KYC and business registration required to reach live fares, and Singapore is not a supported jurisdiction.
- **Amadeus** — the Self-Service tier was decommissioned on 17 July 2026, leaving the enterprise track only.

Policies move — Amadeus's did, right under me — so check current terms yourself rather than trusting a snapshot from July 2026. The pattern is what generalises, not the specific numbers.

## The pivot attempts

My first instinct was that this was a distribution problem, so I tried to solve distribution. If the gate is monthly active users, go get monthly active users somewhere cheap: a Telegram bot. It's a legitimately good channel in this region, the install friction is near zero, and price alerts are a perfect fit for a chat surface — an agent that pings you is more natural in Telegram than in an inbox. I built toward it for a while before the obvious caught up with me. A Telegram bot is a *surface*. It still has to say something true about flight prices, which means it still needs a flight data source, which is the thing I didn't have. I'd designed an elegant front door for a building with no plumbing.

Then I went looking for the back door, which in practice means scraper-backed APIs. Sky Scrapper's free tier is the usual entry point, and it gives you 100 requests per month. That number isn't a pricing tier, it's a demo. A single user running a single flexible-date search across a handful of regional carriers can burn through it in one session — proactive alerts, where the whole premise is polling a route repeatedly over days, are arithmetically impossible on that budget. Paid scraper tiers exist, but you're then building a business whose core dependency is an unsanctioned pipe into someone else's data, with the reliability and legal profile that implies. That's not a foundation for a **flight search startup** you intend to still own in three years.

Somewhere in there the actual diagnosis landed, and it reframed everything.

> The problem was never distribution, and it was never the technology. The problem was that the data itself was gatekept.

I'd been treating data access as an input I could procure, and iterating hard on everything else, when data access was the binding constraint the entire time. Every pivot I'd considered was a pivot on the wrong axis.

## The economics

Suppose I'd solved it anyway — talked my way into a partnership, or launched somewhere I could register a supported entity. The unit economics still don't rescue you. Flight affiliate margins sit somewhere in the 0.5–2% range per booking, and that's the whole revenue line for a metasearch product. On a S$300 regional fare that's a few dollars, before you account for cancellations, attribution windows, and the bookings that leak to a direct airline site. **Travel tech bootstrap** economics are volume economics: you don't win on margin, because there isn't any. You win by being enormous.

The comparison that made it concrete was AirTrackBot — a flight price alert bot, more or less the product I was describing, doing it well. Roughly 1.6 million users, north of 600,000 searches a month. It took them seven-plus years to build that. Seven years of compounding into a business whose margin structure only starts working at the far end of it. I don't say that with any bitterness; it's a genuinely impressive thing to have built and it's exactly the right answer to the question "how much scale does this model need?" It's just not a number a bootstrapped solo founder reaches from a standing start, funding it out of the same pocket that pays rent. The API gate demands scale, and the margins mean scale is the only thing that pays. Those two facts are the same fact.

## The lesson

The generalisable version isn't "flight APIs are hard." It's that some markets are only accessible to people who already have something — an audience, an enterprise relationship, a corporate entity in the right country, a decade of compounding. **Startup gatekeeping** of this kind is usually invisible from the outside, because it lives in eligibility criteria and partner pages rather than in the product surface, and because the incumbents who cleared the gate did so under rules that no longer exist. Kiwi was free once. Amadeus had a self-service tier until three weeks before I needed it. The ladder gets pulled up, and from below the wall still looks climbable.

Geography turned out to matter more than I'd priced in, too. Being in Singapore is a genuine advantage for most **Singapore SaaS** work — stable, well-regarded, easy to bank. In this category it was a hard blocker, because the modern APIs that are otherwise most founder-friendly, Duffel and Amadeus included, simply didn't support the jurisdiction I operate from. That's a specific instance of a broader thing worth naming for anyone building here: **Southeast Asia startup challenges** often aren't about the market or the talent, they're about which country dropdown you appear in on someone else's onboarding form. It's worth checking that dropdown in week one rather than month four.

Which is really the whole lesson. I lost time, but not that much time, because the wall announced itself once I actually went looking. Execution problems get better when you push on them — you ship, you learn, the numbers move. Structural problems don't. Pushing harder on a structural problem produces the same result more expensively, and the failure mode isn't quitting too early, it's spending six months proving that a wall is still a wall. The skill is telling them apart, and the test is simple: if the thing blocking me got twice as much effort, would it move at all? For a 100K MAU eligibility floor, the honest answer is no.

## If you're reading this

You'll get the most out of it if you're building an AI agent that depends on someone else's data, if you're anywhere near travel or flight search, or if you're building from ASEAN and keep discovering that the tooling everyone recommends doesn't ship to your country. Go validate data access before you write a line of product code — not the docs, the actual eligibility criteria and the actual supported-country list, with your real entity. The meta-lesson is one I'd rather have learned in weeks than years: an idea can be technically sound, genuinely differentiated, and still be structurally impossible in your market at your scale. That's not a verdict on the idea or on you. It's information — and the sooner you have it, the more of your runway is still yours to spend on something that can actually move.
