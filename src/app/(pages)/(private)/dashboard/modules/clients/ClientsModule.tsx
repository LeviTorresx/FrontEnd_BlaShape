"use client";
import React, { ReactNode, useState } from "react";
import ClientsTable from "./components/ClientsTable";
import { FaPlus, FaRegAngry, FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import AppModal from "@/app/components/ui/AppModal";
import CustomerForm from "@/app/components/forms/CustomerForm";
import CustomerCard from "./components/CustomerCard";
import { useGetCustomersQuery } from "@/app/services/mockCustomersApi";
import { Customer } from "@/app/types/Customer";
import Button from "@/app/components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useEditCustomerMutation,
} from "@/app/services/customersApi";
import { getErrorMessage } from "@/app/services/getErrorMessages";

export default function ClientsModule() {
  const { data: customersMocks = [] } = useGetCustomersQuery();
  const globalCustomers = useSelector(
    (state: RootState) => state.customers.list
  );
  const customers = globalCustomers ? globalCustomers : customersMocks;
  const userAuthID = useSelector(
    (state: RootState) => state.auth.user?.carpenterId
  );

  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useEditCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );

  const [isEditing, setIsEditing] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "error" | "warning" | "info" | "success",
    message: "",
    icon: <MdErrorOutline fontSize="inherit" />,
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const filtered = customers.filter((customer) =>
    Object.values(customer).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateCustomer = async (newCustomer: Customer) => {
    try {
      const response = await createCustomer(newCustomer).unwrap();
      showSnackbar(
        "success",
        response.message || "¡Cliente creado con éxito!",
        <FaRegCheckCircle />
      );
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      showSnackbar(
        "warning",
        errorMessage || "Hubo un error al crear el cliente",
        <FaRegAngry />
      );
    } finally {
      setOpen(false);
    }
  };

  const handleUpdateCustomer = async (updatedCustomer: Customer) => {
    try {
      const response = await updateCustomer(updatedCustomer).unwrap();

      showSnackbar(
        "success",
        response.message || "Cliente actualizado correctamente",
        <FaRegCheckCircle />
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      showSnackbar(
        "error",
        errorMessage || "Error al actualizar el cliente",
        <FaRegAngry />
      );
    } finally {
      resetFormState();
    }
  };

  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;

    if (!customerToDelete.customerId) {
      showSnackbar("error", "ID de cliente inválido", <FaRegAngry />);
      return;
    }

    try {
      const response = await deleteCustomer(
        customerToDelete.customerId
      ).unwrap();

      showSnackbar(
        "success",
        response.message || "Cliente eliminado con éxito",
        <FaRegCheckCircle />
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      showSnackbar(
        "error",
        errorMessage || "Error al eliminar el cliente",
        <FaRegAngry />
      );
    } finally {
      setOpenConfirmDelete(false);
      setCustomerToDelete(null);
    }
  };

  const showSnackbar = (
    severity: "error" | "warning" | "info" | "success",
    message: string,
    icon: ReactNode
  ) => {
    setSnackbar({ open: true, severity, message, icon: <MdErrorOutline /> });
  };

  const resetFormState = () => {
    setOpen(false);
    setSelectedCustomer(null);
    setIsEditing(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
    setOpen(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenView(true);
  };

  const confirmDeleteCustomer = (customer: Customer) => {
    setCustomerToDelete(customer);
    setOpenConfirmDelete(true);
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Gestión de Clientes
          </h1>
          <p className="text-sm text-gray-500">
            Administra, crea y consulta tus clientes registrados.
          </p>
        </div>

        <Button
          label="Nuevo Cliente"
          icon={<FaPlus className="text-sm" />}
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Tabla */}
      <div className="flex-1 min-h-0">
        <ClientsTable
          filtered={filtered}
          search={search}
          setSearch={setSearch}
          onEdit={handleEditCustomer}
          onView={handleViewCustomer}
          onDelete={confirmDeleteCustomer}
        />
      </div>

      {/* Modal crear/editar */}
      <AppModal
        open={open}
        onClose={resetFormState}
        title={isEditing ? "Editar cliente" : "Crear nuevo cliente"}
      >
        <CustomerForm
          data={selectedCustomer || undefined}
          carpenterId={userAuthID}
          buttonLabel={isEditing ? "Actualizar" : "Guardar"}
          onSubmit={isEditing ? handleUpdateCustomer : handleCreateCustomer}
          onClose={resetFormState}
        />
      </AppModal>

      {/* Modal vista detallada */}
      <AppModal
        open={openView}
        onClose={() => {
          setOpenView(false);
          setSelectedCustomer(null);
        }}
        title="Detalles del cliente"
      >
        <CustomerCard customer={selectedCustomer!} />
      </AppModal>
      {/* Modal de confirmación de eliminación */}
      <AppModal
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        title="Eliminar cliente"
      >
        <div className="text-center space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar al cliente{" "}
            <span className="font-semibold text-gray-900">
              {customerToDelete?.name} {customerToDelete?.lastName}
            </span>
            ?
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              label="Eliminar"
              onClick={handleDeleteCustomer}
              className=" bg-red-500 hover:bg-red-400 "
            />{" "}
            <Button
              label="Cancelar"
              onClick={() => setOpenConfirmDelete(false)}
            />
          </div>
        </div>
      </AppModal>

      {/* Snackbar */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        icon={snackbar.icon}
        message={snackbar.message}
      />
    </div>
  );
}
