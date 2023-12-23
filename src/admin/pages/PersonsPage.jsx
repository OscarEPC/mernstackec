import { useCallback, useEffect, useMemo, useState } from "react";

import { MaterialReactTable } from "material-react-table";

import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Add, Delete, Edit, RotateLeft } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import { Navbar } from "../components"
import { validateDniField, validateRequiredField } from "../helpers";
import { usePersonsStore, } from "../hooks";

export const PersonsPage = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const { persons, startLoadingPersons, startSavingPerson, startDeletingPerson } = usePersonsStore();

    useEffect(() => {
        startLoadingPersons();
    }, []);

    const getCommonEditTextFieldProps = useCallback((cell) => {
        return {
            error: !!validationErrors[cell.id],
            helperText: validationErrors[cell.id],
            onBlur: (event) => {
                const message =
                    cell.column.id === 'dni'
                    ? validateDniField(event.target.value)
                    : validateRequiredField(event.target);
                const isValid = !message;
                if (!isValid) {
                    setValidationErrors({
                        ...validationErrors,
                        [cell.id]: message,
                    });
                } else {
                    delete validationErrors[cell.id];
                    setValidationErrors({
                        ...validationErrors,
                    });
                }
            },
        };
    }, [validationErrors]);

    const columns = useMemo(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'name',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                header: 'Apellido',
                accessorKey: 'lastName',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                header: 'Edad',
                accessorKey: 'age',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                header: 'Cédula',
                accessorKey: 'dni',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
        ],
        [getCommonEditTextFieldProps]
    );

    const handleEditingRowCancel = () => {
        setValidationErrors({});
    }

    const handleEditingRowSave = async ({ exitEditingMode, row, values }) => {
        if (!haveValidationErrors()) {
            const { original } = row;
            const person = {
                ...values,
                id: original.id
            }
            startSavingPerson(person, () => {});
            exitEditingMode();
        }
    };

    const haveValidationErrors = () => {
        return !!Object.keys(validationErrors).length;
    }

    const handleAddButtonClick = () => {
    }

    const handleRefreshButton = () => {
        startLoadingPersons();
    }

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !confirm(`Está seguro de querer eliminar ${row.getValue('name')}?`)
            ) {
                return;
            }
            const { original } = row;
            startDeletingPerson(original.id);
        },
        [],
    );

    return (
        <div>
            <Navbar />
            <h1 className="text-center mt-3">Listado de personas</h1>
            <div className="container mt-4">
                <MaterialReactTable
                    columns={columns}
                    data={persons}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }}
                    editingMode="modal"
                    localization={MRT_Localization_ES}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Tooltip arrow placement="left" title="Editar">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Eliminar">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    enableEditing
                    onEditingRowSave={handleEditingRowSave}
                    renderTopToolbarCustomActions={() => (
                        <div>
                            <Button
                                color="primary"
                                onClick={handleAddButtonClick}
                                variant="contained" 
                                startIcon={<Add />}
                            >
                                Añadir
                            </Button>
                            <Button
                                color="primary"
                                onClick={handleRefreshButton}
                                variant="contained"
                                className="m-1"
                                startIcon={<RotateLeft />}
                            >
                                Refrescar
                            </Button>
                        </div>
                    )}
                    onEditingRowCancel={handleEditingRowCancel}
                    initialState={{
                        pagination: {
                            pageIndex: 0,
                            pageSize: 5,
                        }
                    }}
                />
            </div>
        </div>
    )
}
