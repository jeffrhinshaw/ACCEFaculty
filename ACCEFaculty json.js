{
      "title": "ACCEFaculty",
      "style": "",
      "name": "ACCEFaculty",
      "label": "",
      "components": [
            {
                  "staticData": [],
                  "name": "getUser",
                  "resource": "virtualDomains.GenUser",
                  "type": "resource"
            },
            {
                  "staticData": [],
                  "name": "getACCEFacEvals",
                  "resource": "virtualDomains.ACCEFacEval",
                  "type": "resource"
            },
            {
                  "name": "getPidmFromUserId",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.genPidmFromUser"
            },
            {
                  "name": "dummyRead",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.dummy"
            },
            {
                  "name": "hiddenControls",
                  "type": "block",
                  "showInitially": false,
                  "components": []
            },
            {
                  "name": "getFacAttributes",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.GenFacAttributes"
            },
            {
                  "name": "getFacCommitteeEvals",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.ACCEFacCommitteeEvals"
            },
            {
                  "name": "getFacultyList",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.ACCEFacFacultyList"
            },
            {
                  "name": "getEvalQuestionsAnswers",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.ACCEStuEvalQuestionsAnswers"
            },
            {
                  "name": "viewForRBG",
                  "type": "resource",
                  "staticData": [
                        {
                              "description": "Your Classes",
                              "value": "SELF",
                              "inst_pidm": "SELF",
                              "eval_type": "SELF",
                              "viewFor": "SELF"
                        },
                        {
                              "description": "OR Choose an Instructor",
                              "value": "INSTRUCTOR",
                              "inst_pidm": "INSTRUCTOR",
                              "eval_type": "INSTRUCTOR",
                              "viewFor": "INSTRUCTOR"
                        }
                  ]
            },
            {
                  "name": "getTWGRINFO",
                  "type": "resource",
                  "staticData": [],
                  "resource": "virtualDomains.TWGRINFO"
            },
            {
                  "name": "selectRBG",
                  "type": "resource",
                  "staticData": [
                        {
                              "label": "select",
                              "value": "X"
                        }
                  ]
            },
            {
                  "name": "overrideBlock",
                  "type": "block",
                  "label": "Override Instructor PIDM",
                  "showInitially": true,
                  "components": [
                        {
                              "name": "userData",
                              "type": "data",
                              "parameters": {},
                              "loadInitially": true,
                              "model": "getUser",
                              "onLoad": "$overrideUserId = $userData.USER_ID;\n$overridePidm = $userData.USER_PIDM;\n\nfor (i=0; i<$$user.authorities.length; i++) {\n  console.log(\"Authority: \" + $$user.authorities[i].objectName + \", \" + $$user.authorities[i].roleName);\n  if ($$user.authorities[i].objectName == \"SELFSERVICE-WTAILORADMIN\") {\n    console.log(\"SuperUser\");\n    $overrideHeadingBlock.$visible = true;\n  }\n}"
                        },
                        {
                              "name": "facAttributeData",
                              "type": "data",
                              "model": "getFacAttributes",
                              "parameters": {
                                    "in_pidm": "$overridePidm"
                              },
                              "loadInitially": false,
                              "onLoad": "console.log(\"facAttribute loaded: \" + $facAttributeData.$data.length);\n\nvar rows = $facAttributeData.$data.length;\nvar row = 1;\n\ninitGlobals();\n\nfor (row=0; row<rows; row++) {\n  //console.log(\"Fac Attribute: \" +   $facAttributeData.$data[row].code + \" / \" + $facAttributeData.$data[row].description);\n  switch($facAttributeData.$data[row].code) {\n    case \"DECO\":\n        $globalFattIsDean = \"Y\";\n        $globalFattLimitTerm = \"%\";\n        break;\n    case \"SUMM\":\n        $globalFattIsDean = \"Y\";\n        $globalFattLimitTerm = \"%30\";\n        break;\n    case \"DECH\":\n        $globalFattIsChair = \"Y\";\n        $globalFattLimitTerm = \"%\";\n        break;\n    default:\n        $globalFattIsReview = \"Y\";\n  } // end switch\n}  // end for\n\nevaluateAttributes();\n\nconsole.log(\"DECO, DECH, Review, Trm Lmt: \"\n  + $globalFattIsDean \n  + \", \" + $globalFattIsChair\n  + \", \" + $globalFattIsReview\n  + \", \" + $globalFattLimitTerm\n  )\n\nfunction initGlobals() {\n  $globalFattIsDean = \"N\";\n  $globalFattIsChair= \"N\";\n  $globalFattIsReview= \"N\";\n  $globalFattLimitTerm = \"\";\n}\n\nfunction evaluateAttributes() {\n  console.log(\"evaluating attributes...\");\n  if ($globalFattIsDean == \"Y\") {\n    $deansFacultyList.$load({clearCache:true});\n    $blockDeanEvals.$visible = true;\n    $globalYouAre = \"DEAN\";\n  } else {\n    $reviewCommitteeTable.$load({clearCache:true});\n  }\n}"
                        },
                        {
                              "name": "headingBlockLeft",
                              "type": "block",
                              "style": "",
                              "showInitially": true,
                              "components": [
                                    {
                                          "name": "headingBlockName",
                                          "type": "display",
                                          "loadInitially": false,
                                          "asHtml": false,
                                          "value": "$userData.USER_NAME",
                                          "style": "inlineBlock",
                                          "labelStyle": "inlineBlock",
                                          "valueStyle": "inlineBlock"
                                    },
                                    {
                                          "name": "headingBlockId",
                                          "type": "display",
                                          "label": "",
                                          "loadInitially": false,
                                          "value": "$userData.USER_ID",
                                          "asHtml": false,
                                          "style": "inlineBlock",
                                          "labelStyle": "inlineBlock",
                                          "valueStyle": "inlineBlock"
                                    }
                              ]
                        },
                        {
                              "name": "headingBlockRight",
                              "type": "block",
                              "style": "",
                              "showInitially": true,
                              "components": [
                                    {
                                          "name": "overridePidm",
                                          "type": "text",
                                          "label": "Override PIDM",
                                          "style": "inlineBlock",
                                          "loadInitially": false,
                                          "value": "",
                                          "model": "",
                                          "parameters": {},
                                          "validation": {},
                                          "readonly": false,
                                          "required": false,
                                          "onLoad": "",
                                          "labelStyle": "inlineBlock",
                                          "valueStyle": "inlineBlock"
                                    },
                                    {
                                          "name": "headingBlockLoadStudentCourseButton",
                                          "type": "button",
                                          "label": "Load Evals",
                                          "style": "inlineBlock",
                                          "onClick": "// set load message\n//$courseEvalsMessage = \"Loading Evals...\";\n\n// hide blocks while we see what should be visible\n$blockDeanEvals.$visible = false;\n$blockReviewCommittee.$visible = false;\n$blockCourseEvals.$visible = false;\n\n//load faculty attributes\n$facAttributeData.$load({clearCache:true});\n//$reviewCommitteeTable.$load({clearCache:true});",
                                          "valueStyle": "inlineBlock"
                                    }
                              ]
                        }
                  ],
                  "style": ""
            },
            {
                  "name": "blockDeanEvals",
                  "type": "form",
                  "nextButtonLabel": "Next",
                  "showInitially": false,
                  "components": [
                        {
                              "name": "deanEvalsMessage",
                              "type": "textArea",
                              "valueStyle": "textareaW100H4NoBorder",
                              "model": "getTWGRINFO.TWGRINFO_TEXT",
                              "parameters": {
                                    "name": "\"zwlkacce.P_SelectPerson\"",
                                    "label": "\"DEAN\""
                              },
                              "validation": {},
                              "readonly": false,
                              "required": false,
                              "loadInitially": false,
                              "value": ""
                        },
                        {
                              "name": "eval_type",
                              "type": "radio",
                              "sourceModel": "viewForRBG",
                              "labelKey": "description",
                              "valueKey": "eval_type",
                              "label": "Choose Evaluation Type",
                              "style": "",
                              "labelStyle": "",
                              "valueStyle": "",
                              "sourceParameters": {},
                              "model": "eval_type",
                              "required": true,
                              "loadInitially": true,
                              "value": "SELF",
                              "onUpdate": ""
                        },
                        {
                              "name": "deansFacultyList",
                              "type": "select",
                              "sourceModel": "getFacultyList",
                              "labelKey": "FULL_NAME_DEPT",
                              "valueKey": "INST_PIDM",
                              "style": "",
                              "labelStyle": "",
                              "valueStyle": "",
                              "sourceParameters": {
                                    "in_limit_term": "$globalFattLimitTerm"
                              },
                              "required": false,
                              "loadInitially": true,
                              "onUpdate": ""
                        },
                        {
                              "name": "deanEvalsContinue",
                              "type": "button",
                              "label": "Continue",
                              "style": "inlineBlock",
                              "valueStyle": "inlineBlock",
                              "onClick": "console.log(\"Dean Radio Select: \" + $eval_type);\nvar okToContinue = setGlobalViewPidm();\nif (okToContinue) {\n  displayInstructorEvaluations();\n}\n\n\nfunction setGlobalViewPidm() {\n  var globalPidmSet = false;\n  if ($eval_type == \"SELF\") {\n    // Assign the selected instructor as the globalViewPidm\n    $globalViewPidm = $overridePidm;\n    globalPidmSet = true;\n    $globalYouAreViewing = \"SELF\";\n    console.log(\"dean reviewing self evaluations\");\n  } else {\n    if ($deansFacultyList.$selected == null) {\n      alert(\"You must choose an instructor from the list\");\n    } else {\n      $globalViewPidm = $deansFacultyList.$selected.INST_PIDM;\n      $globalYouAreViewing = \"OTHER\";\n      globalPidmSet = true;\n    }\n  }\n  return globalPidmSet;\n}\n\n\nfunction displayInstructorEvaluations() {\n  // load the evals just for this instructor\n  $courseEvalsTable.$load({clearCache:true});\n\n  // Show the pending evals block\n  $courseEvalsMessage = \"Loading Evals...\";\n  $blockCourseEvals.$visible = true;\n\n  // Hide dean's selection block\n  $blockDeanEvals.$visible = false;\n}"
                        }
                  ]
            },
            {
                  "name": "blockReviewCommittee",
                  "type": "block",
                  "showInitially": false,
                  "components": [
                        {
                              "name": "committeeEvalsMessage",
                              "type": "textArea",
                              "valueStyle": "textareaW100H4NoBorder",
                              "model": "getTWGRINFO.TWGRINFO_TEXT",
                              "parameters": {
                                    "name": "\"zwlkacce.P_SelectPerson\"",
                                    "label": "\"REVIEW\""
                              },
                              "validation": {},
                              "readonly": false,
                              "required": false,
                              "loadInitially": false,
                              "value": ""
                        },
                        {
                              "name": "reviewCommitteeTable",
                              "type": "grid",
                              "model": "getFacCommitteeEvals",
                              "parameters": {
                                    "in_pidm": "$overridePidm"
                              },
                              "allowNew": false,
                              "allowModify": false,
                              "allowDelete": false,
                              "allowReload": false,
                              "pageSize": 20,
                              "loadInitially": false,
                              "components": [
                                    {
                                          "name": "reviewCommitteeInstructor",
                                          "type": "display",
                                          "label": "Instructor",
                                          "model": "CAN_SEE_NAME",
                                          "loadInitially": false,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeDepartment",
                                          "type": "display",
                                          "label": "Department",
                                          "model": "CAN_SEE_DEPARTMENT",
                                          "loadInitially": false,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeEvalsAvailable",
                                          "type": "display",
                                          "label": "Evaluations Available",
                                          "model": "EVALS_AVAILABLE",
                                          "loadInitially": false,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeRelationship",
                                          "type": "display",
                                          "label": "Relationship",
                                          "model": "CAN_SEE_DESC",
                                          "loadInitially": false,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeTableRowSelect",
                                          "type": "boolean",
                                          "label": "Select",
                                          "readonly": false,
                                          "loadInitially": true,
                                          "onUpdate": "// this action is being handled in the table on click event handler"
                                    }
                              ],
                              "label": "Review Committee",
                              "onLoad": "console.log(\"Can see: \" + $reviewCommitteeTable.$data.length);\n\n// if this was loaded, pidm is not for the dean\n\nif ($reviewCommitteeTable.$data.length == 0) {\n  // do nothing.  this happens on grids - it makes an extra, empty call\n} else if ($reviewCommitteeTable.$data.length >1) {\n  //Show the blockReviewCommittee\n  $blockReviewCommittee.$visible = true;\n  if ($globalFattIsReview == \"Y\") {\n    $globalYouAre = \"REVIEW\";\n  } else {\n    $globalYouAre = \"DECH\";\n  }\n  $globalYouAreViewing = \"OTHER\";\n} else {\n  // This user will only be viewing their own course evaluations\n  $globalYouAre = \"SELF\";\n  $globalYouAreViewing = \"SELF\";\n  $globalViewPidm = $overridePidm;\n  // load the evals just for this instructor\n  $courseEvalsTable.$load({clearCache:true});\n  // Show the pending evals block\n  $courseEvalsMessage = \"Loading Evals...\";\n  $blockCourseEvals.$visible = true;\n}",
                              "onClick": "// Assign the selected instructor as the globalViewPidm\n$globalViewPidm = $reviewCommitteeTable.$selected.CAN_SEE_PIDM;\nconsole.log(\"$globalViewPidm set: \" + $globalViewPidm);\n\n\n// load the evals just for this instructor\n$courseEvalsTable.$load({clearCache:true});\n\n// Show the pending evals block\n$courseEvalsMessage = \"Loading Evals...\";\n$blockCourseEvals.$visible = true;\n\n// Hide this block\n$blockReviewCommittee.$visible = false;\n\n// Unselect the checked row so everything is primed for our return\n$reviewCommitteeTable.$selected.reviewCommitteeTableRowSelect = false;\n\n//\nif ($reviewCommitteeTable.$selected.ROW_NUMBER ==1) {\n\t$globalYouAreViewing = \"SELF\";\n} else {\n\t\t$globalYouAreViewing = \"OTHER\";\n}"
                        }
                  ],
                  "label": ""
            },
            {
                  "style": "blocks",
                  "name": "blockCourseEvals",
                  "label": "",
                  "showInitially": false,
                  "components": [
                        {
                              "name": "blockCourseEvalsLeft",
                              "type": "block",
                              "showInitially": true,
                              "components": [
                                    {
                                          "name": "courseEvalsTable",
                                          "type": "grid",
                                          "model": "getACCEFacEvals",
                                          "parameters": {
                                                "in_pidm": "$globalViewPidm"
                                          },
                                          "allowNew": false,
                                          "allowModify": false,
                                          "allowDelete": false,
                                          "allowReload": false,
                                          "pageSize": 200,
                                          "loadInitially": false,
                                          "components": [
                                                {
                                                      "name": "blockCourseEvalTermDescription",
                                                      "type": "display",
                                                      "model": "TERM_DESC",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEvalCRN",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "CRN",
                                                      "model": "CRN"
                                                },
                                                {
                                                      "name": "blockCourseEvalCourse",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "Course",
                                                      "model": "COURSE_ID"
                                                },
                                                {
                                                      "name": "blockCourseEvalTitle",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "Title",
                                                      "model": "COURSE_TITLE"
                                                },
                                                {
                                                      "name": "blockCourseEvalBlock",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "Block",
                                                      "model": "BLOCK"
                                                },
                                                {
                                                      "name": "blockCourseEvalUnits",
                                                      "type": "display",
                                                      "label": "Units",
                                                      "model": "UNITS",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEvalInstructorName",
                                                      "type": "display",
                                                      "label": "Instructor",
                                                      "model": "INSTRUCTOR_NAME",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEvalLimit",
                                                      "type": "display",
                                                      "label": "Limit",
                                                      "model": "COURSE_LIMIT",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEval",
                                                      "type": "display",
                                                      "label": "Class Size",
                                                      "model": "COURSE_SIZE",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "result",
                                                      "type": "link",
                                                      "label": "result",
                                                      "valueStyle": "",
                                                      "replaceView": true
                                                }
                                          ],
                                          "label": "Course Evaluations: $courseEvalsMessage",
                                          "onLoad": "// Set message\n$courseEvalsMessage = \"Loaded\";\n\nvar rows = $courseEvalsTable.$data.length;\nvar row = 1;\nvar resultOkToView = false;\nvar resultOkToSetup = false;\nvar resultUpdateToViewable = false;\nvar resultMessage;\n\nif (rows <=0) {\n    $courseEvalsMessage = \"No Courses Found.\";\n} else {\n    for (row=0; row<rows; row++) {\n        //console.log(\"Course: \" + $courseEvalsTable.$data[row].crn);\n        initResponse();\n        evaluateCourse();\n        setResultMessage();\n\n        //console.log(resultMessage);\n        $courseEvalsTable.$data[row].result = resultMessage;\n\n    }\n}\n\n\nfunction initResponse() {\n    resultOkToView = false;\n    resultOkToSetup = false;\n    resultUpdateToViewable = false;\n    resultMessage =\"\";\n}\n\n\nfunction evaluateCourse() {\n    if ($courseEvalsTable.$data[row].EVAL_CNTL_VIEWABLE == \"Y\") {\n\n        // from now on we can view without futher conditions\n        console.log(\"OK to view1\");\n        resultOkToView = true;\n\n    } else if ($courseEvalsTable.$data[row].START_DATE > $courseEvalsTable.$data[row].ACCE_DATE) {\n        console.log(\"OK to setup1\");\n        resultOkToSetup = true;\n    } else {\n\n        if (    $courseEvalsTable.$data[row].X_EVALS_IN == 0 \n             && $courseEvalsTable.$data[row].ACCE_DATE <= $courseEvalsTable.$data[row].X_FACULTY_DEADLINE\n             && $courseEvalsTable.$data[row].X_FINALIZED == \"N\" ) {\n        \n            // No evaluations in, ACCE date < faculty deadline\n            console.log(\"OK to setup2\");\n            resultOkToSetup = true;\n        } \n\n        if (    $courseEvalsTable.$data[row].X_GRADES_IN == $courseEvalsTable.$data[row].X_SIZE\n             && $courseEvalsTable.$data[row].X_EVALS_IN > 0 \n             && ($courseEvalsTable.$data[row].X_EVALS_IN == $courseEvalsTable.$data[row].X_SIZE || $courseEvalsTable.$data[row].ACCE_DATE > $courseEvalsTable.$data[row].X_STUDENT_DEADLINE) ) {\n\n            // all grades are in AND some evals are in AND (all evals are in or ACCE date is after student deadline)\n            // this means \"update it\" in szrectl to Viewable\n            console.log(\"OK to view2\");\n            resultUpdateToViewable = true;\n            resultOkToView = true;\n        } \n\n    }\n}\n\n\nfunction setResultMessage() {\n    console.log(\"message: \" + $courseEvalsTable.$data[row].CRN + \", X_GRADES_IN: \" + $courseEvalsTable.$data[row].X_GRADES_IN\n        + \", x_size: \" + $courseEvalsTable.$data[row].X_SIZE + \". viewing: \" + $globalYouAreViewing\n        + \", evals_in: \" + $courseEvalsTable.$data[row].X_EVALS_IN + \", acce_date: \" + $courseEvalsTable.$data[row].ACCE_DATE\n        + \", faculty_deadline: \" +  $courseEvalsTable.$data[row].X_FACULTY_DEADLINE + \", x_finalized: \" + $courseEvalsTable.$data[row].X_FINALIZED\n        + \", start_date: \" + $courseEvalsTable.$data[row].START_DATE \n        + \", $globalYouAreViewing: \" + $globalYouAreViewing);\n    if (resultOkToView == true) {\n        resultMessage = \"View\";\n    } else if (resultOkToSetup) {\n        if ($globalYouAreViewing == \"SELF\") {\n            resultMessage = \"Setup\";\n        }\n    } else {\n        if ($courseEvalsTable.$data[row].X_GRADES_IN < $courseEvalsTable.$data[row].X_SIZE) {\n            resultMessage =  \"grades not posted\";\n        } else if ($courseEvalsTable.$data[row].ACCE_DATE <= $courseEvalsTable.$data[row].X_STUDENT_DEADLINE) {\n            resultMessage = \"still available\";\n        } else if ($courseEvalsTable.$data[row].X_EVALS_IN == 0) {\n            resultMessage = \"(no evals in)\";\n        } \n    }\n}",
                                          "onSave": "",
                                          "onClick": "console.log(\"Row selected: \" + $courseEvalsTable.$selected);"
                                    }
                              ]
                        },
                        {
                              "name": "blockCourseEvalsRight",
                              "type": "block",
                              "showInitially": true,
                              "components": [
                                    {
                                          "name": "courseEvalsOrderReportButton",
                                          "type": "button",
                                          "label": "Order Report",
                                          "onClick": "//"
                                    },
                                    {
                                          "name": "courseEvalsExitButton",
                                          "type": "button",
                                          "label": "Exit",
                                          "onClick": "$blockCourseEvals.$visible = false;\n\nconsole.log(\"Close evals.  you are: \" + $globalYouAre);\nif ($globalYouAre == \"DEAN\") {\n  $blockDeanEvals.$visible = true;\n} else if ($globalYouAre == \"DECH\" || $globalYouAre == \"REVIEW\") {\n  $blockReviewCommittee.$visible = true;\n}"
                                    }
                              ]
                        }
                  ],
                  "type": "block"
            },
            {
                  "name": "blockCourseEvalsResponseStudent",
                  "type": "block",
                  "label": "Course Evaluation Responses by Student",
                  "showInitially": false,
                  "components": [
                        {
                              "name": "blockCourseEvalsResponseStudentLeft",
                              "type": "block",
                              "showInitially": true,
                              "components": [
                                    {
                                          "name": "blockCourseEvalsResponseStudentDescription",
                                          "type": "display",
                                          "label": "This evaluation is for:",
                                          "loadInitially": true,
                                          "asHtml": false,
                                          "value": "Block $courseEvalsTable.$selected.BLOCK\n, $courseEvalsTable.$selected.COURSE_ID\n ($courseEvalsTable.$selected.CRN) \n $courseEvalsTable.$selected.COURSE_TITLE",
                                          "style": "inlineBlock",
                                          "labelStyle": "inlineBlock",
                                          "valueStyle": "inlineBlock"
                                    },
                                    {
                                          "name": "blockCourseEvalsResponseStudentDescription2",
                                          "type": "display",
                                          "style": "inlineBlock",
                                          "labelStyle": "inlineBlock",
                                          "valueStyle": "inlineBlock",
                                          "loadInitially": true,
                                          "asHtml": false,
                                          "value": "$courseEvalsTable.$selected.INSTRUCTOR_NAME"
                                    }
                              ]
                        },
                        {
                              "name": "blockCourseEvalsResponseStudentRight",
                              "type": "block",
                              "showInitially": true,
                              "components": [
                                    {
                                          "name": "blockCourseEvalsResponseStudentNextButton",
                                          "type": "button",
                                          "label": "Next",
                                          "onClick": "//"
                                    },
                                    {
                                          "name": "blockCourseEvalsResponseStudentExitButton",
                                          "type": "button",
                                          "label": "Exit",
                                          "onClick": "//"
                                    },
                                    {
                                          "name": "blockCourseEvalsResponseStudentQuestionButton",
                                          "type": "button",
                                          "label": "Display by Question",
                                          "onClick": "//"
                                    }
                              ]
                        }
                  ]
            }
      ],
      "importCSS": "ACCE_FACULTY_CSS",
      "type": "page"
}