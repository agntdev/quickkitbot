import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("ping", async (ctx) => {
  await ctx.reply("pong");
});

export default composer;