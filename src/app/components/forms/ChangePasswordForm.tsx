import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { useChangePasswordMutation } from "@/app/services/authApi"
import Button from "@/app/components/ui/Button"

interface ChangePasswordFormProps {
  onSuccess?: () => void
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {

      await changePassword({
        currentPassword,
        newPassword
      }).unwrap()

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // 3. Reemplaza el alert por onSuccess
      onSuccess?.()

    } catch (err: any) {
      setError(err?.data?.message || "Error al cambiar contraseña")
    }
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-6 max-w-md mx-auto bg-white shadow-md rounded-xl border p-6"
    >

      <h3 className="text-lg font-semibold mb-5 text-gray-800">
        Cambiar contraseña
      </h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        <input
          type="password"
          placeholder="Contraseña actual"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <div className="pt-2 flex justify-center">

          <Button
            type="submit"
            label={isLoading ? "Actualizando..." : "Actualizar contraseña"}
            disabled={isLoading}
          />

        </div>

      </form>

    </motion.div>
  )
}