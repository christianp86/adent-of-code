/*
 The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three.

 */

import { TextLineStream } from "jsr:@std/streams@0.223.0/text-line-stream";
import { is_report_safe } from "./is_report_safe.ts";

async function determine_number_of_safe_reports() {

    using f = await Deno.open("./input.txt");
    const readable = f.readable
        .pipeThrough(new TextDecoderStream()) // decode Uint8Array to string
        .pipeThrough(new TextLineStream()) // split string line by line

    let safe_report_counter = 0;
    let safe_report_counter_with_dampener = 0;
    for await (const report of readable) {

        const report_is_safe = is_report_safe(report);
        const report_is_safe_with_dampener = is_report_safe(report, true);

        if (!report_is_safe && !report_is_safe_with_dampener)
            console.log(`Report ${report} [${report_is_safe}] [${report_is_safe_with_dampener}]`);

        if (report_is_safe)
            safe_report_counter++;

        if (report_is_safe_with_dampener)
            safe_report_counter_with_dampener++;
    }

    console.log(`Number of safe reports: ${safe_report_counter}`)
    console.log(`Number of safe reports with dampener: ${safe_report_counter_with_dampener}`)
}

determine_number_of_safe_reports();