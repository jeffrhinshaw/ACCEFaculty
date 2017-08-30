SELECT sirasgn_pidm
     , crse.term_code_key
     , crse.term_desc              "term_description"
     , crse.crn_key                "crn"
     , crse.subj_code
     , crse.crse_number
     , crse.course_id              "course_id"
     , crse.title_long             "course_title"
     , crse.units                  "units"
     , crse.instructors            "instructor_name"
     , crse.course_limit           "course_limit"
     , crse.all_course_size        "course_size"
     , crse.see_also
     , crse.ptrm_code
     , crse.ptrm_desc              "block"
     , crse.schd_code
     , crse.xlst_group
     , coalesce(crse.start_date, ptrm_start_date)  "start_date"
     , coalesce(crse.end_date, ptrm_end_date)      "end_date"
     , (SELECT gtvsdax_reporting_date
        FROM gtvsdax
        WHERE     gtvsdax_internal_code = 'ACCE'
              AND gtvsdax_external_code = 'DATE') "acce_date"
     , (SELECT COUNT (*)
        FROM as_cc_new_courses a
        INNER JOIN sfrstcr b
              ON     sfrstcr_term_code = a.term_code_key
                 AND sfrstcr_crn = a.crn_key
        WHERE (szrectl_view IS NULL or szrectl_view != 'Y')     
              and a.term_code_key = crse.term_code_key
              AND (    a.crn_key = crse.crn_key  
                    OR a.parent_crn = crse.crn_key)
              AND sfrstcr_rsts_code = 'RE'
              AND sfrstcr_grde_code IS NOT NULL) "x_grades_in" 
     , stup.all_course_size  "x_size"
     , stup.evals_in         "x_evals_in"
     , stup.student_deadline "x_student_deadline"
     , stup.faculty_deadline "x_faculty_deadline"
     , szrectl_term_code     "eval_cntl_term"
     , szrectl_view          "eval_cntl_viewable"
--     , case when szrectl_view = 'Y' then ' V'
--            when coalesce(crse.start_date, ptrm_start_date) > zwckacce.f_acce_date then 'S '
--            when x_grades_in = x_size AND (x_evals_in = x_size OR TRUNC (zwckacce.f_acce_date) > x_student_deadline) then 
--       end as "result"
FROM sirasgn
left outer join szrectl CNTL
     on     szrectl_term_code = sirasgn_term_code
        AND szrectl_crn = sirasgn_crn 
        AND szrectl_instr_pidm = sirasgn_pidm
INNER JOIN as_cc_new_courses crse
      ON     term_code_key = sirasgn_term_code
         AND crn_key = sirasgn_crn
left outer join as_cc_eval_setup stup      
     on     stup.term_code_key = sirasgn_term_code
        AND stup.crn_key = sirasgn_crn
        and 'Y' <> coalesce(szrectl_view,'N')   
WHERE sirasgn_term_code >= '201420'
  and  sirasgn_pidm = :in_pidm
--  and sirasgn_term_code = :in_term
--  and sirasgn_crn = :in_crn 
  AND sirasgn_term_code LIKE NVL (twbkwbis.f_getparam (sirasgn_pidm, 'LIMIT_TERM'), '%')
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




SELECT stup.all_course_size  "x_size"
     , stup.student_deadline "x_student_deadline"
     , stup.faculty_deadline "x_faculty_deadline"
FROM as_cc_eval_setup stup      
where stup.term_code_key = :in_term
  AND stup.crn_key = :in_crn
           --AND (szrectl_view IS NULL or szrectl_view != 'Y')
  AND (    stup.instr1_pidm = :in_pidm 
        or stup.instr2_pidm = :in_pidm 
        or stup.instr3_pidm = :in_pidm
        or stup.instr4_pidm = :in_pidm)