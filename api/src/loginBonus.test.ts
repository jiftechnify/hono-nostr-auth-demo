import { describe, expect, test } from "vitest";
import { updateLoginCount } from "./loginBonus";

describe("updateLoginCount", () => {
  test("should set both counts to 1 if no previous data", () => {
    const updated = updateLoginCount(undefined, 1);
    expect(updated).toEqual({ total: 1, consecutive: 1 });
  });

  test("should return undefined if already logged in today", () => {
    const updated = updateLoginCount({ count: { total: 5, consecutive: 3 }, lastLoginDay: 1 }, 1);
    expect(updated).toBeUndefined();
  });

  test("should increment total and consecutive by 1 if consecutive login", () => {
    const updated = updateLoginCount({ count: { total: 5, consecutive: 3 }, lastLoginDay: 1 }, 2);
    expect(updated).toEqual({ total: 6, consecutive: 4 });
  });

  test("should increment total by 1 and reset consecutive to 1 if not consecutive login", () => {
    const updated = updateLoginCount({ count: { total: 5, consecutive: 3 }, lastLoginDay: 1 }, 3);
    expect(updated).toEqual({ total: 6, consecutive: 1 });
  });
});
