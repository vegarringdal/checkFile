select 
		ifnull(tag_contractor, "undefined") as Contractor,
		ifnull(tag_cabletype, 'missing_type') as Cable_type,
		count(*) as Cables,
		ifnull(ROUND(MIN(cast(ifnull(tag_cable_length, 0) as real)) ,3), 0) AS "Min[m]",
		ifnull(ROUND(AVG(cast(ifnull(tag_cable_length, 0) as real)) ,3), 0) AS "Avg[m]",
		ifnull(ROUND(MAX(cast(ifnull(tag_cable_length, 0) as real)) ,3), 0) AS "Max[m]",
		ifnull(sum(cast(tag_cable_length as real)), 0) as "Total[m]"
	from 
		tags as b
	where 
		( tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B')
	GROUP by 
		tag_cabletype,
		tag_contractor