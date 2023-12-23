import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import { mernStackEcApi } from '../../api';
import { 
    onAddNewPerson,
    onDeletePerson, 
    onLoadingPersons, 
    onUpdatePerson, 
} from '../../store/slices/persons';

export const usePersonsStore = () => {
    const { persons } = useSelector(state => state.persons);
    const dispatch = useDispatch();

    const startLoadingPersons = async () => {
        try {
            const { data } = await mernStackEcApi.get('/persons');
            dispatch(onLoadingPersons(data));
        } catch (error) {
            // console.log('Error: ', error);
        }
    }

    const startSavingPerson = async (person, closeModal) => {
        try {
            if (person.id) {
                await mernStackEcApi.put(`/persons/${person.id}`, person);
                dispatch(onUpdatePerson({...person}));
                closeModal();
                return;
            }
            const { data } = await mernStackEcApi.post('/persons', person);
            const { msg, ...rest } = data;
            dispatch(onAddNewPerson(rest.person));
            closeModal();
        } catch (error) {
            if (error.response.data.errors) {
                // Swal.fire('Error al guardar.', error.response.data.errors[0].msg, 'error');
                Swal.fire({
                    customClass: {
                        container: 'swal'
                    },
                    title: 'Error al guardar.',
                    text: error.response.data.errors[0].msg,
                    icon: 'error',
                });
            } else {
                // Swal.fire('Error al guardar.', error.response.data.msg, 'error');
                Swal.fire({
                    customClass: {
                        container: 'swal'
                    },
                    title: 'Error al guardar.',
                    text: error.response.data.msg,
                    icon: 'error',
                })
            }
        }
    }

    const startDeletingPerson = async (id) => {
        try {
            await mernStackEcApi.delete(`/persons/${id}`);
            dispatch(onDeletePerson({ id }));
        } catch (error) {
            // console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }    
    }


    return {
        persons,
        startDeletingPerson,
        startLoadingPersons,
        startSavingPerson,
    }
}
