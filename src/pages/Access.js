import React from 'react';

export const Access = () => {
    return (
        <div className="exception-body access-denied">
            <div className="exception-panel"></div>

            <div className="exception-content">
                <img src="assets/layout/images/logo-black.png" alt="babylon-layout" />
                <h1>
                    <span className="exception-name">ACCESS</span> DENIED
                </h1>
                <p>You don't have the necessary permissions.</p>
                <a href="/#">Back to Dashboard</a>
            </div>
        </div>
    );
};
