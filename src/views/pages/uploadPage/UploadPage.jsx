import React from 'react'
import UploadComponent from '../../components/uploadComponent/UploadComponent'
import './uploadPage.scss'

export default function UploadPage() {
  return (
    <div className="upload-modal">
      <div className="upload-modal__position">
        <UploadComponent />
      </div>
    </div>
  )
}
