const React = require('react');

const Footer = () => (
    <div
        style={{
            position: 'fixed',
            bottom: 0,
            height: 20,
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'rgb(33, 32, 32)',
            borderTop: '1px solid rgb(59, 59, 59)',
            color: 'rgb(88, 88, 88)',
            textTransform: 'uppercase',
            paddingTop: 3,
            fontSize: 9,
        }}
    >
        <a
            href="http://juicy-js.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
        >
            Powered by Juicy
        </a>
    </div>
);

module.exports = Footer;
