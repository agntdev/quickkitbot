import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

const ECHO_PROMPT = "Please reply to this message with the text you want echoed.";

composer.command("echo", async (ctx) => {
  const text = ctx.match?.toString().trim();
  if (text) {
    await ctx.reply(text);
  } else {
    await ctx.reply(ECHO_PROMPT);
  }
});

composer.on("message:text", async (ctx, next) => {
  const replyTo = ctx.message.reply_to_message;
  if (replyTo?.from?.is_bot && replyTo.text === ECHO_PROMPT) {
    await ctx.reply(ctx.message.text);
    return;
  }
  await next();
});

export default composer;