select 
	ifnull(tag_contractor, 'undefined') ||'-' || ifnull(tag_cabletype, 'missing_type') as vlookup,
	ifnull(tag_contractor, 'undefined') as Contractor,
	ifnull(tag_cabletype, 'missing_type') as Cable_type,
	'' as 'Comment meeting',
	'' as 'Last Week',
	count(*) as Cables,
	ifnull(sum(cast(tag_cable_length as real)), 0) as 'Total[m]',
	(
		select 
			count(tag_no)
		from 
			tags as c
		where 
			( 
				c.tag_eng_code = 'A' 
				or 
				c.tag_eng_code = 'B'
			)
			and
			(
				ifnull(c.tag_cabletype, 'missing_type') = ifnull(b.tag_cabletype, 'missing_type')
			)
			and 
				ifnull(c.tag_contractor, 'missing_type') = ifnull(b.tag_contractor, 'missing_type')
			and
			(
				c.tag_cable_length is null 
				or 
				c.tag_cable_length = '0'
			))
			as 'Missing length[ea]',
	ifnull(ROUND(MIN(cast(ifnull(tag_cable_length, 0) as real)) ,3), 0) AS 'Min[m]',
	ifnull(ROUND(AVG(cast(ifnull(tag_cable_length, 0) as real)) ,3), 0) AS 'Avg[m]',
	ifnull(ROUND(MAX(cast(ifnull(tag_cable_length, 0) as real)) ,3), 0) AS 'Max[m]'
from 
	tags as b
where 
	( tag_eng_code = 'A' 
	or 
	tag_eng_code = 'B')
GROUP by 
	tag_cabletype,
	tag_contractor