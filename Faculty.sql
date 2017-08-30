 -- Faculty --
SELECT *
FROM twgrwprm;
--wHERE twgrwprm_pidm = pidm
where twgrwprm_param_name = 'STUFAC_IND'
  and twgrwprm_param_value = 'FAC'
;

----------
-- TERM --
----------
SELECT smbdflt_term_code_advr
FROM smbdflt
WHERE smbdflt_dflt_code = 'WEB';

 ----------------------------------------------------
 -- Faculty Attribute Information  Repeating Table --
 -- Dean, head of dept, etc..                      --
 ----------------------------------------------------
 SELECT a.sirattr_fatt_code
      , b.stvfatt_desc
 FROM sirattr a
 left outer join stvfatt b
      on stvfatt_code = sirattr_fatt_code
 WHERE a.sirattr_pidm = :pidm
   AND a.sirattr_term_code_eff =
       (SELECT MAX (b.sirattr_term_code_eff)
        FROM sirattr b
        WHERE b.sirattr_pidm = a.sirattr_pidm
          AND b.sirattr_term_code_eff <= :gv_term);
          
-- SELECT *
-- FROM STVFATT;          

SELECT szrevac_can_see_pidm
     , fz_format_name (szrevac_can_see_pidm, 'PL')
     , dept_desc
     , stvfatt_desc
FROM szrevac
INNER JOIN as_cc_faculty_data
      ON     pidm_key = szrevac_can_see_pidm
         AND term_code_key = :gv_term
LEFT OUTER JOIN stvfatt
     ON stvfatt_code = szrevac_can_see_fatt
WHERE szrevac_pidm = :pidm
ORDER BY UPPER (full_name_lfmi);