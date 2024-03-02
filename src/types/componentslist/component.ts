

export interface IComponent {
    component_id: number,
    component_type_name: string,
    delivery_id: number,
    creation_date: Date,
    last_modified: Date | null,
    created_by_username: string,
    modified_by_username: string,
    subcomponents_status: any[],
}

export type TComponent = IComponent;