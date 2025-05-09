import { html, render } from 'lit-html';
import { store } from '../flux/Store';

class GardenPage extends HTMLElement {
  connectedCallback() {
    const { gardenPlants, allPlants } = store.getState();
    const filtered = allPlants
      .filter(p => gardenPlants.includes(p.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    render(html`
      <h2>Mi Jardín</h2>
      <div>
        ${filtered.map(p => html`
          <div>
            <img src="${p.image}" />
            <p>${p.name} (${p.scientificName})</p>
          </div>
        `)}
      </div>
    `, this);
  }
}
customElements.define('garden-page', GardenPage);
