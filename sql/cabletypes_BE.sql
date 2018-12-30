select 
		'BE code A,B' as Query_Info,
		ifnull(tag_cabletype, 'missing_type') || '-cables' as Cable_type,
		sum(cast(tag_cable_length as real)) as Total_meters,
		'NA' as Target
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