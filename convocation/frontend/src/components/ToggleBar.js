import React from 'react'

export default function ToggleBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <button id="sidebar-toggler" className="sidebar-toggle">
          <span className="sr-only">Toggle navigation</span>
        </button>
      </nav>
    </div>
  )
}
