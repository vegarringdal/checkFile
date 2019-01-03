select 
		ifnull(tag_contractor, "undefined") as Tag_contractor,
		ifnull(tag_cabletype, 'missing_type') || '-cables' as Cable_type,
		sum(cast(tag_cable_length as real)) as Total_meters,
		'NA' as Target
	from 
		tags
	where 
		( tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B')
	GROUP by 
		tag_contractor,
		tag_cabletype
