import { expect, test } from "@playwright/test";
import { createRateLimiter } from "../src/lib/rate-limit";

test("dozvoljava do granice, pa odbija do kraja prozora", () => {
  const allow = createRateLimiter({ limit: 2, windowMs: 1000 });
  expect(allow("a", 0)).toBe(true);
  expect(allow("a", 1)).toBe(true);
  expect(allow("a", 2)).toBe(false);
  expect(allow("a", 999)).toBe(false);
  expect(allow("a", 1000)).toBe(true);
});

test("svaki ključ se broji posebno", () => {
  const allow = createRateLimiter({ limit: 1, windowMs: 1000 });
  expect(allow("a", 0)).toBe(true);
  expect(allow("b", 0)).toBe(true);
  expect(allow("a", 0)).toBe(false);
});

test("posle mnogo različitih ključeva brojač i dalje radi", () => {
  const allow = createRateLimiter({ limit: 1, windowMs: 1000 });
  for (let i = 0; i < 25_000; i += 1) allow(`k${i}`, 0);
  expect(allow("novi", 0)).toBe(true);
  expect(allow("novi", 0)).toBe(false);
});
