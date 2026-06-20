import { randomInt } from "node:crypto";
import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("roll", async (ctx) => {
  const result = randomInt(1, 7);
  await ctx.reply(`You rolled a ${result}`);
});

export default composer;