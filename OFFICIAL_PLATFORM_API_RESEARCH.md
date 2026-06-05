# Official Platform API Research

Research date: 2026-06-04

Latest recheck in this workspace: 2026-06-04 19:50 local time.

## Event Endpoint

URL checked:

```text
https://evol.epicconnector.ai/api/events?slug=ucws-singapore-hackathon---2026-cxgy
```

Result: public endpoint, returns event metadata.

Key fields observed:

- Event ID: `364d3219-5907-48b6-a34d-e95f90b10579`
- Title: `UCWS Singapore Hackathon -- 2026`
- Status: `active`
- Participants: `537`
- Event mode: `hybrid`
- Timezone: `Asia/Singapore`
- Project wall enabled: `true`
- Applications open: `true`
- Auto approve: `true`
- Auto grant submit project: `true`
- Project submit enabled: `true`
- Project edit enabled: `true`
- Demo upload enabled: `false`

## Official Tracks

The platform event API currently lists:

- Agent
- Skill
- Application
- DeepResearch

DeepResearch prize shown by the API: `USD $3000 Credit *3`.

## Official Evaluation Weights

The platform long description states:

- Community Vote: 30%
- AI Evaluation: 30%
- Expert Judges: 40%

This differs from some screenshot-era promotional material. For submission, the platform API should be treated as the stronger current source.

## Official Deadlines

The platform long description states:

- Project Submission Deadline: June 5, 2026 23:59 SGT
- Evaluation Basis Lock: June 5, 2026 23:59 SGT
- Community Voting Result: final vote count as of June 9, 2026 23:59 SGT
- Demo Day: June 13, 2026 in Singapore

## Project Wall API

The front-end asset search found the project list endpoint pattern:

```text
/api/projects?eventId=${eventId}&sort=${sort}&limit=20&offset=${offset}&token=${token}
```

Sort values visible from UI/front-end behavior:

- `all`
- `popular`
- `judge`
- `stars`

Direct anonymous calls returned `401 Unauthorized` for all tested sort modes. This proves the full Project Wall ranking cannot be reliably scraped without an authenticated Epic Connector session token.

## Project Data Fields In Front-End Schema

The front-end bundled schema includes project fields such as:

- `name`
- `tagline`
- `description`
- `demoUrl`
- `repoUrl`
- `track`
- `techStack`
- `screenshotUrls`
- `logoUrl`
- `demoFileUrl`
- `linkedinUrl`
- `teamMembers`
- `voteCount`
- `judgeVoteCount`
- `hackerVoteCount`
- `commentCount`
- `githubStars`

This confirms that repo quality, GitHub stars, votes, comments, and screenshot/demo completeness all matter to the visible project object.

## Implication For AidBridge

AidBridge should optimize for all three official weights:

- Community Vote: immediate, understandable demo and shareable public-good story.
- AI Evaluation: clean repo, deterministic tests, scenario benchmark report, clear README, runnable app, and honest architecture.
- Expert Judges: real-world public-good workflow, global scaling potential, privacy safeguards, and human-in-the-loop safety.
