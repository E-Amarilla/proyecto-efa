"use client";
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { I18nProvider } from '../context/I18nContext';

// Importa aquí otros providers que necesites

const ProvidersComposite = ({ children, initialLanguage }) => {
  return (
    <AuthProvider>
      <I18nProvider initialLanguage={initialLanguage}>
        {children}
      </I18nProvider>
    </AuthProvider>
  );
};

export default ProvidersComposite;