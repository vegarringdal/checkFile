select 
		'Eng code(BE & engcode A,B)' as info,
		ifnull(tag_cabletype, 'XX') || '-cables' as type,
		sum(cast(tag_cable_length as real)) as No,
		'NA' as target
	from 
		tags
	where 
		tag_contractor = 'BE' 
	and 
		( tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B')
	GROUP by 
		tag_cabletype