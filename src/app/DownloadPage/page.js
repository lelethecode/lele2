// pages/download.js
import React from 'react';

const DownloadPage = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('https://app-cjhj.onrender.com/export_excel', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }
cd
      // Extract the file from response as a Blob and create a downloadable link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'contacts_data.xlsx';
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div>
      <h1>Download Contacts Data</h1>
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default DownloadPage;
