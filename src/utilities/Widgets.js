import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';

export const Widgets = () => {
    const [tasksCheckbox, setTasksCheckbox] = useState([]);

    const onCheckboxChange = (e) => {
        let selectedValue = [...tasksCheckbox];
        if (e.checked) selectedValue.push(e.value);
        else selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setTasksCheckbox(selectedValue);
    };

    return (
        <div className="grid">
            <h4>Reusable CSS widgets for your applications.</h4>
            <div className="col-12">
                <div className="card">
                    <h4>Overview Boxes</h4>
                    <div className="grid">
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="widget-overview-box sales">
                                <i className="overview-icon pi pi-dollar"></i>
                                <span className="overview-title">Sales</span>
                                <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                <div className="overview-numbers">$ 92,440</div>
                                <div className="overview-subinfo">21% more than yesterday</div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="widget-overview-box views">
                                <i className="overview-icon pi pi-search"></i>
                                <span className="overview-title">Views</span>
                                <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                <div className="overview-numbers">7029</div>
                                <div className="overview-subinfo">2% more than yesterday</div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="widget-overview-box users">
                                <i className="overview-icon pi pi-users"></i>
                                <span className="overview-title">Users</span>
                                <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                <div className="overview-numbers">9522</div>
                                <div className="overview-subinfo">7% more than yesterday</div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <div className="widget-overview-box checkin">
                                <i className="overview-icon pi pi-map-marker"></i>
                                <span className="overview-title">Check-Ins</span>
                                <i className="overview-arrow pi pi-chevron-circle-up"></i>
                                <div className="overview-numbers">4211</div>
                                <div className="overview-subinfo">18% more than yesterday</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-5">
                <div className="grid">
                    <div className="col-12">
                        <div className="card widget-timeline">
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

            <div className="col-12 xl:col-7">
                <div className="grid">
                    <div className="col-12 xl:col-6">
                        <div className="card widget-tasks">
                            <h5>Tasks</h5>
                            <ul>
                                <li>
                                    <Checkbox name="task" value="reports" checked={tasksCheckbox.indexOf('reports') !== -1} onChange={onCheckboxChange} />
                                    <span>Sales Reports</span>
                                    <span className="task-badge red"></span>
                                </li>
                                <li>
                                    <Checkbox name="task" value="pay" checked={tasksCheckbox.indexOf('pay') !== -1} onChange={onCheckboxChange} />
                                    <span>Pay Invoices</span>
                                    <span className="task-badge orange"></span>
                                </li>
                                <li>
                                    <Checkbox name="task" value="dinner" checked={tasksCheckbox.indexOf('dinner') !== -1} onChange={onCheckboxChange} />
                                    <span>Kate's Birthday</span>
                                    <span className="task-badge orange"></span>
                                </li>
                                <li>
                                    <Checkbox name="task" value="meeting" checked={tasksCheckbox.indexOf('meeting') !== -1} onChange={onCheckboxChange} />
                                    <span>Client Meeting</span>
                                    <span className="task-badge green"></span>
                                </li>
                                <li>
                                    <Checkbox name="task" value="theme" checked={tasksCheckbox.indexOf('theme') !== -1} onChange={onCheckboxChange} />
                                    <span>New Themes</span>
                                    <span className="task-badge green"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6">
                        <div className="card widget-team">
                            <h5>Team</h5>
                            <ul>
                                <li>
                                    <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                    <div className="team-box">
                                        <span className="team-member">Arlene Welch</span>
                                        <span className="team-member-role">Design</span>
                                    </div>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-comment"></i>
                                    </button>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-share-alt"></i>
                                    </button>
                                </li>
                                <li>
                                    <img src="assets/layout/images/avatar-john.png" alt="babylon-layout" />
                                    <div className="team-box">
                                        <span className="team-member">John Swisher</span>
                                        <span className="team-member-role">Development</span>
                                    </div>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-comment"></i>
                                    </button>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-share-alt"></i>
                                    </button>
                                </li>
                                <li>
                                    <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                    <div className="team-box">
                                        <span className="team-member">Warren Shaw</span>
                                        <span className="team-member-role">Sales</span>
                                    </div>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-comment"></i>
                                    </button>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-share-alt"></i>
                                    </button>
                                </li>
                                <li>
                                    <img src="assets/layout/images/avatar-kevin.png" alt="babylon-layout" />
                                    <div className="team-box">
                                        <span className="team-member">Kevin Lane</span>
                                        <span className="team-member-role">Marketing</span>
                                    </div>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-comment"></i>
                                    </button>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-share-alt"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card widget-live-support">
                            <h5>Live Support</h5>
                            <ul>
                                <li>
                                    <div className="grid">
                                        <div className="col-fixed">
                                            <img src="assets/layout/images/avatar-john.png" alt="babylon-layout" />
                                        </div>
                                        <div className="col">
                                            <div className="chat-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac euismod justo, eget blandit purus.</div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="grid">
                                        <div className="col">
                                            <div className="chat-message">Mauris malesuada quis risus ut consequat. Maecenas ornare nunc risus, pulvinar euismod mi pellentesque eget.</div>
                                        </div>
                                        <div className="col-fixed">
                                            <img src="assets/layout/images/avatar-julia.png" alt="babylon-layout" />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="grid">
                                        <div className="col-fixed">
                                            <img src="assets/layout/images/avatar-john.png" alt="babylon-layout" />
                                        </div>
                                        <div className="col">
                                            <div className="chat-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac euismod justo, eget blandit purus.</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card widget-user-card">
                            <div className="user-card-header">
                                <img src="assets/layout/images/dashboard/bg-header.png" alt="babylon-layout" className="profile-image" />
                            </div>
                            <div className="user-card-content">
                                <img src="assets/layout/images/avatar.png" alt="babylon-layout" />
                                <Button icon="pi pi-plus" />

                                <div className="user-card-name">
                                    <span>Arlene Welch</span>
                                </div>

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
                </div>
            </div>

            <div className="col-12 lg:col-4">
                <div className="card p-fluid widget-resolution-center">
                    <h5>Support Request</h5>

                    <label htmlFor="resolution-firstname">Fistname</label>
                    <InputText id="resolution-firstname" type="text" placeholder="Name" />

                    <label htmlFor="resolution-lastname">Lastname</label>
                    <InputText id="resolution-lastname" type="text" placeholder="Name" />

                    <label htmlFor="resolution-message">Message</label>
                    <InputTextarea id="resolution-message" placeholder="Message"></InputTextarea>

                    <div className="resolution-button-bar">
                        <Button label="Save Draft" className="p-button-secondary" icon="pi pi-plus"></Button>
                        <Button label="Send" icon="pi pi-check"></Button>
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-4">
                <div className="card">
                    <h4>Image List</h4>

                    <ul className="widget-image-list">
                        <li>
                            <span>Product</span>
                            <span>Sales</span>
                        </li>
                        <li>
                            <span>
                                <img src="assets/demo/images/product/bamboo-watch.jpg" alt="babylon-layout" />
                                <span>Bamboo Watch</span>
                            </span>
                            <span className="listitem-value">82</span>
                        </li>
                        <li>
                            <span>
                                <img src="assets/demo/images/product/blue-band.jpg" alt="babylon-layout" />
                                <span>Blue Band</span>
                            </span>
                            <span className="listitem-value">75</span>
                        </li>
                        <li>
                            <span>
                                <img src="assets/demo/images/product/game-controller.jpg" alt="babylon-layout" />
                                <span>Game Controller</span>
                            </span>
                            <span className="listitem-value">64</span>
                        </li>
                        <li>
                            <span>
                                <img src="assets/demo/images/product/lime-band.jpg" alt="babylon-layout" />
                                <span>Lime Band</span>
                            </span>
                            <span className="listitem-value">62</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="col-12 lg:col-4">
                <div className="widget-pricing-box">
                    <h3>Professional</h3>
                    <span className="pricing-intro">Starting From</span>
                    <h3>10$ per month</h3>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ex condimentum, bibendum ligula a, ultrices magna.</p>
                    <ul>
                        <li> Responsive</li>
                        <li> Push Messages</li>
                        <li> 10 Support Tickets</li>
                        <li> Free Shipping</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
