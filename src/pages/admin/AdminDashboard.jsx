import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { mockUsers, mockCourses, mockSystemStats, mockCategories, mockReports } from '../../utils/mockData';
import {
    Users, BookOpen, TrendingUp, DollarSign,
    AlertCircle, CheckCircle, Activity, Award
} from 'lucide-react';
import '../student/StudentDashboard.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const stats = mockSystemStats;
    const navigate = useNavigate();

    const totalUsers = Object.values(mockUsers).reduce((acc, arr) => acc + arr.length, 0);
    const pendingReports = mockReports.filter(r => r.status === 'pending').length;

    const systemStats = [
        {
            icon: Users,
            label: 'Total Users',
            value: stats.totalUsers,
            // change: '+12%',
            color: 'primary'
        },
        {
            icon: BookOpen,
            label: 'Total Courses',
            value: stats.totalCourses,
            // change: '+8%',
            color: 'success'
        },
        {
            icon: TrendingUp,
            label: 'Enrollments',
            value: stats.totalEnrollments,
            // change: '+23%',
            color: 'warning'
        },
        {
            icon: DollarSign,
            label: 'Revenue',
            value: `$${(stats.revenue / 1000).toFixed(1)}k`,
            // change: '+15%',
            color: 'accent'
        }
    ];

    const userBreakdown = [
        { label: 'Students', count: mockUsers.students.length, color: 'var(--primary)' },
        { label: 'Instructors', count: mockUsers.instructors.length, color: 'var(--success)' },
        { label: 'Admins', count: mockUsers.admins.length, color: 'var(--warning)' }
    ];

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header animate-fade-in">
                    <div>
                        <h1>Admin Dashboard </h1>
                        <p>Monitor and manage your entire platform</p>
                    </div>
                    <div className="header-badges">
                        <div className="badge-item">
                            <Activity size={18} />
                            <span>{stats.activeUsers} Active Users</span>
                        </div>
                    </div>
                </div>

                {/* System Stats */}
                <div className="stats-grid">
                    {systemStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="stat-card animate-slide-in-left"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`stat-icon stat-icon-${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="stat-content">
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                                <div className="stat-change positive">{stat.change}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="admin-content">
                    {/* User Management Overview */}
                    <section className="section">
                        <div className="section-title">
                            <h2>User Management</h2>
                            <a href="/admin/users" className="view-all">Manage Users</a>
                        </div>

                        <div className="user-breakdown">
                            {userBreakdown.map((item, index) => (
                                <div key={index} className="breakdown-card">
                                    <div className="breakdown-header">
                                        <h3>{item.label}</h3>
                                        <span className="breakdown-count">{item.count}</span>
                                    </div>
                                    <div className="breakdown-bar">
                                        <div
                                            className="breakdown-fill"
                                            style={{
                                                width: `${(item.count / totalUsers) * 100}%`,
                                                background: item.color
                                            }}
                                        ></div>
                                    </div>
                                    <p className="breakdown-percentage">
                                        {Math.round((item.count / totalUsers) * 100)}% of total users
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Course Categories */}
                    {/* <section className="section">
                        <div className="section-title">
                            <h2>Course Categories</h2>
                            <a href="/admin/courses" className="view-all">Manage Courses</a>
                        </div>

                        <div className="categories-grid">
                            {mockCategories.map((category) => (
                                <div key={category.id} className="category-card">
                                    <BookOpen size={24} />
                                    <div>
                                        <h4>{category.name}</h4>
                                        <p>{category.count} courses</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section> */}

                    {/* Reports & Alerts */}
                    <section className="section">
                        <div className="section-title">
                            <h2>Reports & Complaints</h2>
                            <Link to="/admin/reports" className="view-all">
                                View All
                            </Link>
                        </div>

                        <div className="reports-list">
                            {mockReports.slice(0, 5).map((report) => (
                                <div key={report.id} className={`report-item ${report.status}`}>
                                    <div className="report-icon">
                                        {report.status === 'pending' ? (
                                            <AlertCircle size={24} />
                                        ) : (
                                            <CheckCircle size={24} />
                                        )}
                                    </div>
                                    <div className="report-content">
                                        <div className="report-header">
                                            <h4>{report.subject}</h4>
                                            <span className={`status-badge ${report.status}`}>
                                                {report.status}
                                            </span>
                                        </div>
                                        <p>{report.description}</p>
                                        <div className="report-meta">
                                            <span>Reported by: {report.userName}</span>
                                            <span>{report.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Platform Health */}
                    <section className="section">
                        <div className="section-title">
                            <h2>Platform Health</h2>
                        </div>

                        <div className="health-grid">
                            <div className="health-card">
                                <div className="health-header">
                                    <h3>Completion Rate</h3>
                                    <span className="health-value">{stats.completionRate}%</span>
                                </div>
                                <div className="health-bar">
                                    <div
                                        className="health-fill"
                                        style={{ width: `${stats.completionRate}%` }}
                                    ></div>
                                </div>
                                <p>Students completing enrolled courses</p>
                            </div>

                            <div className="health-card">
                                <div className="health-header">
                                    <h3>Active Users</h3>
                                    <span className="health-value">{Math.round((stats.activeUsers / stats.totalUsers) * 100)}%</span>
                                </div>
                                <div className="health-bar">
                                    <div
                                        className="health-fill"
                                        style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
                                    ></div>
                                </div>
                                <p>Users active in last 30 days</p>
                            </div>

                            <div className="health-card">
                                <div className="health-header">
                                    <h3>Pending Reports</h3>
                                    <span className="health-value">{pendingReports}</span>
                                </div>
                                <p>Issues awaiting resolution</p>
                                {pendingReports > 0 && (
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => navigate('/admin/reports?status=pending')}
                                    >
                                        <AlertCircle size={16} />
                                        Review Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;