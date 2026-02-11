// import React from 'react';
// import { mockUsers } from '../../utils/mockData';
// import './AdminDashboard.css';

// const AdminUsers = () => {
//     return (
//         <div className="dashboard-page">
//             <div className="container">
//                 <h1>All Users</h1>

//                 <div className="user-breakdown">
//                     {Object.entries(mockUsers).map(([role, users]) => (
//                         <div key={role} className="breakdown-card">
//                             <h3>{role.toUpperCase()}</h3>
//                             <p>{users.length} users</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminUsers;

import React, { useState } from "react";
import "./AdminUsers.css";

const mockUsers = [
    { id: "U6642001", name: "Shune L.", lastLogin: "2 min ago", courses: 10, status: "Active" },
    { id: "U6642042", name: "Myat K.", lastLogin: "5 min ago", courses: 3, status: "Active" },
    { id: "U6642005", name: "Yoon H.", lastLogin: "1 day ago", courses: 5, status: "Inactive" },
    { id: "U6726115", name: "Hsu M.", lastLogin: "10 days ago", courses: 8, status: "Inactive" },
    { id: "U6642062", name: "Thar L.", lastLogin: "1 month ago", courses: 8, status: "Inactive" },
];

const AdminUsers = () => {
    const [search, setSearch] = useState("");

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-users-page">
            <div className="container">
                <h1>General User (Students) Oversight</h1>

                {/* Search Section */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Name, User ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>Search</button>
                </div>

                {/* Table */}
                <div className="users-table">
                    <div className="table-header">
                        <span>USER ID</span>
                        <span>NAME</span>
                        <span>LAST LOGIN</span>
                        <span>ENROLLED COURSES</span>
                        <span>STATUS</span>
                        <span>ACTIONS</span>
                    </div>

                    {filteredUsers.map((user) => (
                        <div key={user.id} className="table-row">
                            <span>{user.id}</span>
                            <span>{user.name}</span>
                            <span>{user.lastLogin}</span>
                            <span>{user.courses}</span>
                            <span>
                                <span className={`status ${user.status.toLowerCase()}`}>
                                    {user.status}
                                </span>
                            </span>
                            <span className="actions">
                                <button className="view-btn">View Profile</button>
                                <button className="ban-btn">Ban</button>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;