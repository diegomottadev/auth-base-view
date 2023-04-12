import React, {  useEffect } from 'react';
import { Chart } from 'primereact/chart';


const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 9],
            borderColor: ['#7E57C2'],
            borderWidth: 3,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 3,
            tension: 0.4
        },
        {
            label: 'Income',
            data: [1, 2, 5, 3, 12, 7, 15],
            backgroundColor: ['rgba(187,222,251,0.2)'],
            borderColor: ['#42A5F5'],
            borderWidth: 3,
            fill: true,
            tension: 0.4
        },
        {
            label: 'Expenses',
            data: [7, 12, 15, 5, 3, 13, 21],
            borderColor: ['#FFB300'],
            borderWidth: 3,
            fill: false,
            pointRadius: [4, 6, 4, 12, 8, 0, 4],
            tension: 0.4
        },
        {
            label: 'New Users',
            data: [3, 7, 2, 17, 15, 13, 19],
            borderColor: ['#66BB6A'],
            borderWidth: 3,
            fill: false,
            tension: 0.4
        }
    ]
};

const chartOptions = {
    responsive: true,
    hover: {
        mode: 'index'
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Month'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Value'
            }
        }
    }
};

const Dashboard = () => {

    useEffect(() => {
        
    }, []);

    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-dollar"></i>
                        <span className="overview-title">Sales</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">$ 92,440</div>
                        <div className="overview-subinfo">21% more than yesterday</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box views">
                        <i className="overview-icon pi pi-search"></i>
                        <span className="overview-title">Views</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">7029</div>
                        <div className="overview-subinfo">2% more than yesterday</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box users">
                        <i className="overview-icon pi pi-users"></i>
                        <span className="overview-title">Users</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">9522</div>
                        <div className="overview-subinfo">7% more than yesterday</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box checkin">
                        <i className="overview-icon pi pi-map-marker"></i>
                        <span className="overview-title">Check-Ins</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">4211</div>
                        <div className="overview-subinfo">18% more than yesterday</div>
                    </div>
                </div>

                <div className="col-12 lg:col-8">
                    <div className="card card-w-title statistics">
                        <h5>Statistics</h5>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="user-card card">
                        
                        <div className="user-card-content">
                            <div className="user-detail">
                                <ul>
                                    <li className="clearfix">
                                        <i className="pi pi-list"></i>
                                        <span className="project-title">Tasks</span>
                                        <span className="project-detail">3 open</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '50%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-dollar"></i>
                                        <span className="project-title">Revenue</span>
                                        <span className="project-detail">+20%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '20%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Payments</span>
                                        <span className="project-detail">24 new</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '65%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-users"></i>
                                        <span className="project-title">Clients</span>
                                        <span className="project-detail">+80%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '80%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Sales</span>
                                        <span className="project-detail">+45</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '45%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-chart-bar"></i>
                                        <span className="project-title">Performance</span>
                                        <span className="project-detail">+75</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '75%' }}></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 xl:col-12">
                    <div className="card card-w-title timeline">
                        <h5>Timeline</h5>
                        <ul>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-globe"></i>
                                </div>
                                <div className="timeline-content">
                                    <h3>Notes Added</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit tortor a ipsum vehicula, in semper sapien auctor.</p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>3 Sep 2018 at 10:41</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-calendar"></i>
                                </div>
                                <div className="timeline-content">
                                    <h3>Reminder Scheduled</h3>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                        explicabo.
                                    </p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>4 Sep 2018 at 11:30</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-image"></i>
                                </div>
                                <div className="timeline-content">
                                    <div className="child">
                                        <div>
                                            <span>3 Photos Added to</span>
                                            <span className="colorful">Album-23</span>
                                        </div>
                                        <img src="assets/layout/images/dashboard/image-1.png" alt="babylon-layout" />
                                        <img src="assets/layout/images/dashboard/image-2.png" alt="babylon-layout" />
                                        <img src="assets/layout/images/dashboard/image-3.png" alt="babylon-layout" />
                                        <div className="timeline-footer">
                                            <i className="pi pi-clock"></i>
                                            <span>9 Sep 2018 at 00:44</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-image"></i>
                                </div>
                                <div className="timeline-content">
                                    <div className="child">
                                        <h3>Location Update</h3>
                                        <img src="assets/layout/images/dashboard/antalya.png" alt="babylon-layout" style={{ width: '100%' }} />
                                        <div className="timeline-footer">
                                            <i className="pi pi-clock"></i>
                                            <span>16 Sep 2018 at 20:02</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
