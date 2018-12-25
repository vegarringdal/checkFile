


export enum fileColumns {
    project_name = 'Project.Name',
    tag_status = 'Tag.Status',
    tag_no = 'Tag.No',
    tag_discipline = 'Tag.Discipline',
    tag_from_tag = 'Tag.From tag number',
    tag_to_tag = 'Tag.To tag number',
    tag_cabletype = 'Tag.Cable Spesification STID',
    tag_segregation = 'Tag.Segregation level',
    tag_cable_length = 'Tag.Cable length estimated',
    tag_description = 'Tag.Description',
    tag_remark = 'Tag.Remark',
    tag_eng_code = 'Tag.Engineering code',
    tag_contractor = 'Tag.Contractor',
    tag_installer_contractor = 'Tag.Contractor installation'
}


export enum dbColumns {
    project_name = 'project_name',
    tag_status = 'tag_status',
    tag_no = 'tag_no',
    tag_discipline = 'tag_discipline',
    tag_from_tag = 'tag_from_tag',
    tag_to_tag = 'tag_to_tag',
    tag_cabletype = 'tag_cabletype',
    tag_segregation = 'tag_segregation',
    tag_cable_length = 'tag_cable_length',
    tag_description = 'tag_description',
    tag_remark = 'tag_remark',
    tag_eng_code = 'tag_eng_code',
    tag_contractor = 'tag_contractor',
    tag_installer_contractor = 'tag_installer_contractor'
}



export const columnSetup = [
    {
        file: fileColumns.project_name,
        db: dbColumns.project_name,
        rowColumn: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_status,
        db: dbColumns.tag_status,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_no,
        db: dbColumns.tag_no,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_discipline,
        db: dbColumns.tag_discipline,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_from_tag,
        db: dbColumns.tag_from_tag,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_to_tag,
        db: dbColumns.tag_to_tag,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_cabletype,
        db: dbColumns.tag_cabletype,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_segregation,
        db: dbColumns.tag_segregation,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_cable_length,
        db: dbColumns.tag_cable_length,
        colno: -1,
        dbColType: 'number'
    },
    {
        file: fileColumns.tag_description,
        db: dbColumns.tag_description,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_remark,
        db: dbColumns.tag_remark,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_eng_code,
        db: dbColumns.tag_eng_code,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_contractor,
        db: dbColumns.tag_contractor,
        colno: -1,
        dbColType: 'text'
    },
    {
        file: fileColumns.tag_installer_contractor,
        db: dbColumns.tag_installer_contractor,
        colno: -1,
        dbColType: 'text'
    }
];
