"use client";
import React, { ReactNode, useState } from "react";
import ClientsTable from "./components/ClientsTable";
import { FaPlus, FaRegAngry, FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import ButtonActions from "@/app/components/ui/ButtonActions";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import AppModal from "@/app/components/ui/AppModal";
import CustomerForm from "@/app/components/forms/CustomerForm";
import CustomerCard from "./components/CustomerCard";
import {
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "@/app/services/mockCustomersApi";
import { Customer } from "@/app/types/Customer";

export default function ClientsModule() {
  const { data: customers = [] } = useGetCustomersQuery();
  const [createCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
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
      await createCustomer(newCustomer).unwrap();
      showSnackbar(
        "success",
        "¡Cliente creado con éxito!",
        <FaRegCheckCircle />
      );
    } catch {
      showSnackbar(
        "warning",
        "Hubo un error al crear el cliente",
        <FaRegAngry />
      );
    } finally {
      setOpen(false);
    }
  };

  const handleUpdateCustomer = async (updatedCustomer: Customer) => {
    try {
      await updateCustomer(updatedCustomer).unwrap();
      showSnackbar(
        "success",
        "Cliente actualizado correctamente",
        <FaRegCheckCircle />
      );
    } catch {
      showSnackbar("error", "Error al actualizar el cliente", <FaRegAngry />);
    } finally {
      resetFormState();
    }
  };

  const handleDeleteCustomer = async (customer: Customer) => {
    try {
      await deleteCustomer(customer.customerId).unwrap();
      showSnackbar(
        "success",
        "Cliente eliminado con éxito",
        <FaRegCheckCircle />
      );
    } catch {
      showSnackbar("error", "Error al eliminar el cliente", <FaRegAngry />);
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

        <ButtonActions
          label="Nuevo Cliente"
          icon={<FaPlus className="text-sm" />}
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
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
          onDelete={handleDeleteCustomer}
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
