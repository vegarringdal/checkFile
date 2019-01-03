/* 
-- not in use
select 
		tag_no as Tag_no,
		tag_from_tag as Tag_from_tag,
		tag_to_tag as Tag_to_tag,
		tag_cabletype as Tag_cabletype,
		tag_discipline as Tag_discipline,
		tag_eng_code as Tag_eng_code,
		ifnull(tag_contractor, 'undefined') as Tag_contractor
	from 
		tags
	where 
		tag_cabletype is null
	and ( 
		tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B'
		);
 */