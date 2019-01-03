WITH RECURSIVE 
--------------------------
all_tags as(
--------------------------
	select 
		'01. Number of cables- all contractors [ea]' as Status, 
		count(tag_no) as 'No_cables',
		'NA' as Target,
		ifnull(tag_contractor, 'All') as Contractor,
		'Discipline' as Discipline
	from 
		tags 
),
--------------------------
contractor_tags as(
--------------------------
	select 
		'02. Contractor- ' || ifnull(tag_contractor, 'Contractor undefined'),
		count(tag_no) as No,
		CASE (tag_contractor)
		WHEN "BE" THEN "NA"
		WHEN "PC" THEN "NA"
		WHEN "AP" THEN "NA"
		WHEN "SIB" THEN "NA"
  		ELSE "0"
  		END,
		'All' as Tag_contractor,
		'All' as Discipline
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
		WHEN tag_eng_code = "E" or tag_contractor is null THEN "0"
  		ELSE "NA"
  		END,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		'All' as Discipline
	from 
		be_tags
	GROUP by 
		tag_contractor,
		tag_eng_code
),
--------------------------
be_tags_sub_Dis as(
--------------------------
	select 
		'04. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Discipline ' || ifnull(tag_discipline, 'undefined'),
		count(tag_no) as No,
		CASE 
		WHEN (tag_discipline != "E" and tag_discipline != "I" and tag_discipline != "T") or tag_contractor is null or tag_discipline is null THEN "0"
  		ELSE "NA"
  		END,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags
	GROUP by 
		tag_contractor,
		tag_discipline
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
be_tags_from_tag as(
--------------------------
	select 
		'05. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - From tag missing - Eng Code: A, B, C - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_ABC
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
		'06. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - To tag missing - Eng Code: A, B, C - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_ABC
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
		'07. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Segregation missing - Eng Code: A, B, C - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_ABC
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
		'08. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cabletype STID missing - Eng Code: A, B, C - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_ABC
	where 
		tag_cabletype is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_cable2 as(
--------------------------
	select 
		'09. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cabletype STID missing - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_AB
	where 
		tag_cabletype is null
	GROUP by 
		tag_contractor,
		tag_discipline
	
),
--------------------------
be_tags_disiplin1 as(
--------------------------
	select 
		'10. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Discipline missing - Eng Code: A, B, C',
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_ABC
	where 
		tag_discipline is null
	group by 
		tag_contractor
	
),
--------------------------
be_tags_length1 as(
--------------------------
	select 
		'11. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Cable length missing or 0 meter - Eng Code: A, B - Disc.: '|| ifnull(tag_discipline, '?'),
		count(tag_no),
		'0' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
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
		'12. '|| ifnull(tag_contractor, 'Contractor undefined') || ' - Eng Code: A, B - Total length [m]',
		sum(cast(tag_cable_length as real)),
		'NA' as target,
		ifnull(tag_contractor, 'All') as Tag_contractor,
		ifnull(tag_discipline, 'All') as Discipline
	from 
		be_tags_sub_AB
	group by
		tag_contractor

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
UNION
select * from be_tags_cable2
UNION
select * from be_tags_disiplin1
UNION
SELECT * from be_tags_sub_Dis
UNION
select * from be_tags_sub_Con
UNION
select * from be_tags_length1
UNION
select * from be_tags_length2;
