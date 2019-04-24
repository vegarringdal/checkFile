WITH RECURSIVE 
--------------------------
not_d_tags as (
select
    tag_no as Tag_no,
    CASE
    when 
        (tag_cabletype is null
        or
        tag_from_tag is null
        or
        tag_cable_status is null
        or
        tag_to_tag is null
        or
        tag_segregation is null
        or
        tag_discipline is null
        or
        tag_eng_code is null
        or
        tag_eng_code = 'E'
        or
        tag_contractor is null
        or (
            (tag_cable_length is null or tag_cable_length = '0')
            and
            (tag_eng_code = 'A' or tag_eng_code = 'B')
        )
        or (
            Tag_discipline != 'E' 
            and 
            Tag_discipline != 'I' 
            and 
            Tag_discipline != 'T'
            )
        ) then 'YES'
        else 'NO'
        end as Errors,
    CASE
    when Tag_cable_status is null then '[todo]'
    WHEN (Tag_cable_status != 'RO' and Tag_cable_status != 'RE') THEN Tag_cable_status||'-[todo]'
    end as Tag_cable_status,
    ifnull(tag_from_tag, '[todo]') as Tag_from_tag,
    ifnull(tag_to_tag, '[todo]') as Tag_to_tag,
    ifnull(tag_cabletype, '[todo]') as Tag_cabletype,
    ifnull(tag_segregation, '[todo]') as Tag_segregation,
    CASE 
        when Tag_discipline  is null then '[todo]'
		WHEN (Tag_discipline != 'E' and Tag_discipline != 'I' and Tag_discipline != 'T') THEN Tag_discipline||'-[todo]'
  		ELSE Tag_discipline
  		END as Tag_discipline,
    CASE (tag_eng_code)
		WHEN "E" THEN "E-[todo]"
  		ELSE tag_eng_code
  		END as Tag_eng_code,
    ifnull(tag_contractor, '[todo]') as Tag_contractor,
    CASE 
        when tag_cable_length  is null and (tag_eng_code = 'A' or tag_eng_code = 'B') then '[todo]'
		WHEN (tag_cable_length = "0" and (tag_eng_code = 'A' or tag_eng_code = 'B')) THEN '0-[todo]'
  		ELSE tag_cable_length
  	    END as Tag_cable_length,
    CASE
    when tag_installer_contractor is null then '[todo]'
    end as Tag_installer_contractor,
    ifnull(tag_status, '') as Tag_status,
    ifnull(tag_description, '') as Tag_description,
    ifnull(tag_remark, '') as Tag_remark,
    ifnull(po_no, '[todo]') as Po_no,
    ifnull(tag_system, '[todo]') as Tag_system,
    ifnull(tag_system_description, '[todo]') as Tag_system_description
from
    tags
where
        tag_eng_code <> 'D' and tag_no is not null
),
--------------------------
d_tags as (
select
    tag_no as Tag_no,
    'NO' as Errors,
    case
    when tag_cable_status is null then '[TBA]'
    WHEN (tag_cable_status != 'RO' and tag_cable_status != 'RE') THEN tag_cable_status||'-[TBA]'
    end as Tag_cable_status,
    ifnull(tag_from_tag, '[TBA]') as Tag_from_tag,
    ifnull(tag_to_tag, '[TBA]') as Tag_to_tag,
    ifnull(tag_cabletype, '[TBA]') as Tag_cabletype,
    ifnull(tag_segregation, '[TBA]') as Tag_segregation,
    CASE 
        when Tag_discipline  is null then '[TBA]'
		WHEN (Tag_discipline != 'E' and Tag_discipline != 'I' and Tag_discipline != 'T') THEN Tag_discipline||'-[TBA]'
  		ELSE Tag_discipline
  		END as Tag_discipline,
    CASE (tag_eng_code)
		WHEN "E" THEN "E-[TBA]"
  		ELSE tag_eng_code
  		END as Tag_eng_code,
    ifnull(tag_contractor, 'ALL') as Tag_contractor,
    CASE 
        when tag_cable_length  is null then '[TBA]'
		WHEN (tag_cable_length = "0" and (tag_eng_code = 'A' or tag_eng_code = 'B')) THEN '0-[TBA]'
  		ELSE tag_cable_length
  	    END as Tag_cable_length,
    CASE
    when tag_installer_contractor is null then '[TBA]'
    end as Tag_installer_contractor,
    ifnull(tag_status, '') as Tag_status,
    ifnull(tag_description, '') as Tag_description,
    ifnull(tag_remark, '') as Tag_remark,
    ifnull(po_no, '') as Po_no,
    ifnull(tag_system, '') as Tag_system,
    ifnull(tag_system_description, '') as Tag_system_description
from
    tags
where
        tag_eng_code = 'D' and tag_no is not null
),
--------------------------
null_tags as (
select
    tag_no as Tag_no,
    'TJA' as Errors,
    ifnull(tag_cable_status, '[TBA]') as Tag_cable_status,
    ifnull(tag_from_tag, '[TBA]') as Tag_from_tag,
    ifnull(tag_to_tag, '[TBA]') as Tag_to_tag,
    ifnull(tag_cabletype, '[TBA]') as Tag_cabletype,
    ifnull(tag_segregation, '[TBA]') as Tag_segregation,
    CASE 
        when Tag_discipline  is null then '[TBA]'
		WHEN (Tag_discipline != 'E' and Tag_discipline != 'I' and Tag_discipline != 'T') THEN Tag_discipline||'-[TBA]'
  		ELSE Tag_discipline
  		END as Tag_discipline,
    ifnull(tag_eng_code, '[TODO]') as Tag_eng_code,
    ifnull(tag_contractor, 'ALL') as Tag_contractor,
    CASE 
        when tag_cable_length  is null then '[TBA]'
		WHEN (tag_cable_length = "0" and (tag_eng_code = 'A' or tag_eng_code = 'B')) THEN '0-[TBA]'
  		ELSE tag_cable_length
  	    END as Tag_cable_length,
    ifnull(tag_installer_contractor, '') as Tag_installer_contractor, 
    ifnull(tag_status, '') as Tag_status,
    ifnull(tag_description, '') as Tag_description,
    ifnull(tag_remark, '') as Tag_remark,
    ifnull(po_no, '') as Po_no,
    ifnull(tag_system, '') as Tag_system,
    ifnull(tag_system_description, '') as Tag_system_description
from
    tags
where
        tag_eng_code is null
        and tag_no is not null
)

select * from not_d_tags
union
select * from null_tags
union
select * from d_tags