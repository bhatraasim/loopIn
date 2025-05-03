// components/BlurredCard.tsx
import { apiClient } from "@/lib/api-client"
import { Eye, EyeOff, LoaderCircle, X } from "lucide-react"
import React, { useState } from "react"
import { useNotification } from "./Notification"

interface BlurredCardProps {
  title: string
  description?: string
  onClose: () => void
}

const BlurredCard: React.FC<BlurredCardProps> = ({ title, onClose }) => {
  const [oldPassInout, setOldPassInout] = useState("")
  const [newPassInput, setNewPassInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const { showNotification } = useNotification()

  const handlePasswordChange = async () => {

    const oldPass = oldPassInout.trim()
    const newPass = newPassInput.trim()

    if (!oldPass || !newPass) {
      showNotification("Please fill in both password fields", "error")
      return
    }

    if (newPass.length < 6) {
      showNotification("New password must be at least 6 characters", "error")
      return
    }

    if (oldPass === newPass) {
      showNotification("New password must be different from old password", "error")
      return
    }

    setLoading(true)
    try {
      const res = await apiClient.changePassword(oldPassInout.trim(), newPassInput.trim())
      showNotification(res.message || "Password changed", "success")
      onClose()
    } catch (error: unknown) {
      console.log(error)
      showNotification( "Something went wrong", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title font-light">{title}</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Old Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-extralight">Old Password</legend>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                className="input w-full pr-10"
                value={oldPassInout}
                onChange={(e) => setOldPassInout(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </fieldset>

          {/* New Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-extralight">New Password</legend>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="input w-full pr-10"
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </fieldset>

          <div className="card-actions justify-end mt-2">
            <button
              className="bg-[#2A7F68] hover:bg-[#246a57] p-2.5 rounded-2xl text-white flex items-center gap-2"
              onClick={handlePasswordChange}
              disabled={
                loading ||
                !oldPassInout.trim() ||
                !newPassInput.trim() ||
                oldPassInout.trim() === newPassInput.trim()
              }
            >
              {loading && <LoaderCircle className="animate-spin" size={18} />}
              {loading ? "Changing" : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlurredCard
