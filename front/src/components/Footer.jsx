import React from 'react';

const Footer = () => {
  //  특정 페이지에서 지움 (수정필요)
  if (window.location.pathname === '/login') return null;

  return <div className="bg-slate-600">Footer</div>;
};

export default Footer;
