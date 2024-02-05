import React from 'react';

//@Styles
import './styles.module.scss';

//@components
import DeliveryListComponent from './insidecomponent/DeliveryListComponent';

function ListOrder(props: any) {
    return (
        <DeliveryListComponent />
    )
}
export default ListOrder;