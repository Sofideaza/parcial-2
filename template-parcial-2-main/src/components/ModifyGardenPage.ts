import { html, render } from 'lit-html';
import { store } from '../flux/Store';

class ModifyGardenPage extends HTMLElement {
  connectedCallback() {
    const { allPlants, gardenPlants, gardenName } = store.getState();

    render(html`
      <h2>Modificar Jardín</h2>
      <input
        value="${gardenName}"
        @input="${(e: any) => store.renameGarden(e.target.value)}"
      />
      <div>
        ${allPlants.map(p => html`
          <div
            style="opacity: ${gardenPlants.includes(p.id) ? 1 : 0.4}"
            @click="${() => store.togglePlantInGarden(p.id)}"
          >
            <img src="${p.image}" />
            <p>${p.name}</p>
          </div>
        `)}
      </div>
    `, this);
  }
}
customElements.define('modify-garden-page', ModifyGardenPage);
