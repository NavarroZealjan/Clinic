/* eslint-disable react/no-unescaped-entities */
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
  medicalHistory: MedicalHistoryEntry[]
  labResults: LabResult[]
  createdAt: string
  updatedAt: string
}

interface MedicalHistoryEntry {
  id: string
  date: string
  diagnosis: string
  treatment: string
  doctor: string
  notes: string
  createdAt: string
}

interface LabResult {
  id: string
  date: string
  testName: string
  result: string
  normalRange: string
  status: "Normal" | "Abnormal" | "Critical"
  file?: File | null
  fileName?: string
  fileUrl?: string
  doctor: string
  notes: string
  createdAt: string
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
  medicalHistory: [],
  labResults: [],
}

// Toast Component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icon = type === "success" ? "✅" : "❌"
  const toastClass = `toast ${type}`

  return (
    <div className={toastClass}>
      <span className="toast-icon">{icon}</span>
      <span className="toast-message">{message}</span>
    </div>
  )
}

const PatientInfoTab = ({ patient }: { patient: Patient }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

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
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
        <div className="patient-avatar" style={{ marginRight: "20px" }}>
          {getInitials(patient.firstName, patient.lastName)}
        </div>
        <div>
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "4px" }}>
            {patient.firstName} {patient.lastName}
          </h3>
          <p style={{ color: "#718096" }}>Patient ID: {patient.id}</p>
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#4a5568" }}>
          Personal Information
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Age</p>
            <p style={{ color: "#6b7280" }}>{calculateAge(patient.dateOfBirth)} years old</p>
          </div>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Date of Birth</p>
            <p style={{ color: "#6b7280" }}>{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Gender</p>
            <p style={{ color: "#6b7280" }}>{patient.gender || "Not specified"}</p>
          </div>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Blood Type</p>
            <p style={{ color: "#6b7280" }}>{patient.bloodType || "Not specified"}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#4a5568" }}>
          Contact Information
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Phone</p>
            <p style={{ color: "#6b7280" }}>{patient.phone || "Not provided"}</p>
          </div>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Email</p>
            <p style={{ color: "#6b7280" }}>{patient.email || "Not provided"}</p>
          </div>
        </div>
        {patient.address && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Address</p>
            <p style={{ color: "#6b7280" }}>{patient.address}</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#4a5568" }}>
          Emergency Contact
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Contact Name</p>
            <p style={{ color: "#6b7280" }}>{patient.emergencyContact || "Not provided"}</p>
          </div>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Contact Phone</p>
            <p style={{ color: "#6b7280" }}>{patient.emergencyPhone || "Not provided"}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#4a5568" }}>
          Record Information
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Created</p>
            <p style={{ color: "#6b7280" }}>{new Date(patient.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px" }}>Last Updated</p>
            <p style={{ color: "#6b7280" }}>{new Date(patient.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const MedicalHistoryTab = ({ patient, onAddHistory }: { patient: Patient; onAddHistory: () => void }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#4a5568" }}>
          Medical History ({patient.medicalHistory.length} entries)
        </h4>
        <button onClick={onAddHistory} className="btn btn-primary" style={{ fontSize: "14px", padding: "8px 16px" }}>
          ➕ Add Entry
        </button>
      </div>

      {patient.medicalHistory.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
          <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px", color: "#6b7280" }}>
            No Medical History
          </h3>
          <p>Start building the patient's medical history by adding their first entry.</p>
        </div>
      ) : (
        <div style={{ whiteSpace: "16px" }}>
          {patient.medicalHistory
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((entry) => (
              <div
                key={entry.id}
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "4px" }}>
                      {entry.diagnosis}
                    </h5>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      {new Date(entry.date).toLocaleDateString()} • Dr. {entry.doctor || "Unknown"}
                    </p>
                  </div>
                </div>

                {entry.treatment && (
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px", fontSize: "14px" }}>
                      Treatment:
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>{entry.treatment}</p>
                  </div>
                )}

                {entry.notes && (
                  <div>
                    <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px", fontSize: "14px" }}>Notes:</p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>{entry.notes}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

const LabResultsTab = ({ patient, onAddLab }: { patient: Patient; onAddLab: () => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "#10b981"
      case "Abnormal":
        return "#f59e0b"
      case "Critical":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Normal":
        return "✅"
      case "Abnormal":
        return "⚠️"
      case "Critical":
        return "🚨"
      default:
        return "📊"
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#4a5568" }}>
          Lab Results ({patient.labResults.length} results)
        </h4>
        <button onClick={onAddLab} className="btn btn-primary" style={{ fontSize: "14px", padding: "8px 16px" }}>
          🧪 Add Result
        </button>
      </div>

      {patient.labResults.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧪</div>
          <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px", color: "#6b7280" }}>No Lab Results</h3>
          <p>Upload and manage the patient's laboratory test results here.</p>
        </div>
      ) : (
        <div style={{ whiteSpace: "16px" }}>
          {patient.labResults
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((result) => (
              <div
                key={result.id}
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "4px" }}>
                      {result.testName}
                    </h5>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      {new Date(result.date).toLocaleDateString()} • Dr. {result.doctor || "Unknown"}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: getStatusColor(result.status) + "20",
                      color: getStatusColor(result.status),
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {getStatusIcon(result.status)} {result.status}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                  <div>
                    <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px", fontSize: "14px" }}>
                      Result:
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>{result.result || "Not specified"}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px", fontSize: "14px" }}>
                      Normal Range:
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>{result.normalRange || "Not specified"}</p>
                  </div>
                </div>

                {result.fileName && (
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px", fontSize: "14px" }}>
                      Attached File:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#f3f4f6",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    >
                      📎 {result.fileName}
                      {result.fileUrl && (
                        <a
                          href={result.fileUrl}
                          download={result.fileName}
                          style={{ color: "#4f46e5", textDecoration: "none", marginLeft: "8px" }}
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {result.notes && (
                  <div>
                    <p style={{ fontWeight: "500", color: "#374151", marginBottom: "4px", fontSize: "14px" }}>Notes:</p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>{result.notes}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
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
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "history" | "labs">("info")
  const [showAddHistoryModal, setShowAddHistoryModal] = useState(false)
  const [showAddLabModal, setShowAddLabModal] = useState(false)
  const [historyFormData, setHistoryFormData] = useState({
    date: "",
    diagnosis: "",
    treatment: "",
    doctor: "",
    notes: "",
  })
  const [labFormData, setLabFormData] = useState({
    date: "",
    testName: "",
    result: "",
    normalRange: "",
    status: "Normal" as "Normal" | "Abnormal" | "Critical",
    doctor: "",
    notes: "",
    file: null as File | null,
  })

  useEffect(() => {
    const savedPatients = localStorage.getItem("patients")
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients))
    }
  }, [])

  const triggerToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
  }

  const closeToast = () => {
    setToast(null)
  }

  const savePatients = (updatedPatients: Patient[]) => {
    localStorage.setItem("patients", JSON.stringify(updatedPatients))
    setPatients(updatedPatients)
  }

  const filteredPatients = patients.filter(
    (patient) =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

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

  const handleAddPatient = () => {
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      triggerToast("Please fill in all required fields (First Name, Last Name, Date of Birth)", "error")
      return
    }

    const newPatient: Patient = {
      ...formData,
      id: Date.now().toString(),
      medicalHistory: [],
      labResults: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedPatients = [...patients, newPatient]
    savePatients(updatedPatients)
    setFormData(initialPatient)
    setShowAddModal(false)
    triggerToast(`${newPatient.firstName} ${newPatient.lastName} has been added successfully!`, "success")
  }

  const handleEditPatient = () => {
    if (!editingPatient) return

    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      triggerToast("Please fill in all required fields (First Name, Last Name, Date of Birth)", "error")
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
    triggerToast(`${updatedPatient.firstName} ${updatedPatient.lastName} has been updated successfully!`, "success")
  }

  const handleDeletePatient = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    const updatedPatients = patients.filter((p) => p.id !== patientId)
    savePatients(updatedPatients)
    setShowDeleteConfirm(false)
    setPatientToDelete(null)
    triggerToast(`${patient?.firstName} ${patient?.lastName} has been removed successfully!`, "success")
  }

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
      medicalHistory: patient.medicalHistory,
      labResults: patient.labResults,
    })
    setShowEditModal(true)
  }

  const openViewModal = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowViewModal(true)
  }

  const openDeleteConfirm = (patientId: string) => {
    setPatientToDelete(patientId)
    setShowDeleteConfirm(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const handleAddMedicalHistory = () => {
    if (!selectedPatient || !historyFormData.date || !historyFormData.diagnosis) {
      triggerToast("Please fill in required fields (Date, Diagnosis)", "error")
      return
    }

    const newEntry: MedicalHistoryEntry = {
      id: Date.now().toString(),
      ...historyFormData,
      createdAt: new Date().toISOString(),
    }

    const updatedPatient = {
      ...selectedPatient,
      medicalHistory: [...selectedPatient.medicalHistory, newEntry],
      updatedAt: new Date().toISOString(),
    }

    const updatedPatients = patients.map((p) => (p.id === selectedPatient.id ? updatedPatient : p))
    savePatients(updatedPatients)
    setSelectedPatient(updatedPatient)
    setHistoryFormData({ date: "", diagnosis: "", treatment: "", doctor: "", notes: "" })
    setShowAddHistoryModal(false)
    triggerToast("Medical history entry added successfully!", "success")
  }

  const handleAddLabResult = () => {
    if (!selectedPatient || !labFormData.date || !labFormData.testName) {
      triggerToast("Please fill in required fields (Date, Test Name)", "error")
      return
    }

    const newLabResult: LabResult = {
      id: Date.now().toString(),
      ...labFormData,
      fileName: labFormData.file?.name,
      fileUrl: labFormData.file ? URL.createObjectURL(labFormData.file) : undefined,
      createdAt: new Date().toISOString(),
    }

    const updatedPatient = {
      ...selectedPatient,
      labResults: [...selectedPatient.labResults, newLabResult],
      updatedAt: new Date().toISOString(),
    }

    const updatedPatients = patients.map((p) => (p.id === selectedPatient.id ? updatedPatient : p))
    savePatients(updatedPatients)
    setSelectedPatient(updatedPatient)
    setLabFormData({
      date: "",
      testName: "",
      result: "",
      normalRange: "",
      status: "Normal",
      doctor: "",
      notes: "",
      file: null,
    })
    setShowAddLabModal(false)
    triggerToast("Lab result added successfully!", "success")
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header-card">
        <div>
          <h1 className="page-title">reybert medical clinic</h1>
          <p className="page-subtitle">Professional Patient Management System</p>
        </div>
        <div className="header-actions">
          <button onClick={() => savePatients(patients)} className="btn btn-secondary">
            💾 Save Data
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            ➕ Add New Patient
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="card-content">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search patients by name, email, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div>
        {filteredPatients.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">🏥</div>
              <h3>No patients found</h3>
              {searchTerm ? (
                <p>No patients match your search criteria. Try adjusting your search terms.</p>
              ) : (
                <p>Get started by adding your first patient to the system. Click "Add New Patient" to begin.</p>
              )}
            </div>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <div className="patient-header">
                <button
                  onClick={() => openViewModal(patient)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    background: "none",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    color: "inherit",
                    font: "inherit",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  title={`View details for ${patient.firstName} ${patient.lastName}`}
                >
                  <div className="patient-avatar">{getInitials(patient.firstName, patient.lastName)}</div>
                  <div className="patient-info">
                    <h3 className="patient-name">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="patient-details">
                      {calculateAge(patient.dateOfBirth)} years old • {patient.gender} • Blood Type:{" "}
                      {patient.bloodType || "Not specified"}
                    </p>
                    <div className="patient-contact">
                      <span>📞 {patient.phone || "No phone"}</span>
                      <span>✉️ {patient.email || "No email"}</span>
                    </div>
                  </div>
                </button>
                <div className="patient-actions">
                  <button
                    onClick={() => openViewModal(patient)}
                    className="action-btn btn-view leading-7"
                    title="View Patient Details"
                  >
                    {"🔎\n"}
                  </button>
                  <button onClick={() => openEditModal(patient)} className="action-btn btn-edit" title="Edit Patient">
                    ✏️
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(patient.id)}
                    className="action-btn btn-delete"
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
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add New Patient</h2>
              <p className="modal-subtitle">Enter patient information to create a new medical record</p>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="input"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="input"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="input"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="input"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="input"
                    placeholder="patient@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Home Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  className="input"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Emergency Contact</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    className="input"
                    placeholder="Contact person name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                    className="input"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Blood Type</label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleChange("bloodType", e.target.value)}
                  className="input"
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
            <div className="modal-footer">
              <button onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleAddPatient} className="btn btn-primary">
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit Patient Record</h2>
              <p className="modal-subtitle">Update patient information</p>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="input"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Home Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Emergency Contact</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Blood Type</label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleChange("bloodType", e.target.value)}
                  className="input"
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
            <div className="modal-footer">
              <button onClick={() => setShowEditModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleEditPatient} className="btn btn-primary">
                Update Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient File Modal */}
      {showViewModal && selectedPatient && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: "900px" }}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <div className="patient-avatar" style={{ marginRight: "16px", width: "48px", height: "48px" }}>
                  {getInitials(selectedPatient.firstName, selectedPatient.lastName)}
                </div>
                <div>
                  <h2 className="modal-title" style={{ marginBottom: "4px" }}>
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </h2>
                  <p className="modal-subtitle">Patient ID: {selectedPatient.id}</p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div style={{ display: "flex", gap: "8px", borderBottom: "2px solid #e5e7eb" }}>
                <button
                  onClick={() => setActiveTab("info")}
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    background: activeTab === "info" ? "#4f46e5" : "transparent",
                    color: activeTab === "info" ? "white" : "#6b7280",
                    borderRadius: "8px 8px 0 0",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  📋 Information
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    background: activeTab === "history" ? "#4f46e5" : "transparent",
                    color: activeTab === "history" ? "white" : "#6b7280",
                    borderRadius: "8px 8px 0 0",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  🏥 Medical History
                </button>
                <button
                  onClick={() => setActiveTab("labs")}
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    background: activeTab === "labs" ? "#4f46e5" : "transparent",
                    color: activeTab === "labs" ? "white" : "#6b7280",
                    borderRadius: "8px 8px 0 0",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  🧪 Lab Results
                </button>
              </div>
            </div>

            <div className="modal-body" style={{ minHeight: "400px" }}>
              {/* Information Tab */}
              {activeTab === "info" && <PatientInfoTab patient={selectedPatient} />}

              {/* Medical History Tab */}
              {activeTab === "history" && (
                <MedicalHistoryTab patient={selectedPatient} onAddHistory={() => setShowAddHistoryModal(true)} />
              )}

              {/* Lab Results Tab */}
              {activeTab === "labs" && (
                <LabResultsTab patient={selectedPatient} onAddLab={() => setShowAddLabModal(true)} />
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowViewModal(false)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && patientToDelete && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Patient Record</h2>
              <p className="modal-subtitle">This action cannot be undone</p>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
                <p style={{ color: "#6b7280", lineHeight: "1.6", fontSize: "16px" }}>
                  Are you sure you want to permanently delete this patient record? All medical information and history
                  will be lost forever.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => handleDeletePatient(patientToDelete)}
                className="btn"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  color: "white",
                  boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
                }}
              >
                Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Medical History Modal */}
      {showAddHistoryModal && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h2 className="modal-title">Add Medical History Entry</h2>
              <p className="modal-subtitle">Record a new medical history entry for the patient</p>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={historyFormData.date}
                    onChange={(e) => setHistoryFormData({ ...historyFormData, date: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Doctor</label>
                  <input
                    type="text"
                    value={historyFormData.doctor}
                    onChange={(e) => setHistoryFormData({ ...historyFormData, doctor: e.target.value })}
                    className="input"
                    placeholder="Dr. Smith"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Diagnosis <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={historyFormData.diagnosis}
                  onChange={(e) => setHistoryFormData({ ...historyFormData, diagnosis: e.target.value })}
                  className="input"
                  placeholder="Enter diagnosis"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Treatment</label>
                <textarea
                  value={historyFormData.treatment}
                  onChange={(e) => setHistoryFormData({ ...historyFormData, treatment: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Describe treatment provided"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  value={historyFormData.notes}
                  onChange={(e) => setHistoryFormData({ ...historyFormData, notes: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Additional notes or observations"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAddHistoryModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleAddMedicalHistory} className="btn btn-primary">
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lab Result Modal */}
      {showAddLabModal && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h2 className="modal-title">Add Lab Result</h2>
              <p className="modal-subtitle">Upload and record a new laboratory test result</p>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={labFormData.date}
                    onChange={(e) => setLabFormData({ ...labFormData, date: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Doctor</label>
                  <input
                    type="text"
                    value={labFormData.doctor}
                    onChange={(e) => setLabFormData({ ...labFormData, doctor: e.target.value })}
                    className="input"
                    placeholder="Dr. Smith"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Test Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={labFormData.testName}
                  onChange={(e) => setLabFormData({ ...labFormData, testName: e.target.value })}
                  className="input"
                  placeholder="e.g., Complete Blood Count, Lipid Panel"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Result</label>
                  <input
                    type="text"
                    value={labFormData.result}
                    onChange={(e) => setLabFormData({ ...labFormData, result: e.target.value })}
                    className="input"
                    placeholder="Test result value"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Normal Range</label>
                  <input
                    type="text"
                    value={labFormData.normalRange}
                    onChange={(e) => setLabFormData({ ...labFormData, normalRange: e.target.value })}
                    className="input"
                    placeholder="e.g., 70-100 mg/dL"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={labFormData.status}
                  onChange={(e) =>
                    setLabFormData({ ...labFormData, status: e.target.value as "Normal" | "Abnormal" | "Critical" })
                  }
                  className="input"
                >
                  <option value="Normal">Normal</option>
                  <option value="Abnormal">Abnormal</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Lab Report</label>
                <input
                  type="file"
                  onChange={(e) => setLabFormData({ ...labFormData, file: e.target.files?.[0] || null })}
                  className="input"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                  Supported formats: PDF, JPG, PNG, DOC, DOCX
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  value={labFormData.notes}
                  onChange={(e) => setLabFormData({ ...labFormData, notes: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Additional notes about the test results"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAddLabModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleAddLabResult} className="btn btn-primary">
                Add Result
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-container">
          <Toast message={toast.message} type={toast.type} onClose={closeToast} />
        </div>
      )}
    </div>
  )
}
