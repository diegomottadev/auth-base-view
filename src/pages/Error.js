import React from 'react';

export const Error = () => {
    return (
        <div className="exception-body error">
            <div className="exception-panel"></div>

            <div className="exception-content">
                <img src="assets/layout/images/logo-black.png" alt="babylon-layout" />
                <h1>
                    <span className="exception-name">ERROR</span> OCCURRED
                </h1>
                <p>Something went wrong.</p>
                <a href="/#">Back to Dashboard</a>
            </div>
        </div>
    );
};
