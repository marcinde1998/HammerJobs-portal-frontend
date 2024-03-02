export interface IDelivery {
    delivery_id: number,
    delivery_number: number,
    component_type_name: string,
    creation_date: Date,
    last_modified: Date | null,
    status_name: string,
    customer_name: string,
    created_by_username: string,
}

export type TDelivery = IDelivery;