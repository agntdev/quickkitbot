## QuickKitBot — refined brief

### Summary
QuickKitBot is a minimal, stateless Telegram utility bot (pipeline validation tool) built with TypeScript and grammY. It implements a small set of deterministic, short replies and one simple randomized command. No database, no persistent storage, no payments, and no authentication.

### Audience
Developers or CI/tooling users who need a tiny Telegram bot to validate pipelines, connectivity, or basic command handling.

### Core features / commands
- /start — short welcome and list of commands
- /help — lists the commands
- /ping — replies exactly: `pong`
- /roll — replies with a random dice roll 1–6, e.g. `You rolled a 4` (uses secure RNG)
- /echo <text> — replies with the same text; if no <text> is provided the bot asks the user for text (see interaction details)

### Core entities
- Command handlers: one handler module per command under src/handlers/ (e.g. ping.ts, roll.ts, echo.ts, start.ts, help.ts)
- Bot entrypoint: src/index.ts which registers command handlers and starts the bot
- Environment: BOT_TOKEN passed via env

### Integrations & notification targets
- Telegram Bot API only (no external integrations)
- No external notification targets or webhooks by default (long-polling mode)

### Interaction flows
- /start
  - Bot replies with a 1–2 line welcome and a short enumerated list of available commands.
- /help
  - Same command list as /start (concise).
- /ping
  - Bot replies exactly `pong` (no punctuation variations).
- /roll
  - Bot uses Node crypto.randomInt(1, 7) and replies `You rolled a X` where X is 1–6.
- /echo <text>
  - If user provides <text> on the same command message, bot replies with that text verbatim.
  - If user sends `/echo` with no args, the bot replies: `Reply to this message with the text to echo.` The user must reply to that bot message with the text; the bot will detect reply_to_message and echo the replied text. This preserves statelessness (no DB/session required).

Notes: Replies are intentionally short and deterministic where possible. All user-visible strings are concise.

### Persistence
- None. The bot is stateless. Stateful behavior (for /echo) uses Telegram message reply metadata only (reply_to_message) and requires no storage.

### Payments
- None.

### Non-goals
- No database or persistent sessions
- No authentication beyond Telegram bot token
- No payment processing or token economics
- No web UI or dashboard

## Assumptions & defaults
- Runtime & deployment: long-polling using grammY (default start command uses bot.start()). Rationale: simplest reliable dev experience and matches a minimal stateless bot.
- Bot token: provided via BOT_TOKEN environment variable. Rationale: standard, secure config pattern for Telegram bots.
- File structure: per-command handler files in src/handlers/*.ts and a single src/index.ts entrypoint. Rationale: matches owner request and the bot-starter template pattern.
- Randomness: use Node's crypto.randomInt(1, 7) to generate 1–6. Rationale: secure, deterministic implementation detail for randomness.
- /echo fallback: ask the user to reply to the bot's prompt and detect reply_to_message to echo; do not store any session. Rationale: meets the requirement to "ask for text if none given" while remaining stateless.

