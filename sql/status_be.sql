WITH RECURSIVE 
--------------------------
all_tags as(
--------------------------
	select 
		'01. Sum all cables' as Status, 
		count(tag_no) as 'No_cables',
		'NA' as Target
	from 
		tags 
),
--------------------------
contractor_tags as(
--------------------------
	select 
		'02. Contractor- ' || ifnull(tag_contractor, 'XX') || '-cables',
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
be_tags as(
--------------------------
	select 
		*
	from 
		tags 
	where 
		tag_contractor = 'BE'
),
--------------------------
be_tags_sub_Con as(
--------------------------
	select 
		'03. Eng code(BE)- ' || ifnull(tag_eng_code, 'XX') || '-cables',
		count(tag_no) as No,
		CASE 
			(tag_eng_code)
		WHEN "E" THEN "0"
  		ELSE "NA"
  		END
	from 
		be_tags
	GROUP by 
		tag_eng_code
),
--------------------------
be_tags_sub_Dis as(
--------------------------
	select 
		'04. Discipline(BE)- ' || ifnull(tag_discipline, 'XX'),
		count(tag_no) as No,
		CASE 
		WHEN (tag_discipline != "E" and tag_discipline != "I" and tag_discipline != "T") THEN "0"
  		ELSE "NA"
  		END
	from 
		be_tags
	GROUP by 
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
		'05. BE (EngCode: A, B, C)-(Discipline: '|| ifnull(tag_discipline, '?')||') missing - "from tag"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_from_tag is null
	GROUP by 
		tag_discipline
),
--------------------------
be_tags_to_tag as(
--------------------------
	select 
		'06. BE (EngCode: A, B, C)-(Discipline: '|| ifnull(tag_discipline, '?')||') missing - "to tag"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_to_tag is null
	GROUP by 
		tag_discipline
	
),
--------------------------
be_tags_segreation as(
--------------------------
	select 
		'07. BE (EngCode: A, B, C)-(Discipline: '|| ifnull(tag_discipline, '?')||') missing - "segregation"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_segregation is null
	GROUP by 
		tag_discipline
	
),
--------------------------
be_tags_cable1 as(
--------------------------
	select 
		'08. BE (EngCode: A, B, C)-(Discipline: '|| ifnull(tag_discipline, '?')||') missing - "cabletype STID"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_ABC
	where 
		tag_cabletype is null
	GROUP by 
		tag_discipline
	
),
--------------------------
be_tags_cable2 as(
--------------------------
	select 
		'09. BE (EngCode: A, B)-(Discipline: '|| ifnull(tag_discipline, '?')||') missing - "cabletype STID"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_AB
	where 
		tag_cabletype is null
	GROUP by 
		tag_discipline
	
),
--------------------------
be_tags_disiplin1 as(
--------------------------
	select 
		'10. BE (EngCode: A, B, C) missing - "disciplin"',
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
		'11. BE (EngCode: A, B)-(Discipline: '|| ifnull(tag_discipline, '?')||') missing - "length or is 0"',
		count(tag_no),
		'0' as target
	from 
		be_tags_sub_AB
	where 
		tag_cable_length is null 
	or 
		tag_cable_length = '0'
	GROUP by 
		tag_discipline
	
),
--------------------------
be_tags_length2 as(
--------------------------
	select 
		'12. BE (A, B) - Total length',
		sum(cast(tag_cable_length as real)),
		'NA' as target
	from 
		be_tags_sub_AB

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
