"use client"

import { useState, useEffect } from "react"

interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  bloodType: string
  createdAt: string
  updatedAt: string
}

const initialPatient: Omit<Patient, "id" | "createdAt" | "updatedAt"> = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  emergencyContact: "",
  emergencyPhone: "",
  bloodType: "",
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState(initialPatient)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null)

  // Load patients from localStorage on component mount
  useEffect(() => {
    const savedPatients = localStorage.getItem("patients")
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients))
    }
  }, [])

  // Save patients to localStorage
  const savePatients = (updatedPatients: Patient[]) => {
    localStorage.setItem("patients", JSON.stringify(updatedPatients))
    setPatients(updatedPatients)
    alert("Patient data has been saved successfully!")
  }

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  // Add new patient
  const handleAddPatient = () => {
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      alert("Please fill in all required fields (First Name, Last Name, Date of Birth)")
      return
    }

    const newPatient: Patient = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedPatients = [...patients, newPatient]
    savePatients(updatedPatients)
    setFormData(initialPatient)
    setShowAddModal(false)
    alert(`${newPatient.firstName} ${newPatient.lastName} has been added successfully!`)
  }

  // Edit patient
  const handleEditPatient = () => {
    if (!editingPatient) return

    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      alert("Please fill in all required fields (First Name, Last Name, Date of Birth)")
      return
    }

    const updatedPatient: Patient = {
      ...editingPatient,
      ...formData,
      updatedAt: new Date().toISOString(),
    }
    const updatedPatients = patients.map((p) => (p.id === editingPatient.id ? updatedPatient : p))
    savePatients(updatedPatients)
    setEditingPatient(null)
    setFormData(initialPatient)
    setShowEditModal(false)
    alert(`${updatedPatient.firstName} ${updatedPatient.lastName} has been updated successfully!`)
  }

  // Delete patient
  const handleDeletePatient = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    const updatedPatients = patients.filter((p) => p.id !== patientId)
    savePatients(updatedPatients)
    setShowDeleteConfirm(false)
    setPatientToDelete(null)
    alert(`${patient?.firstName} ${patient?.lastName} has been removed successfully!`)
  }

  // Open edit modal
  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient)
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      emergencyPhone: patient.emergencyPhone,
      bloodType: patient.bloodType,
    })
    setShowEditModal(true)
  }

  // Open view modal
  const openViewModal = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowViewModal(true)
  }

  // Open delete confirmation
  const openDeleteConfirm = (patientId: string) => {
    setPatientToDelete(patientId)
    setShowDeleteConfirm(true)
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
              <p className="text-gray-600 mt-1">Manage patient records and information</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => savePatients(patients)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                💾 Save Data
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                ➕ Add Patient
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No patients found</p>
              {searchTerm && <p className="text-gray-400 mt-2">Try adjusting your search terms</p>}
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-gray-600">
                          Age: {calculateAge(patient.dateOfBirth)} • {patient.gender} • {patient.bloodType}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      <p>
                        📞 {patient.phone} • ✉️ {patient.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openViewModal(patient)}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      title="View Patient"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => openEditModal(patient)}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit Patient"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(patient.id)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete Patient"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
                <p className="text-gray-600 mt-1">Enter patient information to create a new record</p>
              </div>
              <div className="p-6">
                <PatientForm formData={formData} setFormData={setFormData} />
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Patient Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Edit Patient</h2>
                <p className="text-gray-600 mt-1">Update patient information</p>
              </div>
              <div className="p-6">
                <PatientForm formData={formData} setFormData={setFormData} />
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditPatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Patient Modal */}
        {showViewModal && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
                <p className="text-gray-600 mt-1">Complete patient information</p>
              </div>
              <div className="p-6">
                <PatientDetails patient={selectedPatient} />
              </div>
              <div className="p-6 border-t flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && patientToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Patient</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this patient? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patientToDelete)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Patient Form Component
function PatientForm({
  formData,
  setFormData,
}: {
  formData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  setFormData: (data: Omit<Patient, "id" | "createdAt" | "updatedAt">) => void
}) {
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
          <input
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => handleChange("emergencyPhone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
        <select
          value={formData.bloodType}
          onChange={(e) => handleChange("bloodType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select blood type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
    </div>
  )
}

// Patient Details Component
function PatientDetails({ patient }: { patient: Patient }) {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium text-gray-700">Full Name</p>
            <p className="text-gray-600 mt-1">
              {patient.firstName} {patient.lastName}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Age</p>
            <p className="text-gray-600 mt-1">{calculateAge(patient.dateOfBirth)} years old</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Date of Birth</p>
            <p className="text-gray-600 mt-1">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Gender</p>
            <p className="text-gray-600 mt-1">{patient.gender}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Phone</p>
            <p className="text-gray-600 mt-1">{patient.phone}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Email</p>
            <p className="text-gray-600 mt-1">{patient.email}</p>
          </div>
        </div>
        {patient.address && (
          <div className="mt-6">
            <p className="font-medium text-gray-700">Address</p>
            <p className="text-gray-600 mt-1">{patient.address}</p>
          </div>
        )}
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium text-gray-700">Contact Name</p>
            <p className="text-gray-600 mt-1">{patient.emergencyContact || "Not provided"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Contact Phone</p>
            <p className="text-gray-600 mt-1">{patient.emergencyPhone || "Not provided"}</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
        <div className="text-sm">
          <div>
            <p className="font-medium text-gray-700">Blood Type</p>
            <p className="text-gray-600 mt-1">{patient.bloodType || "Not specified"}</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Information</h3>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium text-gray-700">Created</p>
            <p className="text-gray-600 mt-1">{new Date(patient.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Last Updated</p>
            <p className="text-gray-600 mt-1">{new Date(patient.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
