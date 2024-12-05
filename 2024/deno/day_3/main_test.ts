import { expect } from "jsr:@std/expect";
import { get_mul_instructions, execute_mul_instruction } from "./main.ts"
import { AssertionError } from "@std/assert/assertion-error";

Deno.test("Finds 4 mul instructions", () => {
  const test = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
  const mul_instructions = get_mul_instructions(test);
  console.log(mul_instructions)
  expect(mul_instructions.length).toBe(4);
});

Deno.test("Executes mul instruction correctly", () => {
  expect(execute_mul_instruction("mul(100,4)")).toBe(400);
})

/* Deno.test("Does not execute mul instruction", () => {
  // Expect to throw an AssertionError
  expect(() => execute_mul_instruction("mul(100,4)")).toThrow(AssertionError);
}) */
