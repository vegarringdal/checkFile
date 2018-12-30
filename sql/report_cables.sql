select
    tag_no as Tag_no,
    ifnull(tag_from_tag, '[todo]') as Tag_from_tag,
    ifnull(tag_to_tag, '[todo]') as Tag_to_tag,
    ifnull(tag_cabletype, '[todo]') as Tag_cabletype,
    ifnull(tag_segregation, '[todo]') as Tag_segregation,
    ifnull(tag_discipline, '[todo]') as Tag_discipline,
        CASE (tag_eng_code)
		WHEN "E" THEN "E-[todo]"
  		ELSE tag_eng_code
  		END as Tag_eng_code,
    ifnull(tag_contractor, '[todo]') as Tag_contractor,
        CASE 
        when tag_cable_length  is null then '[todo]'
		WHEN (tag_cable_length = "0" and (tag_eng_code = 'A' or tag_eng_code = 'B')) THEN '0-[todo]'
  		ELSE tag_cable_length
  		END as Tag_cable_length,
    ifnull(tag_description, '') as Tag_description,
    ifnull(tag_remark, '') as Tag_remark
from
    tags
where
    tag_contractor = 'BE'
    and
        tag_eng_code <> 'D'
    and (
        tag_cabletype is null
        or
        tag_from_tag is null
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
    )