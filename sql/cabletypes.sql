select 
		ifnull(tag_contractor, "undefined") as Contractor,
		ifnull(tag_cabletype, 'missing_type') as Cable_type,
		ifnull(sum(cast(tag_cable_length as real)), 0) as Total_meters,
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
