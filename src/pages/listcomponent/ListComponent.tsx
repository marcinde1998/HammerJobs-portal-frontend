import React from 'react';

//Hooks 
import UseListComponent from './UseListComponent'

// @lib
import { listComponentToChoice } from 'lib/data/DataListComponent';

function ListComponent() {
    const {
        componentList,
        listChoice,
        setListChoice,
        choiceClicked,
        componentListChoiced,
        showListDetails,
        showListSubcomponents,
        setShowListDetails,
        setShowListSubcomponents
    } = UseListComponent();

    if (listChoice === null) {
        return (
            <div>
                <h2>Wybierz typ materiału</h2>
                <ul>
                    {listComponentToChoice.map((list, index) => (
                        <button
                            key={index}
                            onClick={() => choiceClicked(list)}
                        >
                            {list.choice}
                        </button>
                    ))}
                </ul>
            </div>
        )
    } else if (listChoice.choice !== null) {
        console.log(listChoice);
        console.log(showListDetails);
        if (showListDetails === false && showListSubcomponents === false) {
            if (listChoice.subcomponents === true) {
                return (
                    <div>
                        <h2>Wybierz co chcesz wyświetlić</h2>
                        <button onClick={() => setShowListDetails(true)}>Lista szczegółowa</button>
                        <button onClick={() => setShowListSubcomponents(true)}>Lista podkomponentów</button>
                    </div>
                )
            } else setShowListDetails(true);
        } else if (showListDetails === true) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nr ,,GL"</th>
                            <th>Nazwa</th>
                            <th>Typ Komponentu</th>
                            <th>Status</th>
                            <th>Nr dostawy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentListChoiced && componentListChoiced.map(list => (
                            <tr
                                key={list.id}
                            >
                                <td>{list.id}</td>
                                <td>{list.nameOne}</td>
                                <td>{list.nameTwo === null ? 'BRAK' : list.nameTwo}</td>
                                <td>{list.componentType.name}</td>
                                <td>{list.status.name}</td>
                                <td>{list.delivery.number === null ? 'BRAK' : list.delivery.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        } else if (showListSubcomponents === true) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>componentName_1</th>
                            <th>componentName_2</th>
                            <th>Boczek lewy</th>
                            <th>Boczek prawy</th>
                            <th>Srebrna lis. front.</th>
                            <th>Szklany klosz</th>
                            <th>Plastikowy klosz</th>
                            <th>Wiązka</th>
                            <th>Oświetlenie</th>
                            <th>B. lis. cent.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentListChoiced && componentListChoiced.map(list => (
                            <tr
                                key={list.id}
                            >
                                <td>{list.id}</td>
                                <td>{list.nameOne}</td>
                                <td>{list.nameTwo === null ? 'BRAK' : list.nameTwo}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                                <td>{list.componentSubcomponents[0].status.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    }
}
export default ListComponent;