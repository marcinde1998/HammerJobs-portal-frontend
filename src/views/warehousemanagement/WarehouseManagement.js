import { useEffect } from "react";
import React from 'react';

// @styles
import styles from './styles.module.scss';

//Hooks
import UseWarehouseManagement from "./UseWarehouseManagement";

function WarehouseManagement(props) {
    const {
        // Pobieranie pozycji magazynowych i listy komponentów
        getPositionList,
        positionList,
        componentList,
        // Obsługa dodawania pozycji magazynowej
        showFormAddPosition,
        openFormAddPosition,
        closeFormAddPosition,
        handleFormAddPositionChange,
        handleSelectAddPositionChange,
        handlePositionAddSubmit,
        // Obsługa zmiany pozycji magazynowej dla komponentów
        showFormChangePosition,
        openFormChangePosition,
        closeFormChangePosition,
        selectedInsideNumber,
        handleTdClick,
        selectedPosition,
        handlePositionChange,
        filterValue,
        handleFilterChange,
        handleChangePositionSubmit,
        //Fotrowanie tabeli
        filteredComponents,
        filters,
        setFilters
    } = UseWarehouseManagement();
    useEffect(() => {
        getPositionList();
    }, []);
    if (props.access === 'administrator' || props.access === 'kierownik' || props.access === 'lider' || props.access === 'pracownik') {
        return (
            <div className={styles.wrapper}>


                <div className={styles.btnBox}>
                    <button
                        onClick={selectedInsideNumber === null ? null : openFormChangePosition}
                        className={selectedInsideNumber === null ? styles.nBtn : styles.btn}
                    >
                        Zmień pozycję magazynową
                    </button>
                    <button
                        onClick={openFormAddPosition}
                        className={styles.btn}
                    >
                        Dodaj pozycję magazynową
                    </button>
                </div>
                {showFormAddPosition && (
                    <div className={styles.formBox}>
                        <form
                            onSubmit={handlePositionAddSubmit}
                            action='http://172.22.126.11:8080/positionAdd/'
                            method="POST"
                        >
                            <input type="text" placeholder="Nazwa komponentu" name="name" onChange={handleFormAddPositionChange} required />
                            <select
                                onChange={(e) => handleSelectAddPositionChange(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="1">Magazyn 1</option>
                                <option value="2">Wysyłka 1</option>
                                <option value="3">Lakiernia 1</option>
                            </select>
                            <input
                                type="submit"
                                value="Dodaj"
                            />
                        </form>
                        <button onClick={closeFormAddPosition}>Zamknij</button>
                    </div>
                )}
                {showFormChangePosition && (
                    <div className={styles.formBox}>
                        {/* Pole tekstowe do filtrowania */}
                        <input
                            type="text"
                            placeholder="Wyszukaj pozycję..."
                            value={filterValue}
                            onChange={handleFilterChange}
                        />

                        {/* Lista rozwijana z filtrem */}
                        <select onChange={handlePositionChange} value={selectedPosition}>
                            <option value="">Wybierz pozycję</option> {/* Opcja domyślna */}

                            {/* Filtrowanie pozycji na podstawie wprowadzonego tekstu */}
                            {positionList && positionList.filter(
                                position => position.name.toLowerCase().includes(filterValue.toLowerCase())
                            ).map(listPosition => (
                                <option key={listPosition.id} value={listPosition.id}>
                                    {listPosition.name}
                                </option>
                            ))}
                        </select>

                        <form onSubmit={handleChangePositionSubmit}>
                            {/* Przycisk do wysłania formularza */}
                            <input type="submit" value="Zmień pozycję" />
                        </form>

                        <button onClick={closeFormChangePosition}>Zamknij</button>
                    </div>
                )}
                <table className={styles.componentTable}>
                    <thead>
                        <tr>
                            <th>Numer wewnętrzny<br />
                                <input
                                    type="text"
                                    value={filters.insideNumber}
                                    onChange={e => setFilters({ ...filters, insideNumber: e.target.value })}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th>Nazwa <br />
                                <input
                                    type="text"
                                    value={filters.componentName}
                                    onChange={e => setFilters({ ...filters, componentName: e.target.value })}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th>Lokalizacja <br />
                                <input
                                    type="text"
                                    value={filters.locationName}
                                    onChange={e => setFilters({ ...filters, locationName: e.target.value })}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th>Pozycja magazynowa<br />
                                <input
                                    type="text"
                                    value={filters.positionName}
                                    onChange={e => setFilters({ ...filters, positionName: e.target.value })}
                                    placeholder="Filtruj..."
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComponents && filteredComponents.map((listComponent, index) => (
                            <tr
                                key={index}
                                onClick={() => handleTdClick(listComponent.orderDetailsId)}
                                className={selectedInsideNumber === listComponent.insideNumber ? styles.selectedRow : ''}
                            >
                                <td>{listComponent.insideNumber}</td>
                                <td>{listComponent.componentName}</td>
                                <td>{listComponent.locationName}</td>
                                <td>{listComponent.positionName !== null ? listComponent.positionName : 'brak'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default WarehouseManagement; 