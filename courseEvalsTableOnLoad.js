// Set message
$courseEvalsMessage = "Loaded";

var rows = $courseEvalsTable.$data.length;
var row = 1;
var resultOkToView = false;
var resultOkToSetup = false;
var resultUpdateToViewable = false;
var resultMessage;

if (rows <=0) {
    $courseEvalsMessage = "No Courses Found.";
} else {
    for (row=0; row<rows; row++) {
        //console.log("Course: " + $courseEvalsTable.$data[row].crn);
        initResponse();
        evaluateCourse();
        setResultMessage();

        //console.log(resultMessage);
        $courseEvalsTable.$data[row].result = resultMessage;

    }
}


function initResponse() {
    resultOkToView = false;
    resultOkToSetup = false;
    resultUpdateToViewable = false;
    resultMessage ="";
}


function evaluateCourse() {
    if ($courseEvalsTable.$data[row].EVAL_CNTL_VIEWABLE == "Y") {

        // from now on we can view without futher conditions
        resultOkToView = true;

    } else if ($courseEvalsTable.$data[row].START_DATE > $courseEvalsTable.$data[row].ACCE_DATE) {
        
        // hasn't even started yet, so set up is fine
        resultOkToSetup = true;

    } else {

        if (    $courseEvalsTable.$data[row].X_EVALS_IN == 0 
             && $courseEvalsTable.$data[row].ACCE_DATE <= $courseEvalsTable.$data[row].X_FACULTY_DEADLINE
             && $courseEvalsTable.$data[row].X_FINALIZED == "N" ) {
        
            // No evaluations in, ACCE date < faculty deadline
            resultOkToSetup = true;
        } 

        if (    $courseEvalsTable.$data[row].X_GRADES_IN == $courseEvalsTable.$data[row].X_SIZE
             && $courseEvalsTable.$data[row].X_EVALS_IN > 0 
             && ($courseEvalsTable.$data[row].X_EVALS_IN == $courseEvalsTable.$data[row].X_SIZE || $courseEvalsTable.$data[row].ACCE_DATE > $courseEvalsTable.$data[row].X_STUDENT_DEADLINE) ) {

            // all grades are in AND some evals are in AND (all evals are in or ACCE date is after student deadline)
            // this means "update it" in szrectl to Viewable
            resultUpdateToViewable = true;
            resultOkToView = true;
        } 

    }
}


function setResultMessage() {
    if (resultOkToView == true) {
        resultMessage = "View";
    } else if (resultOkToSetup) {
        resultMessage = "Setup";
    } else {
        if ($courseEvalsTable.$data[row].x_grades_in < $courseEvalsTable.$data[row].X_SIZE) {
            resultMessage =  "GRADES_OUT";
        } else if ($courseEvalsTable.$data[row].acce_date <= $courseEvalsTable.$data[row].X_STUDENT_DEADLINE) {
            resultMessage = "STU_DEADLINE";
        } else if ($courseEvalsTable.$data[row].X_EVALS_IN == 0) {
            resultMessage = "(no evals in)";
        } 
    }
}