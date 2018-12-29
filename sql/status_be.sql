WITH RECURSIVE 
--------------------------
all_tags as(
--------------------------
	select 
		'01 Sum all cables' as Status, 
		count(tag_no) as 'Sum cables',
		'NA' as target
	from 
		tags 
),
--------------------------
contractor_tags as(
--------------------------
	select 
		'02-Contractor- ' || ifnull(tag_contractor, 'XX') || '-cables',
		count(tag_no) as No,
		CASE (tag_contractor)
		WHEN "BE" THEN "NA"
		WHEN "PC" THEN "NA"
		WHEN "AP" THEN "NA"
		WHEN "SIB" THEN "NA"
  		ELSE "0"
  		END
	from 
		tags
	GROUP by 
		tag_contractor
),
--------------------------
be_tags_sub_Con as(
--------------------------
	select 
		'03.-Eng code(BE)- ' || ifnull(tag_eng_code, 'XX') || '-cables',
		count(tag_no) as No,
		CASE 
			(tag_eng_code)
		WHEN "E" THEN "0"
  		ELSE "NA"
  		END
	from 
		tags
	where 
		tag_contractor = 'BE'
	GROUP by 
		tag_eng_code
),
--------------------------
be_tags_sub_ABC as(
--------------------------
	select 
		*
	from 
		tags
	where 
		tag_contractor = 'BE' 
	and 
		( tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B' 
		or 
		tag_eng_code = 'C')
),
--------------------------
be_tags_sub_AB as(
--------------------------
	select 
		*
	from 
		tags
	where 
		tag_contractor = 'BE' 
	and 
		( tag_eng_code = 'A' 
		or 
		tag_eng_code = 'B')
),
--------------------------
be_tags_from_tag as(
--------------------------
	select 
		'04 BE (A, B, C) missing - "from tag"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_from_tag is null
),
--------------------------
be_tags_to_tag as(
--------------------------
	select 
		'05 BE (A, B, C) missing - "to tag"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_to_tag is null
	
),
--------------------------
be_tags_segreation as(
--------------------------
	select 
		'06 BE (A, B, C) missing - "segregation"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_segregation is null
	
),
--------------------------
be_tags_cable1 as(
--------------------------
	select 
		'07 BE (A, B, C) missing - "cabletype STID"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_cabletype is null
	
),
--------------------------
be_tags_cable2 as(
--------------------------
	select 
		'08 BE (A, B) missing - "cabletype STID"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_AB
	where 
		tag_cabletype is null
	
),
--------------------------
be_tags_disiplin1 as(
--------------------------
	select 
		'09 BE (A, B, C) missing - "disciplin"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_discipline is null
	
),
--------------------------
be_tags_length1 as(
--------------------------
	select 
		'10 BE (A, B) missing - "length or is 0"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_AB
	where 
		tag_cable_length is null 
	or 
		tag_cable_length = '0'
	
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
select * from be_tags_sub_Con
UNION
select * from be_tags_length1;