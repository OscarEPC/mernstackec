import { useEffect, useMemo, useState } from "react";

export const useForm = (formInitialValues = {}, formValidations = {}) => {
    const [formValues, setFormValues] = useState(formInitialValues);
    // const [validations, setValidations] = useState({});

    // useEffect(() => {
    //     createValidators();
    // }, [formValues]);

    // const isValidForm = useMemo(() => {
    //     for (const key of Object.keys(validations)) {
    //         if (validations[key] !== null) return false;
    //     }
    //     return true;
    // }, [validations])

    const handleInputValueChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    
    const resetForm = () => {
        setFormValues(formInitialValues);
    }

    // const createValidators = () => {
    //     const formCheckedValues = {};
    //     for (const key of Object.keys(formValidations)) {
    //         const [fn, errorMessage] = formValidations[key];
    //         formCheckedValues[`${key}Valid`] = fn(formValues[key]) ? null : errorMessage;
    //     }
    //     setValidations(formCheckedValues);
    // }

    return {
        // ...validations,
        ...formValues,  
        // validations,
        formValues,
        // isValidForm,
        handleInputValueChange,
        resetForm,
    }
}
