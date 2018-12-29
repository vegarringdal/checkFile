select
    tag_no,
    ifnull(tag_from_tag, '???') as tag_from_tag,
    ifnull(tag_to_tag, '???') as tag_to_tag,
    ifnull(tag_cabletype, '???') as tag_cabletype,
    ifnull(tag_segregation, '???') as tag_segregation,
    ifnull(tag_discipline, '???') as tag_discipline,
    ifnull(tag_eng_code, '???') as tag_eng_code,
    ifnull(tag_contractor, '???') as tag_contractor,
    ifnull(tag_cable_length, '???') as tag_cable_length,
    ifnull(tag_description, '') as tag_description,
    ifnull(tag_remark, '') as tag_remark
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