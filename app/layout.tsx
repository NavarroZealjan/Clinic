/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>MedCare - Patient Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              color: #2d3748;
              line-height: 1.6;
              min-height: 100vh;
            }
            
            .container {
              max-width: 1400px;
              margin: 0 auto;
              padding: 32px 24px;
            }
            
            .header-card {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 20px;
              padding: 40px;
              margin-bottom: 32px;
              box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
              color: white;
            }
            
            .card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 16px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
              margin-bottom: 24px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .card-content {
              padding: 32px;
            }
            
            .page-title {
              font-size: 42px;
              font-weight: 700;
              margin-bottom: 8px;
              background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .page-subtitle {
              font-size: 18px;
              opacity: 0.9;
              font-weight: 300;
            }
            
            .header-actions {
              display: flex;
              gap: 16px;
              align-items: center;
              margin-top: 24px;
            }
            
            .btn {
              display: inline-flex;
              align-items: center;
              gap: 12px;
              padding: 14px 24px;
              border: none;
              border-radius: 12px;
              font-size: 15px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              text-decoration: none;
              position: relative;
              overflow: hidden;
            }
            
            .btn::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              transition: left 0.5s;
            }
            
            .btn:hover::before {
              left: 100%;
            }
            
            .btn-primary {
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
            }
            
            .btn-primary:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
            }
            
            .btn-secondary {
              background: rgba(255, 255, 255, 0.9);
              color: #4a5568;
              border: 1px solid rgba(255, 255, 255, 0.3);
              backdrop-filter: blur(10px);
            }
            
            .btn-secondary:hover {
              background: rgba(255, 255, 255, 1);
              transform: translateY(-1px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            
            .search-container {
              position: relative;
              max-width: 600px;
              margin: 0 auto;
            }
            
            .search-input {
              width: 100%;
              padding: 18px 24px 18px 56px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-radius: 16px;
              font-size: 16px;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
            }
            
            .search-input:focus {
              outline: none;
              border-color: #4f46e5;
              box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
              background: rgba(255, 255, 255, 1);
            }
            
            .search-icon {
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 20px;
              color: #9ca3af;
            }
            
            .patient-card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 16px;
              padding: 32px;
              margin-bottom: 20px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
              transition: all 0.3s ease;
            }
            
            .patient-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
            }
            
            .patient-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 24px;
            }
            
            .patient-info {
              flex: 1;
            }
            
            .patient-avatar {
              width: 64px;
              height: 64px;
              border-radius: 16px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: 600;
              margin-right: 20px;
              flex-shrink: 0;
            }
            
            .patient-name {
              font-size: 24px;
              font-weight: 600;
              color: #1a202c;
              margin-bottom: 8px;
            }
            
            .patient-details {
              color: #718096;
              margin-bottom: 12px;
              font-size: 15px;
            }
            
            .patient-contact {
              color: #4a5568;
              font-size: 14px;
              display: flex;
              align-items: center;
              gap: 16px;
            }
            
            .patient-actions {
              display: flex;
              gap: 12px;
              flex-shrink: 0;
            }
            
            .action-btn {
              width: 48px;
              height: 48px;
              border: none;
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              position: relative;
              overflow: hidden;
            }
            
            .action-btn::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(255, 255, 255, 0.2);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            
            .action-btn:hover::before {
              opacity: 1;
            }
            
            .action-btn:hover {
              transform: translateY(-2px);
            }
            
            .btn-view {
              background: linear-gradient(135deg, #d4f4dd 0%, #a7f3d0 100%);
              color: #065f46;
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
            }
            
            .btn-edit {
              background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
              color: #1e40af;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
            }
            
            .btn-delete {
              background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
              color: #dc2626;
              box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
            }
            
            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              z-index: 1000;
              animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            .modal-content {
              background: rgba(255, 255, 255, 0.98);
              backdrop-filter: blur(20px);
              border-radius: 20px;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
              max-width: 700px;
              width: 100%;
              max-height: 90vh;
              overflow-y: auto;
              border: 1px solid rgba(255, 255, 255, 0.3);
              animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
              from { 
                opacity: 0;
                transform: translateY(30px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .modal-header {
              padding: 32px 32px 24px;
              border-bottom: 1px solid rgba(226, 232, 240, 0.5);
            }
            
            .modal-title {
              font-size: 28px;
              font-weight: 700;
              color: #1a202c;
              margin-bottom: 8px;
            }
            
            .modal-subtitle {
              color: #718096;
              font-size: 16px;
              font-weight: 400;
            }
            
            .modal-body {
              padding: 32px;
            }
            
            .modal-footer {
              padding: 24px 32px 32px;
              border-top: 1px solid rgba(226, 232, 240, 0.5);
              display: flex;
              gap: 16px;
              justify-content: flex-end;
            }
            
            .form-group {
              margin-bottom: 24px;
            }
            
            .form-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 24px;
            }
            
            .form-label {
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .required {
              color: #ef4444;
            }
            
            .input {
              width: 100%;
              padding: 16px 20px;
              border: 2px solid rgba(226, 232, 240, 0.8);
              border-radius: 12px;
              font-size: 16px;
              background: rgba(255, 255, 255, 0.9);
              transition: all 0.3s ease;
              font-family: inherit;
            }
            
            .input:focus {
              outline: none;
              border-color: #4f46e5;
              box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
              background: rgba(255, 255, 255, 1);
            }
            
            .empty-state {
              text-align: center;
              padding: 80px 40px;
              color: #718096;
            }
            
            .empty-state-icon {
              font-size: 64px;
              margin-bottom: 24px;
              opacity: 0.5;
            }
            
            .empty-state h3 {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 12px;
              color: #4a5568;
            }
            
            .empty-state p {
              font-size: 16px;
              color: #9ca3af;
              max-width: 400px;
              margin: 0 auto;
            }
            
            /* Toast Notification Styles */
            .toast-container {
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 10000;
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
            
            .toast {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 12px;
              padding: 16px 24px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
              display: flex;
              align-items: center;
              gap: 12px;
              min-width: 280px;
              max-width: 350px;
              border: 1px solid rgba(255, 255, 255, 0.3);
              transform: translateX(100%);
              opacity: 0;
              animation: slideInRight 0.4s forwards, fadeOut 0.3s forwards 2.5s;
            }
            
            .toast.error {
              background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
              color: #dc2626;
              border-color: rgba(252, 165, 165, 0.5);
            }
            
            .toast.success {
              background: linear-gradient(135deg, #d4f4dd 0%, #a7f3d0 100%);
              color: #065f46;
              border-color: rgba(16, 185, 129, 0.5);
            }
            
            .toast-icon {
              font-size: 24px;
              flex-shrink: 0;
            }
            
            .toast-message {
              font-size: 15px;
              font-weight: 500;
              flex-grow: 1;
            }
            
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            
            @media (max-width: 768px) {
              .container {
                padding: 20px 16px;
              }
              
              .header-card {
                padding: 24px;
              }
              
              .page-title {
                font-size: 28px;
              }
              
              .header-actions {
                flex-direction: column;
                gap: 12px;
              }
              
              .btn {
                width: 100%;
                justify-content: center;
              }
              
              .form-row {
                grid-template-columns: 1fr;
              }
              
              .patient-header {
                flex-direction: column;
                gap: 20px;
              }
              
              .patient-actions {
                align-self: stretch;
                justify-content: center;
              }
              
              .modal-content {
                margin: 10px;
                max-height: calc(100vh - 20px);
              }
              
              .modal-header,
              .modal-body,
              .modal-footer {
                padding: 20px;
              }

              .toast-container {
                top: auto;
                bottom: 20px;
                right: 50%;
                transform: translateX(50%);
                width: calc(100% - 40px);
                align-items: center;
              }

              .toast {
                width: 100%;
                max-width: 400px;
              }
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
