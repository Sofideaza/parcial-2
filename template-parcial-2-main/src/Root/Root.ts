import '../components/GardenPage';
import '../components/AdminPage';
import '../components/ModifyGardenPage';
import { store } from '../flux/Store';

class MainRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    window.addEventListener('stateChange', () => this.render());
  }

  render() {
    const state = store.getState();
    let content = '';
    switch (state.page) {
      case 'home': content = '<garden-page></garden-page>'; break;
      case 'modify': content = '<modify-garden-page></modify-garden-page>'; break;
      case 'admin': content = '<admin-page></admin-page>'; break;
    }
    this.shadowRoot!.innerHTML = `
      <nav>
        <button onclick="window.store.setPage('home')">Inicio</button>
        <button onclick="window.store.setPage('modify')">Modificar Jardín</button>
        <button onclick="window.store.setPage('admin')">Admin</button>
      </nav>
      ${content}
    `;
  }
}

customElements.define('main-root', MainRoot);
