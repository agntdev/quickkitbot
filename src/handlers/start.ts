import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { menuKeyboard } from "../toolkit/index.js";

const composer = new Composer<Ctx>();

composer.command("start", async (ctx) => {
  await ctx.reply("Welcome! I am ready to help.", {
    reply_markup: menuKeyboard([
      { text: "Help", data: "help" },
    ]),
  });
});

composer.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    "Available commands:\n" +
    "/start — Start the bot\n" +
    "/help — Show this help message",
  );
});

export default composer;