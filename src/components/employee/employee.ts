import AppService from '../../services/appService';

const path = 'employee';
const title = 'Employees';

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
    label: 'Title',
    field: 'title',
    component: 'text',
    required: true,
    row: 2,
    col: 'md-6'
}, {
    label: 'Department',
    field: 'departmentId',
    component: 'select',
    row: 3,
    col: 'md-6'
}, {
    label: 'Rate',
    field: 'rate',
    component: 'currency',
    required: true,
    row: 4,
    col: 'md-6'
}];

export const columndata: IColumn[] = fielddata.map(x => Object.assign({}, x));
export const actionColumn: IColumn = {
    label: 'Edit', 
    field: 'field',
    component: 'action',
    className: 'secondary',
};
columndata.push(actionColumn);

const initialData = {
    list: [],
    showModal: false,
    selectedItem: null,
    path, 
    title,             
    fielddata,
    columndata,
};

const departmentField = fielddata.find(x => x.field == 'departmentId');
const departmentColumn = columndata.find(x => x.field == 'departmentId');
departmentColumn.component = '';

const employee = {
    oncreate (p) {          
        actionColumn.action = (row) => p.edit(row);
        p.getList();           
    },
    
    getList(this: IAppPage) {
        AppService.getList('department').then((depts: any[]) =>{
            this.set({ departmentList: depts });
            departmentField.optionList = depts;
            departmentColumn.field = (data) => {
                const { departmentList } = this.get();
                const found = departmentList.find(x => x.id == data.departmentId);
                return found ? found.name : '';
            }
            AppService.getList(path).then(data => {
                this.set({ list: data });
            });
        });
    },
}
export { initialData, employee }