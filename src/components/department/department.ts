import AppService from '../../services/appService';
import appPage from '../../services/appPage';

const path = 'department';
const app = Object.assign({}, appPage);

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
export const actionColumn: IColumn = {
    label: 'Edit', 
    field: 'field',
    component: 'action',
    className: 'secondary',
} 
columndata.push(actionColumn);

const initialData = {
    list: [],
    showModal: false,
    selectedItem: null,
    path,              
    fielddata,
    columndata,
};

const department = {
    oncreate (p) {
        actionColumn.action = (row) => p.editDepartment(row);
        p.getList();
        // app.oncreate(p, this);
        // actionColumn.action = (row) => p.edit(p, row);
        // p.getList();    
    },
}

export { initialData, department }