import { expect } from "jsr:@std/expect";
import { is_report_safe } from "./is_report_safe.ts";

Deno.test("Report 24 21 22 24 26 28 27 28 is marked as not safe", () => {
    const report_is_safe = is_report_safe("24 21 22 24 26 28 27 28");
    expect(report_is_safe).toBe(false);
});

Deno.test("Report 7 6 4 2 1 is marked safe", () => {
    const report_is_safe = is_report_safe("7 6 4 2 1");
    expect(report_is_safe).toBe(true);
});

Deno.test("Report 1 3 6 7 9 is marked safe", () => {
    const report_is_safe = is_report_safe("1 3 6 7 9");
    expect(report_is_safe).toBe(true);
});

Deno.test("Report 1 3 2 4 5 is marked safe with dampener", () => {
    const report_is_safe = is_report_safe("1 3 2 4 5", true);
    expect(report_is_safe).toBe(true);
});

Deno.test("Report 1 3 6 7 9 is marked safe with dampener", () => {
    const report_is_safe = is_report_safe("1 3 6 7 9", true);
    expect(report_is_safe).toBe(true);
});

Deno.test("Report 8 6 4 4 1 is marked safe with dampener", () => {
    const report_is_safe = is_report_safe("8 6 4 4 1", true);
    expect(report_is_safe).toBe(true);
});

Deno.test("Report 1 2 7 8 9 is marked not safe with dampener", () => {
    const report_is_safe = is_report_safe("1 2 7 8 9", true);
    expect(report_is_safe).toBe(false);
});

Deno.test("Report 9 7 6 2 1 is marked not safe with dampener", () => {
    const report_is_safe = is_report_safe("9 7 6 2 1", true);
    expect(report_is_safe).toBe(false);
});

Deno.test("Report 89 91 90 84 83 is marked not safe with dampener", () => {
    const report_is_safe = is_report_safe("89 91 90 84 83", true);
    expect(report_is_safe).toBe(false);
});

/**
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
*/