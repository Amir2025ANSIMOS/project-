import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm"
      style={{
        backgroundColor: "#121212",
        direction: "rtl"
      }}
    >
      <div className="container">

        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
        >
          <div className="text-end">
            <span
              className="fw-bold fs-4"
              style={{ color: "#fff" }}
            >
              عدسة
            </span>

            <div
              className="text-muted"
              style={{ fontSize: "0.75rem" }}
            >
              عالم التصوير الفوتوغرافي
            </div>
          </div>

          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#ffc107",
              color: "#000"
            }}
          >
            📷
          </div>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-3">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${
                    isActive
                      ? "bg-warning text-dark fw-bold"
                      : "text-white"
                  }`
                }
              >
                الرئيسية
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Blog"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${
                    isActive
                      ? "bg-warning text-dark fw-bold"
                      : "text-white"
                  }`
                }
              >
                المدونة
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to=""
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${
                    isActive
                      ? "bg-warning text-dark fw-bold"
                      : "text-white"
                  }`
                }
              >
                من نحن
              </NavLink>
            </li>

          </ul>
        </div>

        <div className="d-none d-lg-flex align-items-center gap-3">

          <button
            className="btn btn-dark text-white rounded-circle p-2 border-secondary"
            style={{
              width: "40px",
              height: "40px"
            }}
          >
            🔍
          </button>

          <Link
            to="/Blog"
            className="btn rounded-pill px-4 fw-bold"
            style={{
              backgroundColor: "#ffc107",
              color: "#000"
            }}
          >
            ابدأ القراءة
          </Link>

        </div>

      </div>
    </nav>
  );
}