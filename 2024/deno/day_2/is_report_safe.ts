const level_difference_is_valid = (difference: number) => {
    return difference >= 1 && difference <= 3;
}

export function is_report_safe(report_line: string, use_problem_dampener = false, remove_element?: number): boolean {
    const report = report_line.split(" ");
    let splice = remove_element;
    if (report.length < 2)
        throw new Error("Report is not valid");

    if (splice !== undefined) {
        report.splice(splice, 1);
        //console.log(report)
        splice++;
    }

    let report_is_safe = true;
    // Check increase /  decrease
    // We set a value to initially check if it is a increase or decrease
    // Then we use this value to determine the logic for all other 
    const increase = (parseInt(report[0]) < parseInt(report[1])) ? true : false;
    let start_value = parseInt(report[0]);

    for (let i = 1; i < report.length; i++) {
        const current_value = parseInt(report[i]);
        let difference = current_value - start_value;
        switch (increase) {
            case true:
                report_is_safe = (difference > 0 && level_difference_is_valid(difference));
                break;
            case false:
                difference = difference * -1;
                report_is_safe = (difference > 0 && level_difference_is_valid(difference));
                break;
        }

        // report is not safe. check next report
        if ((!report_is_safe))
            break;

        start_value = current_value;
    }

    if (!report_is_safe && use_problem_dampener) {
        // Recursive check by removing elements from the report
        if (splice === undefined)
            splice = 0;
        if (splice <= report.length) {
            //console.log(splice)
            report_is_safe = is_report_safe(report_line, use_problem_dampener, splice)
        }
    }

    return report_is_safe;
}
