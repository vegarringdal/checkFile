WITH RECURSIVE 
--------------------------
all_tags as(
--------------------------
	select 
		'01. Number of cables- all contractors [ea]' as Status, 
		count(tag_no) as 'No_cables',
		'INFO' as Type,
		ifnull(tag_contractor, 'All') as Contractor,
		'All' as Discipline,
		'Cable Count' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		tags 
),
--------------------------
contractor_tags as(
--------------------------
	select 
		'02. Contractor- ' || ifnull(tag_contractor, 'Contractor undefined'),
		count(tag_no) as No,
		'INFO' as Type,
		'All' as Tag_contractor,
		'All' as Discipline,
		'Contractor Count' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		tags
	GROUP by 
		tag_contractor
),
--------------------------
be_tags as(
--------------------------
	select 
		*
	from 
		tags 
	-- where 
		-- tag_contractor = 'BE'
),
--------------------------
be_tags_sub_Con as(
--------------------------
	select 
		'03. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Eng Code ' || ifnull(tag_eng_code, 'undefined'),
		count(tag_no) as No,
		CASE
		WHEN tag_eng_code = "E" or tag_eng_code = "C" or tag_contractor is null THEN "ERRORS"
  		ELSE "INFO"
  		END,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		'All' as Discipline,
		'Eng Code Count' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags
	GROUP by 
		tag_contractor,
		tag_eng_code
),
--------------------------
be_tags_sub_ABC as(
--------------------------
	select 
		*
	from 
		be_tags
	where 
		tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B' 
		or 
		tag_eng_code = 'C'
),
--------------------------
be_tags_sub_AB as(
--------------------------
	select 
		*
	from 
		be_tags
	where 
		tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B'
),
--------------------------
be_tags_sub_Dis as(
--------------------------
	select 
		'04. '|| ifnull(tag_contractor, 'Contractor undefined') || '- Eng Code: A, B - - Disc: ' || ifnull(tag_discipline, 'undefined'),
		count(tag_no) as No,
		CASE 
		WHEN (tag_discipline != "E" and tag_discipline != "I" and tag_discipline != "T") or tag_contractor is null or tag_discipline is null THEN "ERRORS"
  		ELSE "INFO"
  		END,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Disiplin Count' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	GROUP by 
		tag_contractor,
		tag_discipline
),

--------------------------
be_tags_from_tag as(
--------------------------
	select 
		'05. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - From tag missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'From tag missing - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_from_tag is null
	GROUP by 
		tag_contractor,
		tag_discipline
),
--------------------------
be_tags_to_tag as(
--------------------------
	select 
		'06. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - To tag missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'To tag missing  - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_to_tag is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_segreation as(
--------------------------
	select 
		'07. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Segregation missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Segregation missing - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_segregation is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_cable1 as(
--------------------------
	select 
		'08. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cabletype STID missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Cabletype STID missing - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_cabletype is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
-- be_tags_cable2 as(
--------------------------
--	select 
----		'09. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cabletype STID missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
--		count(tag_no),
--		'ERRORS' as target,
--		ifnull(tag_contractor, 'All') as Tag_contractor,
--		ifnull(tag_discipline, 'All') as Discipline,
--		'Cabletype STID missing - Eng Code A, B' as Groups,
--		'' as 'Last Week',
--		'' as 'Comment meeting'
----	from 
--		be_tags_sub_AB
--	where 
--		tag_cabletype is null
--	GROUP by 
--		tag_contractor,
--		tag_discipline
	
--),
--------------------------
be_tags_disiplin1 as(
--------------------------
	select 
		'10. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Discipline missing - Eng Code: A, B',
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Discipline missing - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_discipline is null
	group by 
		tag_contractor
	
),
--------------------------
be_tags_routingstatus as(
--------------------------
	select 
		'13. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cable ' || ifnull(tag_cable_status, 'undefined') || ' - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no) as No,
		CASE 
		WHEN (tag_cable_status != "RE") or tag_contractor is null or tag_cable_status is null THEN "ERRORS"
  		ELSE "INFO"
  		END,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Cable status missing - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	GROUP by 
		tag_contractor,
		tag_discipline,
		tag_cable_status
),
--------------------------
be_tags_contractinstaller as(
--------------------------
	select 
		'16. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Installer ' || ifnull(tag_installer_contractor, 'undefined') || ' - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no) as No,
		CASE 
		WHEN tag_contractor is null or tag_installer_contractor is null THEN "ERRORS"
  		ELSE "INFO"
  		END,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Installer status - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	GROUP by 
		tag_contractor,
		tag_discipline,
		tag_installer_contractor
),
--------------------------
be_tags_PO as(
--------------------------
	select 
		'14. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - PO missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'PO missing  - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		po_no is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_system as(
--------------------------
	select 
		'15. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Tag system missing- Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'ERRORS' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Tag system missing  - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_system is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_length1 as(
--------------------------
	select 
		'11. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cable length missing or 0 meter - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		case 
		when tag_contractor is null OR tag_discipline is null 
		OR tag_cable_length = '0' OR tag_cable_length = 0 or tag_cable_length is null then 'ERRORS'
		else 'INFO'
		end AS TARGET,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Cable length missing - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	where 
		tag_cable_length is null 
	or 
		tag_cable_length = '0'
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_length2 as(
--------------------------
	select 
		'12. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Eng Code: A, B - - Disc.: '|| ifnull(tag_discipline, '?') || ' - Total length [m]',
		sum(ifnull(cast(tag_cable_length as real), 0)),
		case 
		when tag_contractor is null OR tag_discipline is null then 'ERRORS'
		else 'INFO'
		end AS TARGET,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline,
		'Cable length sum - Eng Code A, B' as Groups,
		'' as 'Last Week',
		'' as 'Comment meeting'
	from 
		be_tags_sub_AB
	group by
		tag_contractor,
		tag_discipline

)
--------------------------
select * from all_tags
UNION
select * from contractor_tags
UNION
select * from be_tags_from_tag
UNION
select * from be_tags_to_tag
UNION
select * from be_tags_segreation
UNION
select * from be_tags_cable1
-- UNION
-- select * from be_tags_cable2
UNION
select * from be_tags_disiplin1
UNION
SELECT * from be_tags_sub_Dis
UNION
select * from be_tags_sub_Con
UNION
select * from be_tags_length1
UNION
select * from be_tags_length2
UNION
select * from be_tags_routingstatus
UNION
select * from be_tags_PO
UNION
select * from be_tags_system
UNION
select * from be_tags_contractinstaller;