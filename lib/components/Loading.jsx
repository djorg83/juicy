const React = require('react');

const Loading = () => (
    <div style={{
        position: 'absolute',
        top: 'calc(50% - 80px)',
        left: 'calc(50% - 80px)',
        zIndex: '10000',
        backgroundColor: '#fff',
        height: '160px',
        paddingTop: '32px',
        width: '160px',
        textAlign: 'center',
        borderRadius: '100px',
        border: '10px solid #3268c4',
    }}
    >
        <div style={{
            position: 'absolute',
            top: 28,
            left: 23,
            color: '#3367c4',
        }}
        >
            Loading...
        </div>
        <img src="./images/loading.gif" alt="loading" />
    </div>
);

module.exports = Loading;
