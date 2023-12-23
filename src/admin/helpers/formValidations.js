import { isValidIdentificationCard } from "./validateIdentificationCard";

export const validateRequired = (value) => {
    return !!value.length;
}

export const validateRequiredField = ({ placeholder, value }) => {
    return !!value.length ? '' : `${placeholder} es requerido`;
}

export const validateDniField = (dni) => {
    if (dni.length === 0) return 'Cédula es requerido';
    return isValidIdentificationCard(dni) 
        ? ''
        : 'Cédula no es válida'
}