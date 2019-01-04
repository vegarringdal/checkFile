select 
    ifnull(tag_contractor, "undefined") as Contractor,
    ifnull(tag_discipline, "undefined") as Discipline,
    ifnull(tag_cabletype, 'missing_type') as Cable_type,
    count(*) as Cables,
    ROUND(AVG(tag_cable_length) ,0) AS "Rounded Avg.",
    ifnull(sum(cast(tag_cable_length as real)), 0) as Total_meters,
    'NA' as Target
from 
    tags
where 
    ( tag_eng_code = 'A' 
    or 
    tag_eng_code = 'B')
GROUP by 
    tag_cabletype,
    tag_contractor,
    tag_discipline
    