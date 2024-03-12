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
        setShowListSubcomponents,
        showChangeStatus,
        setShowChangeStatus,
        setStatuseForSubcomponents,
        choicedList,
        changeSubcomponentStatus,
        sortedReverseList,
        insideNumber
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
                <div>
                    {showChangeStatus && (
                        <div>
                            <h3>Ustaw Status</h3>
                            <h4>Nr Wewnętrzny {insideNumber}</h4>
                            {choicedList && choicedList.map(list => (
                                <div key={list.id}>
                                    <div>{list.name}</div>
                                    {list.name === 'Boczek Lewy' || list.name === 'Boczek Prawy' || list.name === 'Srebrna lis. front.' || list.name === 'B. lis. cent.' ? (
                                        <button onClick={(() => changeSubcomponentStatus(list.id, 4))}>Potwierdz Naprawę</button>
                                    ) : (
                                        list.name === 'Szklany Klosz' || list.name === 'Plastikowy Klosz' || list.name === 'Wiązka' || list.name === 'Oświetlenie' ? (
                                            <button onClick={(() => changeSubcomponentStatus(list.id, 5))}>Potwierdz Wymianę</button>
                                        ) : null
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Numer Wewnętrzny</th>
                                <th>Nr ,,GL"</th>
                                <th>Nazwa</th>
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
                            {sortedReverseList && sortedReverseList.map(list => (
                                <tr
                                    key={list.id}
                                    onClick={() => setStatuseForSubcomponents(list.componentSubcomponents, list.insideNumber)}
                                >
                                    <td>{list.insideNumber}</td>
                                    <td>{list.nameOne}</td>
                                    <td>{list.nameTwo === null ? 'BRAK' : list.nameTwo}</td>
                                    {list.componentSubcomponents.map(statuses => (
                                        <React.Fragment key={statuses.id}>
                                            <td>{statuses.status.name}</td>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )
        }
    }
}
export default ListComponent;