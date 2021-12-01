import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footerFull">
        <h2>Todos os direitos reservados Grupo 6 Turma 15 A</h2>
        <div className="linkDevelopers">
          <a href="https://www.linkedin.com/in/luizfcmodolo/" rel="noreferrer">Luiz Modolo</a>
          <a href="https://github.com/marialaura27" rel="noreferrer">Maria Laura</a>
          <a href="https://github.com/thomazjeffersonlima" rel="noreferrer">Thomaz Lima</a>
          <a href="https://www.linkedin.com/in/vanessamrios/" rel="noreferrer">Vanessa Rios</a>
          <a href="https://github.com/vivianost" rel="noreferrer">Vivian Ost</a>
        </div>
      </div>
    );
  }
}

export default Footer;
