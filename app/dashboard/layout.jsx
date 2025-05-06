import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div className="bg-[#ececff] min-h-screen w-full">
      <Header />
      <div className="max-w-7xl mx-auto p-5">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;
