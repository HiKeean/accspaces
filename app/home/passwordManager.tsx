"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Pencil, X, Check, AlertCircle} from "lucide-react"
import { GoogleIcon, ValorantIcon, FacebookIcon, InstagramIcon } from "./icons"
// import { checkOrCreateUser } from "../actions/user"

interface EditState {
  isEditing: boolean
  email: string
  password: string
}

type SortOrder = "none" | "asc" | "desc"

interface PasswordManagerProps {
  userId: string | null
}

export function PasswordManager({ userId}: PasswordManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedApp, setExpandedApp] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editStates, setEditStates] = useState<Record<number, EditState>>({})
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("none")
  const [dbError, setDbError] = useState<string | null>(null)

  useEffect(() => {
    setDbError("")
  }, [])

  const apps = [
    {
      id: 1,
      name: "Google",
      icon: <GoogleIcon className="h-8 w-8" />,
      email: "babibu@gmail.com",
      password: "abcdefg",
    },
    {
      id: 2,
      name: "Valorant",
      icon: <ValorantIcon className="h-8 w-8" />,
      email: "gamer@valorant.com",
      password: "********",
    },
    {
      id: 3,
      name: "Facebook",
      icon: <FacebookIcon className="h-8 w-8" />,
      email: "user@facebook.com",
      password: "********",
    },
    {
      id: 4,
      name: "Instagram",
      icon: <InstagramIcon className="h-8 w-8" />,
      email: "user@instagram.com",
      password: "********",
    },
  ]

  // Filter and sort apps
  let filteredApps = apps.filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Apply sorting if needed
  if (sortOrder !== "none") {
    filteredApps = [...filteredApps].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
  }

  const toggleExpand = (id: number) => {
    setExpandedApp(expandedApp === id ? null : id)
  }

  const startEditing = (app: (typeof apps)[0]) => {
    setEditStates({
      ...editStates,
      [app.id]: {
        isEditing: true,
        email: app.email,
        password: app.password,
      },
    })
  }

  const handleSave = (appId: number) => {
    // Add your save logic here
    console.log("Saving:", editStates[appId])
    console.log(userId)
    setEditStates({
      ...editStates,
      [appId]: {
        ...editStates[appId],
        isEditing: false,
      },
    })
  }

  const updateField = (appId: number, field: "email" | "password", value: string) => {
    setEditStates({
      ...editStates,
      [appId]: {
        ...editStates[appId],
        [field]: value,
      },
    })
  }

  const handleSort = (order: SortOrder) => {
    setSortOrder(order)
    setShowFilterModal(false)
  }

  return (
    <>
      {dbError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Database Error</p>
            <p className="text-sm">{dbError}</p>
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <div className="relative flex items-center rounded-full border border-slate-600 bg-slate-700/50 px-4 py-2">
          <Search className="mr-2 h-5 w-5 text-green-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-300 outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <button className="text-green-400" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "Done" : "Edit"}
          </button>
          <button className="text-green-400" onClick={() => setShowFilterModal(true)}>
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-20">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="rounded-xl overflow-hidden bg-sky-200 transition-all duration-200 ease-in-out relative"
            >
              <div
                className={`flex items-center p-4 ${!isEditMode ? "cursor-pointer" : ""}`}
                onClick={() => !isEditMode && toggleExpand(app.id)}
              >
                <div className="mr-3">{app.icon}</div>
                <span className="text-slate-800">{app.name}</span>
                {isEditMode && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-red-500 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors duration-200"
                    aria-label={`Delete ${app.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log(`Delete app with id: ${app.id}`)
                    }}
                  >
                    <span className="text-white font-bold text-lg leading-none">-</span>
                  </button>
                )}
              </div>
              {expandedApp === app.id && (
                <div className="px-4 pb-4 bg-sky-100">
                  <div className="space-y-4 text-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1 mr-4">
                        {editStates[app.id]?.isEditing ? (
                          <>
                            <div className="space-y-1">
                              <label htmlFor={`email-${app.id}`} className="text-sm text-slate-600">
                                Email
                              </label>
                              <input
                                id={`email-${app.id}`}
                                type="email"
                                value={editStates[app.id].email}
                                onChange={(e) => updateField(app.id, "email", e.target.value)}
                                className="w-full px-3 py-1.5 rounded border border-sky-300 bg-white focus:outline-none focus:border-sky-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label htmlFor={`password-${app.id}`} className="text-sm text-slate-600">
                                Password
                              </label>
                              <input
                                id={`password-${app.id}`}
                                type="password"
                                value={editStates[app.id].password}
                                onChange={(e) => updateField(app.id, "password", e.target.value)}
                                className="w-full px-3 py-1.5 rounded border border-sky-300 bg-white focus:outline-none focus:border-sky-500"
                              />
                            </div>
                            <button
                              onClick={() => handleSave(app.id)}
                              className="mt-2 px-4 py-1.5 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors duration-200 text-sm font-medium"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <p>Email : {app.email}</p>
                            <p>Password : {app.password}</p>
                          </>
                        )}
                      </div>
                      {!editStates[app.id]?.isEditing && (
                        <button
                          onClick={() => startEditing(app)}
                          className="p-1.5 rounded-full hover:bg-sky-200 transition-colors duration-200"
                          aria-label={`Edit ${app.name} details`}
                        >
                          <Pencil className="h-4 w-4 text-slate-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400">Tidak ada aplikasi yang ditemukan</div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-72 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium text-slate-800">Filter</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-slate-500 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div
                className="flex items-center space-x-3 px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("asc")}
              >
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${sortOrder === "asc" ? "border-green-500 bg-green-500" : "border-slate-300"}`}
                >
                  {sortOrder === "asc" && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className={sortOrder === "asc" ? "text-green-700 font-medium" : "text-slate-700"}>
                  Sort A to Z
                </span>
              </div>

              <div
                className="flex items-center space-x-3 px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("desc")}
              >
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${sortOrder === "desc" ? "border-green-500 bg-green-500" : "border-slate-300"}`}
                >
                  {sortOrder === "desc" && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className={sortOrder === "desc" ? "text-green-700 font-medium" : "text-slate-700"}>
                  Sort Z to A
                </span>
              </div>

              {sortOrder !== "none" && (
                <div
                  className="flex items-center space-x-3 px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100 mt-2"
                  onClick={() => handleSort("none")}
                >
                  <div className="h-5 w-5 rounded-full border border-slate-300 flex items-center justify-center">
                    {/* No check icon here since this is for clearing the sort */}
                  </div>
                  <span className="text-red-500">Clear Sorting</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-400 flex items-center justify-center shadow-lg hover:bg-green-500 transition-colors duration-200"
        aria-label="Add user"
      >
        <Plus className="h-6 w-6 text-slate-800" />
      </button>
    </>
  )
}

