------------------------
-- Faculty Attributes --
------------------------
SELECT a.sirattr_fatt_code "code"
     , fatt.stvfatt_desc   "description"
FROM sirattr a
inner join smbdflt -- smbdflt_term_code_advr has current term
      on smbdflt_dflt_code = 'WEB'
inner join stvfatt fatt
      on fatt.stvfatt_code = a.SIRATTR_FATT_CODE
WHERE a.sirattr_pidm = :in_pidm
  AND a.sirattr_term_code_eff =
          ( SELECT MAX (b.sirattr_term_code_eff)
            FROM sirattr b
            WHERE     b.sirattr_pidm = :in_pidm
                  AND b.sirattr_term_code_eff <= smbdflt_term_code_advr)
;
--select *
--from sirattr
--where sirattr_fatt_code = 'DECO';

------------------------------
-- faculty the pidm can see --
------------------------------
select can_see_name
     , can_see_pidm
     , can_see_department
     , can_see_desc
     , ( SELECT SUM (szrectl_counter - 1) 
         FROM szrectl 
         WHERE szrectl_instr_pidm = can_see_pidm
           AND szrectl_counter < 100
           AND szrectl_view = 'Y' ) AS "EVALS_AVAILABLE"
from 
( select 'Your Courses'    can_see_name
     , to_number(:in_pidm) can_see_pidm
     , ''                  can_see_department 
     , ''                  can_see_desc
     , '000'               sequence
from dual
union     
SELECT fz_format_name (szrevac_can_see_pidm, 'PL') can_see_name
     , szrevac_can_see_pidm                        can_see_pidm
     , dept_desc                                   can_see_department
     , stvfatt_desc                                can_see_desc
     , full_name_lfmi                              sequence
FROM szrevac
INNER JOIN as_cc_faculty_data
      ON     pidm_key = szrevac_can_see_pidm
         AND term_code_key = (SELECT twgrwprm_param_value
                              FROM twgrwprm
                              WHERE twgrwprm_pidm = :in_pidm                             
                                AND twgrwprm_param_name = 'TERM')
LEFT OUTER JOIN stvfatt
     ON stvfatt_code = szrevac_can_see_fatt
WHERE szrevac_pidm = :in_pidm) a
ORDER by sequence
;








-----------------------
-- faculty dean sees --
-----------------------
SELECT DISTINCT
       sirasgn_pidm INST_PIDM
     , fz_format_name (sirasgn_pidm, 'LP') || ' (' || dept_desc || ')' FULL_NAME_DEPT                           
FROM szrectl
inner join smbdflt -- smbdflt_term_code_advr has current term
      on smbdflt_dflt_code = 'WEB'
INNER JOIN sirasgn
      ON     sirasgn_term_code = szrectl_term_code
         AND sirasgn_crn = szrectl_crn
INNER JOIN as_cc_faculty_data
      ON      pidm_key = sirasgn_pidm 
         AND term_code_key = smbdflt_term_code_advr
WHERE szrectl_term_code like :in_limit_term
  AND szrectl_view = 'Y'
ORDER BY UPPER(FULL_NAME_DEPT)