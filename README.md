# 🤖 Weekly Hackathon: Week Two

This is the official instructions repository for Week Two of $hackathon. 

Your mission is to build an AI agent (or a group of them) that can (collectively) judge and select the 8 best $hackathon projects, out of the N that will be submitted for a given week.

## 💎 Prize

A big chunk of the fees of the trading of $hackathon on the open market during this week (ending on thursday, 23 jan at 23:59 UTC [uniswap link](https://app.uniswap.org/swap?chain=base&outputCurrency=0x3dF58A5737130FdC180D360dDd3EFBa34e5801cb).

## 🎯 Challenge Overview

Create a system of one or more AI agents that work together to evaluate and select the top 8 finalists from the weekly hackathon submissions. These agents should coordinate and communicate with each other to make informed decisions about project quality and potential.

The (Each) agent should have clear missions:

The winning algorithm will be used to choose the 8 finalists of week two. 

for $hackathon holders to vote during the official voting period (which lasts 24 hours)

## 📋 Requirements

- No groups or teams. This is an individual challenge. 
- Agent(s must coordinate to) select 8 finalists
- MVP (Minimum Viable Product) approach - focus on core functionality
- Must be a fork of this repository
- Must use an open source license allowing reuse and modification for any purpose

## 🔍 Agent Guidelines

Your AI agent cluster should:
- Have a clear decision-making process, based on the personality of each member and the relationship between their particular opinions of each hacker that submitted a project
- Demonstrate effective inter-agent communication
- Use defined and concrete criteria for project evaluation
- Reach consensus on finalist selection
- Document their methodology and reasoning so that we can follow the breadcrumbs into their thoughts

## 📝 Submission Guidelines and Process

1. Fork this repository (don't just clone it)
2. Clone your forked repository and hack. use ai. be midful of your resources. stay present. and do the work
3. Build your AI agent cluster. Deploy it
4. The system should receive as inputs the submissions of each user. this is an example project submission:

```
  {
    address: "0xAdA8e0625D9c7EcCd1C5a9a7aC9fDD9756DBeC33",
    network: "base",
    project_url: "https://farcaster-frames-v2-demo.vercel.app",
    github_url: "https://github.com/jvaleskadevs/farcaster-frames-v2-demo",
    demo_url: "https://www.youtube.com/shorts/n6TVlqgExRo",
  },
```
  
the submission_place is the order at which people submitted their projects. if a user already submitted, they can choose to re-submit and push more updated code

8. Submit your project before the deadline. The github repo, the 88 second video presenting it, the production ready link -make it a nice domain, please- and your fid. submit all of those things here: [https://forms.gle/C2KgGfGFB3tZKoCv9](https://forms.gle/C2KgGfGFB3tZKoCv9)
9. Ensure all code and documentation (README.md) is complete

## 🏆 Judging Process

The submitted AI agent clusters will be evaluated based on:
- Effectiveness of coordination between agents
- Clarity of decision-making process
- Code quality and documentation
- Scalability and robustness
- Innovation in approach

## ⏰ Timeline

- Submission Deadline: January 23, 2024, 23:59 UTC
- Voting Period Starts: January 23, 2024, 23:59 UTC (lasts for 24 hours. starting of voting process could be delayed based on progress on weeklyhackathon's codebase)

## ❓ Questions?

- DM [@jpfraneto](https://x.com/jpfraneto) on X
- Check the [official challenge page](https://weeklyhackathon.com/week-two)

## 📜 License

Must use an open source license allowing reuse and modification for any purpose.

---

Good luck! 🤖
