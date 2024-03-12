import React, { createContext, useEffect, useState } from 'react';

// Tworzenie kontekstu
export const DeliveryContext = createContext();

// Tworzenie dostawcy kontekstu
export const DeliveryProvider = ({ children }) => {
  // Obsługa renderowania po wysłaniu formularza
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [deliveryNumber, setDeliveryNumber] = useState();
  const [deliveryId, setDeliveryId] = useState(0);
  // Obsługa dodawania komponentu do zamówienia
  const [addComponentForm, setAddComponentForm] = useState(false);
  const [addSubcomponentsForm, setAddSubcomponentsForm] = useState(false);

  // useEffect(() => {
  //   console.log(addSubcomponentsForm);
   
  // }, [addSubcomponentsForm])

  return (
    <DeliveryContext.Provider value={{
      deliveryNumber,
      setDeliveryNumber,
      formSubmitted,
      setFormSubmitted,
      deliveryId,
      setDeliveryId,
      addComponentForm,
      setAddComponentForm,
      addSubcomponentsForm, 
      setAddSubcomponentsForm,
    }}>
      {children}
    </DeliveryContext.Provider>
  );
};
