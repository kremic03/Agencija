import { test as base, expect } from "@playwright/test";

type Options = {
  /** Testovi koji namerno izazivaju grešku u pregledaču ovo isključuju */
  failOnConsoleError: boolean;
};

/** Svaki test pada ako se u pregledaču pojavi greška */
export const test = base.extend<Options>({
  failOnConsoleError: [true, { option: true }],
  page: async ({ page, failOnConsoleError }, runTest) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await runTest(page);
    if (failOnConsoleError) expect(errors, "greške u konzoli pregledača").toEqual([]);
  },
});

export { expect };
