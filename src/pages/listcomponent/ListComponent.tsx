import React, { useState } from 'react';

//Hooks 
import UseListComponent from './UseListComponent'

// @lib
import { listComponentToChoice } from 'lib/data/DataListComponent';
import formatDate from 'utils/dateUtils';

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
        insideNumber,
        selectedRow,
        setSelectedRow,
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
                            <th>Nr Wewnętrzny</th>
                            <th>Nr ,,GL"</th>
                            <th>Nazwa</th>
                            <th>Typ Komponentu</th>
                            <th>Status</th>
                            <th>Nr dostawy</th>
                            <th>Stworzone przez</th>
                            <th>Data Dodania</th>
                            <th>Data Modyfikacji</th>
                            <th>Numer MON OLD</th>
                            <th>Numer MON NEW</th>
                            <th>Rozmiar</th>
                            <th>Data produkcji</th>
                            <th>Magazyn</th>
                            <th>Pozycja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentListChoiced && componentListChoiced.map(list => (
                            <tr
                                key={list.id}
                            >
                                <td>{list.insideNumber}</td>
                                <td>{list.nameOne}</td>
                                <td>{list.nameTwo === null ? 'BRAK' : list.nameTwo}</td>
                                <td>{list.componentType.name}</td>
                                <td>{list.status.name}</td>
                                <td>{list.delivery.number === null ? 'BRAK' : list.delivery.number}</td>
                                <td>{list.createdByUserId}</td>
                                <td>{formatDate(list.creationDate)}</td>
                                <td>{formatDate(list.lastModified)}</td>
                                <td>{list.oldMonNumber === null ? 'BRAK' : list.oldMonNumber}</td>
                                <td>{list.newMonNumber}</td>
                                <td>{list.size}</td>
                                <td>{formatDate(list.productionDate)}</td>
                                <td>{list.warehouse.name}</td>
                                <td>{list.warehousePosition.name}</td>
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
                                    <button onClick={() => changeSubcomponentStatus(list.id, 4)} disabled={list.status.name === 'OK' || list.status.name === 'NAPRAWIONO'}>Potwierdź Naprawę</button>
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
                                <th>Typ Komponentu</th>
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
                            {componentList && componentList.map(list => (
                                <React.Fragment key={list.id}>
                                    <tr
                                        onClick={() => {
                                            setStatuseForSubcomponents(list.componentSubcomponents, list.insideNumber);
                                            setSelectedRow(list.id);
                                        }}
                                    >
                                        <td>{list.insideNumber}</td>
                                        <td>{list.nameOne}</td>
                                        <td>{list.nameTwo === null ? 'BRAK' : list.nameTwo}</td>
                                        <td>{list.componentType.name}</td>
                                        {list.componentSubcomponents.map(statuses => (
                                            <React.Fragment key={statuses.id}>
                                                <td>{statuses.status.name}</td>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                    {list.id === selectedRow && (
                                        <tr>
                                            <td colSpan={4}></td> {/* Puste komórki, aby zachować kolumny */}
                                            <td colSpan={8}>
                                                
                                                    {list.componentSubcomponents.map(subcomponents => (
                                                        <React.Fragment key={subcomponents.id}>
                                                           <span> {subcomponents.name}</span>
                                                            <button onClick={() => changeSubcomponentStatus(subcomponents.id, 4)} disabled={subcomponents.status.name === 'OK' || subcomponents.status.name === 'NAPRAWIONO'}>
                                                                Potwierdź Naprawę
                                                            </button>
                                                        </React.Fragment>
                                                    ))}
                                            
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}
export default ListComponent;