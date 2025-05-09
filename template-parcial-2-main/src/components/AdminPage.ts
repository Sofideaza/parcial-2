import { html, render } from 'lit-html';
import { store, Plant } from '../flux/Store';

class AdminPage extends HTMLElement {
  connectedCallback() {
    const { allPlants } = store.getState();
    render(html`
      <h2>Editar Plantas</h2>
      <div>
        ${allPlants.map(p => html`
          <div @click="${() => this.edit(p)}">${p.name}</div>
        `)}
      </div>
    `, this);
  }

  edit(plant: Plant) {
    const form = document.createElement('form');
    form.innerHTML = `
      <input value="${plant.name}" id="name" />
      <input value="${plant.scientificName}" id="sci" />
      <input value="${plant.image}" id="img" />
      <button type="submit">Guardar</button>
    `;
    form.onsubmit = e => {
      e.preventDefault();
      store.editPlant({
        id: plant.id,
        name: (form.querySelector('#name') as HTMLInputElement).value,
        scientificName: (form.querySelector('#sci') as HTMLInputElement).value,
        image: (form.querySelector('#img') as HTMLInputElement).value
      });
    };
    this.append(form);
  }
}
customElements.define('admin-page', AdminPage);
