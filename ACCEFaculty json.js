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
                              "onLoad": "var rows = $facAttributeData.$data.length;\nvar row = 1;\n\ninitGlobals();\n\nfor (row=0; row<rows; row++) {\n  console.log(\"Fac Attribute: \" +   $facAttributeData.$data[row].code + \" / \" + $facAttributeData.$data[row].description);\n  switch($facAttributeData.$data[row].code) {\n    case \"DECO\":\n        $globalFattIsDean = \"Y\";\n        $globalFattLimitTerm = \"%\";\n        break;\n    case \"SUMM\":\n        $globalFattIsDean = \"Y\";\n        $globalFattLimitTerm = \"%30\";\n        break;\n    case \"DECH\":\n        $globalFattIsChair = \"Y\";\n        $globalFattLimitTerm = \"%\";\n        break;\n    default:\n        $globalFattIsReview = \"Y\";\n  } // end switch\n}  // end for\n\nconsole.log(\"DECO, DECH, Review, Trm Lmt: \"\n  + $globalFattIsDean \n  + \", \" + $globalFattIsChair\n  + \", \" + $globalFattIsReview\n  + \", \" + $globalFattLimitTerm\n  )\n\nfunction initGlobals() {\n  $globalFattIsDean = \"N\";\n  $globalFattIsChair= \"N\";\n  $globalFattIsReview= \"N\";\n  $globalFattLimitTerm = \"\";\n}"
                        },
                        {
                              "name": "facCanSeeData",
                              "type": "data",
                              "model": "getFacCanSee",
                              "parameters": {
                                    "in_pidm": "$overridePidm",
                                    "abc": "a"
                              },
                              "loadInitially": false,
                              "onLoad": "console.log(\"can see loaded\");"
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
                                          "onClick": "// set load message\n//$courseEvalsMessage = \"Loading Evals...\";\n\n// hide blocks while we see what should be visible\n$blockReviewCommittee.$visible = false;\n$blockCourseEvals.$visible = false;\n\n//load faculty attributes\n$facAttributeData.$load({clearCache:true});\n$reviewCommitteeTable.$load({clearCache:true});",
                                          "valueStyle": "inlineBlock"
                                    }
                              ]
                        }
                  ],
                  "style": ""
            },
            {
                  "name": "blockReviewCommittee",
                  "type": "block",
                  "showInitially": false,
                  "components": [
                        {
                              "name": "reviewCommitteeTable",
                              "type": "htable",
                              "model": "getFacCommitteeEvals",
                              "parameters": {
                                    "in_pidm": "$overridePidm"
                              },
                              "allowNew": false,
                              "allowModify": false,
                              "allowDelete": false,
                              "allowReload": false,
                              "pageSize": 0,
                              "loadInitially": false,
                              "components": [
                                    {
                                          "name": "reviewCommitteeInstructor",
                                          "type": "display",
                                          "label": "Instructor",
                                          "model": "can_see_name",
                                          "loadInitially": false,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeDepartment",
                                          "type": "display",
                                          "label": "Department",
                                          "model": "can_see_department",
                                          "loadInitially": true,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeEvalsAvailable",
                                          "type": "display",
                                          "label": "Evaluations Available",
                                          "model": "evals_available",
                                          "loadInitially": true,
                                          "asHtml": false
                                    },
                                    {
                                          "name": "reviewCommitteeRelationship",
                                          "type": "display",
                                          "label": "Relationship",
                                          "model": "can_see_desc",
                                          "loadInitially": true,
                                          "asHtml": false
                                    }
                              ],
                              "label": "Review Committee",
                              "onLoad": "console.log(\"Can see: \" + $reviewCommitteeTable.$data.length);\n\nif ($reviewCommitteeTable.$data.length >1) {\n  // Show the blockReviewCommittee\n  $blockReviewCommittee.$visible = true;\n} else {\n  // load the evals just for this instructor\n  $courseEvalsTable.$load({clearCache:true});\n  // Show the pending evals block\n  $courseEvalsMessage = \"Loading Evals...\";\n  $blockCourseEvals.$visible = true;\n}\n\n// Show the pending evals block\n//$blockCourseEvals.$visible = true;"
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
                                                "in_pidm": "$overridePidm"
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
                                                      "model": "term_description",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEvalCRN",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "CRN",
                                                      "model": "crn"
                                                },
                                                {
                                                      "name": "blockCourseEvalCourse",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "Course",
                                                      "model": "course_id"
                                                },
                                                {
                                                      "name": "blockCourseEvalTitle",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "Title",
                                                      "model": "course_title"
                                                },
                                                {
                                                      "name": "blockCourseEvalBlock",
                                                      "type": "display",
                                                      "loadInitially": true,
                                                      "asHtml": false,
                                                      "label": "Block",
                                                      "model": "block"
                                                },
                                                {
                                                      "name": "blockCourseEvalUnits",
                                                      "type": "display",
                                                      "label": "Units",
                                                      "model": "units",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEvalInstructorName",
                                                      "type": "display",
                                                      "label": "Instructor",
                                                      "model": "instructor_name",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEvalLimit",
                                                      "type": "display",
                                                      "label": "Limit",
                                                      "model": "course_limit",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "blockCourseEval",
                                                      "type": "display",
                                                      "label": "Class Size",
                                                      "model": "course_size",
                                                      "loadInitially": true,
                                                      "asHtml": false
                                                },
                                                {
                                                      "name": "result",
                                                      "type": "link",
                                                      "label": "result",
                                                      "replaceView": true
                                                }
                                          ],
                                          "label": "Course Evaluations $courseEvalsMessage",
                                          "onLoad": "// Set message\n$courseEvalsMessage = \"Loaded\";\n\nvar rows = $courseEvalsTable.$data.length;\nvar row = 1;\nvar resultOkToView = false;\nvar resultOkToSetup = false;\nvar resultUpdateToViewable = false;\nvar resultMessage;\n\nfor (row=0; row<rows; row++) {\n    console.log(\"Course: \" + $courseEvalsTable.$data[row].crn);\n    initResponse();\n    evaluateCourse();\n    setResultMessage();\n\n    console.log(resultMessage);\n    $courseEvalsTable.$data[row].result = resultMessage;\n\n}\n\n\nfunction initResponse() {\n    resultOkToView = false;\n    resultOkToSetup = false;\n    resultUpdateToViewable = false;\n    resultMessage =\"\";\n}\n\n\nfunction evaluateCourse() {\n    if ($courseEvalsTable.$data[row].eval_cntl_viewable == \"Y\") {\n\n        // from now on we can view without futher conditions\n        console.log(\"ok to view\");\n        resultOkToView = true;\n\n    } else if ($courseEvalsTable.$data[row].start_date > $courseEvalsTable.$data[row].acce_date) {\n        \n        // hasn't even started yet, so set up is fine\n        resultOkToSetup = true;\n\n    } else {\n\n        if (    $courseEvalsTable.$data[row].x_evals_in == 0 \n             && $courseEvalsTable.$data[row].acce_date <= $courseEvalsTable.$data[row].x_faculty_deadline \n             && $courseEvalsTable.$data[row].x_finalized == \"N\" ) {\n        \n            // No evaluations in, ACCE date < faculty deadline\n            resultOkToSetup = true;\n        } \n\n        if (    $courseEvalsTable.$data[row].x_grades_in == $courseEvalsTable.$data[row].x_size\n             && $courseEvalsTable.$data[row].x_evals_in > 0 \n             && ($courseEvalsTable.$data[row].x_evals_in == $courseEvalsTable.$data[row].x_size || $courseEvalsTable.$data[row].acce_date > courseEvalsTable.$data[row].x_student_deadline) ) {\n\n            // all grades are in AND some evals are in AND (all evals are in or ACCE date is after student deadline)\n            // this means \"update it\" in szrectl to Viewable\n            resultUpdateToViewable = true;\n            resultOkToView = true;\n        } \n\n    }\n}\n\n\nfunction setResultMessage() {\n    if (resultOkToView == true) {\n        console.log(\"setting ok to view\");\n        resultMessage = \"View\";\n    } else if (resultOkToSetup) {\n        resultMessage = \"Setup\";\n    } else {\n        if ($courseEvalsTable.$data[row].x_grades_in < $courseEvalsTable.$data[row].x_size) {\n            resultMessage =  \"GRADES_OUT\";\n        } else if ($courseEvalsTable.$data[row].acce_date <= $courseEvalsTable.$data[row].x_student_deadline) {\n            resultMessage = \"STU_DEADLINE\";\n        } else if ($courseEvalsTable.$data[row].x_evals_in == 0) {\n            resultMessage = \"(no evals in)\";\n        } \n    }\n}",
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
                                          "name": "orderReportButton",
                                          "type": "button",
                                          "label": "Order Report",
                                          "onClick": "//"
                                    }
                              ]
                        }
                  ],
                  "type": "block"
            }
      ],
      "importCSS": "ACCE_FACULTY_CSS",
      "type": "page"
}