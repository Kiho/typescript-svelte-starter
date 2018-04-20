const path = 'department';

export const fielddata: IField[] = [
{
    label: 'ID', 
    field: 'id',
    component: 'text',
    readOnly: true,
    row: 0,
    col: 'md-6'
}, {
    label: 'Name',
    field: 'name',
    component: 'text',
    required: true,
    row: 1,
    col: 'md-6'
}, {
    label: 'Group Name',
    field: 'groupName',
    component: 'text',
    row: 2,
    col: 'md-6'
}];

export const columndata: IColumn[] = fielddata.map(x => Object.assign({}, x));

columndata.push({
    label: 'Edit', 
    field: 'field',
    component: 'action',
    className: 'secondary',
});

const initialData = {
    list: [],
    showModal: false,
    selectedItem: null,
    path,              
    fielddata,
    columndata,
};

export { initialData }