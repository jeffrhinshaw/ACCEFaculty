SELECT :in_pidm                    "INST_PIDM"
     , crse.term_code_key
     , crse.term_desc              
     , crse.crn_key                "CRN"
     , crse.subj_code
     , crse.crse_number
     , crse.course_id              
     , crse.title_long             "COURSE_TITLE"
     , crse.units                  
     , crse.instructors            "INSTRUCTOR_NAME"
     , crse.course_limit           
     , crse.all_course_size        "COURSE_SIZE"
     , crse.see_also
     , crse.ptrm_code
     , crse.ptrm_desc              "BLOCK"
     , crse.schd_code
     , crse.xlst_group
     , NVL (crse.start_date, ptrm_start_date)  "START_DATE"
     , NVL (crse.end_date, ptrm_end_date)      "END_DATE"
     , zwckacce.f_acce_date "ACCE_DATE"
     , (SELECT COUNT (*)
        FROM as_cc_new_courses a
        INNER JOIN sfrstcr b
              ON     sfrstcr_term_code = a.term_code_key
                 AND sfrstcr_crn = a.crn_key
        WHERE (CNTL.szrectl_view IS NULL or CNTL.szrectl_view != 'Y')     
              and a.term_code_key = crse.term_code_key
              AND (    a.crn_key = crse.crn_key  
                    OR a.parent_crn = crse.crn_key)
              AND sfrstcr_rsts_code = 'RE'
              AND sfrstcr_grde_code IS NOT NULL) "X_GRADES_IN" 
     , stup.all_course_size  "X_SIZE"
     , stup.evals_in         "X_EVALS_IN"
     , stup.student_deadline "X_STUDENT_DEADLINE"
     , stup.faculty_deadline "X_FACULTY_DEADLINE"
     , case when szrectl_term_code is not null then 'Y'
            else 'N'
       end as "X_FINALIZED"
     , szrectl_view          "EVAL_CNTL_VIEWABLE"
FROM (SELECT sirasgn_term_code term
           , sirasgn_crn crn
      FROM sirasgn
      WHERE sirasgn_pidm = :in_pidm
        AND sirasgn_term_code >= '201420'
        AND sirasgn_term_code LIKE NVL (twbkwbis.f_getparam (:in_pidm, 'LIMIT_TERM'), '%')) v
INNER JOIN as_cc_new_courses crse
      ON term_code_key = term AND crn_key = crn
left outer join szrectl CNTL
     on     szrectl_term_code = term_code_key
        AND szrectl_crn = crn_key
        AND szrectl_instr_pidm = :in_pidm
left outer join as_cc_eval_setup stup      
     on     stup.term_code_key = crse.term_code_key
        AND stup.crn_key = crse.crn_key
        AND coalesce(CNTL.szrectl_view, 'N') <> 'Y'
WHERE crse.term_code_key >= '201420'
  AND crse.parent_crn IS NULL
  AND crse.crse_number NOT LIKE '%.1'
  AND crse.all_course_size > 0
  AND (   crse.term_code_key >= '201510'      -- this is the new rules
        OR (crse.schd_code = '1' AND crse.units >= 1) -- this is the old rules
        OR (crse.subj_code = 'PY' AND crse.schd_code = 3)
        OR (crse.term_code_key = '201420' AND crse.crn_key = 21031) -- special outside rules
        OR (crse.term_code_key LIKE '%30' AND crse.units = .5))
ORDER BY term_code_key
       , ptrm_end_date
       , xlst_group
       , schd_code
       , crse.course_id
;       


SELECT gtvsdax_reporting_date
FROM gtvsdax
WHERE     gtvsdax_internal_code = 'ACCE'
      AND gtvsdax_external_code = 'DATE'
;

select zwckacce.f_acce_date
from dual;             
       