"use client";
import React, { useState } from "react";
import ClientsTable from "./components/ClientsTable";
import { FaPlus, FaRegAngry, FaRegCheckCircle } from "react-icons/fa";
import ButtonActions from "@/app/components/ui/ButtonActions";
import {
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "@/app/services/mockCustomersApi";
import { Customer } from "@/app/types/Customer";
import { MdErrorOutline } from "react-icons/md";
import NotificationSnackbar from "@/app/components/ui/NotificationSnackbar";
import AppModal from "@/app/components/ui/AppModal";
import CustomerForm from "@/app/components/forms/CustomerForm";
import CustomerCard from "./components/CustomerCard";

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

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const filtered = customers.filter((customer) =>
    Object.values(customer).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreateCustomer = async (newCustomer: Customer) => {
    try {
      await createCustomer(newCustomer).unwrap();
      setSnackbar({
        open: true,
        severity: "success",
        message: "¡Cliente creado con exito!",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      console.error("Error al agregar cliente:", err);
      setSnackbar({
        open: true,
        severity: "warning",
        message: "¡Hubo un error al crear al cliente!",
        icon: <FaRegAngry fontSize="inherit" />,
      });
    } finally {
      setOpen(false);
    }
  };

  const handleUpdateCustomer = async (updatedCustomer: Customer) => {
    try {
      await updateCustomer(updatedCustomer).unwrap();
      setSnackbar({
        open: true,
        severity: "success",
        message: "Cliente actualizado correctamente",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      console.error("Error al actualizar cliente:", err);
      setSnackbar({
        open: true,
        severity: "error",
        message: "Error al actualizar el cliente",
        icon: <FaRegAngry fontSize="inherit" />,
      });
    } finally {
      setOpen(false);
      setSelectedCustomer(null);
      setIsEditing(false);
    }
  };

  const handleDeleteCustomer = async (customer: Customer) => {
    try {
      await deleteCustomer(customer.customerId).unwrap();
      setSnackbar({
        open: true,
        severity: "success",
        message: "Cliente eliminado con éxito",
        icon: <FaRegCheckCircle fontSize="inherit" />,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Error al eliminar el cliente",
        icon: <FaRegAngry fontSize="inherit" />,
      });
    }
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
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Gestión de Clientes
        </h1>

        <ButtonActions
          label="Nuevo Cliente"
          icon={<FaPlus className="text-sm" />}
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        />
        <AppModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedCustomer(null);
            setIsEditing(false);
          }}
          title={isEditing ? "Editar cliente" : "Crear nuevo cliente"}
          confirmText="Guardar"
          cancelText="Cancelar"
        >
          <CustomerForm
            data={selectedCustomer || undefined}
            buttonLabel={isEditing ? "Actualizar cliente" : "Guardar cliente"}
            onSubmit={(customer) => {
              if (isEditing) {
                handleUpdateCustomer(customer);
              } else {
                handleCreateCustomer(customer);
              }
            }}
          />
        </AppModal>
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
      </div>

      {/* Tabla */}
      <ClientsTable
        filtered={filtered}
        search={search}
        setSearch={setSearch}
        onEdit={handleEditCustomer}
        onView={handleViewCustomer}
        onDelete={handleDeleteCustomer}
      />
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
