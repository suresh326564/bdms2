import React, { useState } from 'react';
import InputField from '../components/InputField';
import AlertBox from '../components/AlertBox';
import './RecipientRequest.css';

const RecipientRequest = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    units: 1,
    urgency: 'normal',
    hospital: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    reason: '',
    requiredDate: ''
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'emergency', label: 'Emergency (Within 2 hours)', color: 'red' },
    { value: 'urgent', label: 'Urgent (Within 24 hours)', color: 'orange' },
    { value: 'normal', label: 'Normal (Within 3 days)', color: 'green' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }

    if (!formData.hospital.trim()) {
      newErrors.hospital = 'Hospital name is required';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Contact email is invalid';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for blood requirement is required';
    }

    if (!formData.requiredDate) {
      newErrors.requiredDate = 'Required date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAlert({
        type: 'success',
        message: 'Blood request submitted successfully! We will contact you soon.'
      });
      
      // Reset form
      setFormData({
        patientName: '',
        bloodGroup: '',
        units: 1,
        urgency: 'normal',
        hospital: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        reason: '',
        requiredDate: ''
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to submit request. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    const level = urgencyLevels.find(u => u.value === urgency);
    return level ? level.color : 'green';
  };

  return (
    <div className="recipient-request-page">
      <div className="container">
        <div className="request-header">
          <h1>Request Blood</h1>
          <p>Submit a blood request for patients in need</p>
        </div>

        <div className="request-container">
          <div className="request-card card">
            {alert && (
              <AlertBox
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}

            <form onSubmit={handleSubmit} className="request-form">
              <div className="form-section">
                <h3>Patient Information</h3>
                <div className="form-grid">
                  <InputField
                    label="Patient Name"
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient's full name"
                    error={errors.patientName}
                    required
                  />

                  <div className="form-group">
                    <label className="form-label">Blood Group Required</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                    {errors.bloodGroup && (
                      <div className="error-message">{errors.bloodGroup}</div>
                    )}
                  </div>

                  <InputField
                    label="Units Required"
                    type="number"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                  />

                  <div className="form-group">
                    <label className="form-label">Urgency Level</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="form-select"
                      style={{ borderColor: getUrgencyColor(formData.urgency) }}
                    >
                      {urgencyLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Hospital Information</h3>
                <div className="form-grid">
                  <InputField
                    label="Hospital Name"
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    error={errors.hospital}
                    required
                  />

                  <InputField
                    label="Required Date"
                    type="date"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleChange}
                    error={errors.requiredDate}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-grid">
                  <InputField
                    label="Contact Person Name"
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Enter contact person name"
                    error={errors.contactName}
                    required
                  />

                  <InputField
                    label="Contact Phone"
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Enter contact phone number"
                    error={errors.contactPhone}
                    required
                  />

                  <InputField
                    label="Contact Email"
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Enter contact email"
                    error={errors.contactEmail}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Additional Information</h3>
                <div className="form-group">
                  <label className="form-label">Reason for Blood Requirement</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please describe the reason for blood requirement..."
                    className="form-textarea"
                    rows="4"
                  />
                  {errors.reason && (
                    <div className="error-message">{errors.reason}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-small"></div>
                    Submitting Request...
                  </>
                ) : (
                  'Submit Blood Request'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientRequest; 