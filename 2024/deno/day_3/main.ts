/*
 The computer appears to be trying to run a program, but its memory (your puzzle input) is corrupted. All of the instructions have been jumbled up!

It seems like the goal of the program is just to multiply some numbers. It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024. Similarly, mul(123,4) would multiply 123 by 4.

However, because the program's memory has been corrupted, there are also many invalid characters that should be ignored, even if they look like part of a mul instruction. Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.

For example, consider the following section of corrupted memory:

xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
Only the four highlighted sections are real mul instructions. Adding up the result of each instruction produces 161 (2*4 + 5*5 + 11*8 + 8*5).
 */

import { assertMatch } from "@std/assert/match";

export async function get_file_content() {
  return await Deno.readTextFile("./input.txt");
}

export function get_mul_instructions(instructions: string): string[] {
  //Define a regex that finds mul(23,45)
  const regex = /mul\(\d*,\d*\)/g;
  const matches = instructions.match(regex);
  return matches || [];
}

export function execute_mul_instruction(mul_instruction: string): number {
  const regex = /mul\((\d+),(\d+)\)/;
  assertMatch(mul_instruction, regex);
  const matches = regex.exec(mul_instruction);
  const x = parseInt(matches?.[1]!);
  const y = parseInt(matches?.[2]!);
  return x * y;
}

async function solve_day_3_puzzle() {
  const instructions = await get_file_content();
  const mul_instructions = get_mul_instructions(instructions);
  const result = mul_instructions.map(execute_mul_instruction).reduce((a, b) => a + b, 0);
  console.log(result);
}


// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Bla");
}

solve_day_3_puzzle();
