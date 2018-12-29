select 
		tag_no,
		tag_from_tag,
		tag_to_tag,
		tag_cabletype,
		tag_discipline,
		tag_eng_code		
	from 
		tags
	where 
		tag_contractor = 'BE' and tag_cabletype is null
	and 
		( tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B');