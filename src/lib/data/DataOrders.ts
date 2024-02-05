//@types
import { TDelivery } from '../../pages/deliverylist/insidecomponent/DeliveryListComponent';
import { TDeliveryData } from '../../pages/deliverymanagement/insidecomponent/ComponentListFromDeliveryComponent';
import { TDeliveryListComponents } from '../../pages/deliverymanagement/insidecomponent/ComponentListFromDeliveryComponent'

export const DeliveryList: TDelivery[] = [
    {
        id: '1',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2023-11-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '1',
        status: 'Zrealizowano',
    },
    {
        id: '2',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2023-12-22T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '2',
        status: 'Zrealizowano'
    },
    {
        id: '3',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-01T20:01:15.737Z',
        lastModified: null,
        deliveryNumber: '3',
        status: 'Zrealizowano'
    },
    {
        id: '4',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-03T20:01:15.737Z',
        lastModified: null,
        deliveryNumber: '4',
        status: 'Zrealizowano'
    },
    {
        id: '5',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-03T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '5',
        status: 'Zrealizowano'
    },
    {
        id: '6',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-05T20:01:15.737Z',
        lastModified: null,
        deliveryNumber: '6',
        status: 'Zrealizowano'
    },
    {
        id: '7',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-06T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '7',
        status: 'W trakcie realizacji'
    },
    {
        id: '8',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-10T20:01:15.737Z',
        lastModified: null,
        deliveryNumber: '8',
        status: 'W trakcie realizacji'
    },
    {
        id: '9',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-12T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '9',
        status: 'W trakcie realizacji'
    },
    {
        id: '10',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '10',
        status: 'W trakcie realizacji'
    },
];

export const DeliveryData: TDeliveryData[] = [
    {
        id: '1',
        typeOfMaterial: 'Półki wiszące',
        clientName: 'Alstom',
        creationDate: '2023-11-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        deliveryNumber: '1',
        status: 'Zrealizowano',
    }
]

export const DeliveryListComponents: TDeliveryListComponents[] = [
    {
        id: '1',
        deliveryId: '1',
        componentNumber: '1',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '2',
        deliveryId: '1',
        componentNumber: '2',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '3',
        deliveryId: '1',
        componentNumber: '3',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '4',
        deliveryId: '1',
        componentNumber: '4',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '5',
        deliveryId: '1',
        componentNumber: '5',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '6',
        deliveryId: '1',
        componentNumber: '6',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '7',
        deliveryId: '1',
        componentNumber: '7',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '8',
        deliveryId: '1',
        componentNumber: '8',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '9',
        componentNumber: '9',
        deliveryId: '1',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    },
    {
        id: '10',
        deliveryId: '1',
        componentNumber: '10',
        status: 'NOK',
        typeOfMaterial: 'Półki wiszące',
        dateOfProduction: '2020-06-20T20:01:15.737Z',
        dateOfControl: '2024-01-17T20:01:15.737Z',
        typeOfComponent: 'typ 69',
        nrIndex: 'GL00000963723',
        nrMonOld: '710234',
        nrMonNew: '200692137',
        dimensions: '1',
        creationDate: '2024-01-17T20:01:15.737Z',
        lastModified: '2024-01-17T20:01:15.737Z',
        subComponentsStatus: [
            {
                boczekLewy: 'OK',
                boczekPrawy: 'NOK',
                srebrnaListwaFront: 'NAPRAWIONO',
                szklanyKlosz: 'WYMIANA',
                plastikowyKlosz: 'OK',
                wiazka: 'NOK',
                oswietlenie: 'NOK',
                bialaListwaCentralna: 'NAPRAWIONO',
            }
        ]
    }
]