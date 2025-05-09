export interface Plant {
    id: string;
    name: string;
    scientificName: string;
    image: string;
  }
  
  interface GardenState {
    page: 'home' | 'modify' | 'admin';
    gardenName: string;
    gardenPlants: string[];
    allPlants: Plant[];
  }
  
  class Store {
    private state: GardenState = {
      page: 'home',
      gardenName: 'Mi Jardín',
      gardenPlants: [],
      allPlants: [
        { id: '1', name: 'Rosal', scientificName: 'Rosa spp.', image: 'https://via.placeholder.com/100' },
        { id: '2', name: 'Helecho', scientificName: 'Nephrolepis exaltata', image: 'https://via.placeholder.com/100' }
      ]
    };
  
    getState() {
      return this.state;
    }
  
    setPage(page: GardenState['page']) {
      this.state.page = page;
      this.emit();
    }
  
    togglePlantInGarden(id: string) {
      const idx = this.state.gardenPlants.indexOf(id);
      if (idx >= 0) this.state.gardenPlants.splice(idx, 1);
      else this.state.gardenPlants.push(id);
      this.emit();
    }
  
    renameGarden(name: string) {
      this.state.gardenName = name;
      this.emit();
    }
  
    editPlant(plant: Plant) {
      const index = this.state.allPlants.findIndex(p => p.id === plant.id);
      if (index !== -1) {
        this.state.allPlants[index] = plant;
        this.emit();
      }
    }
  
    private emit() {
      window.dispatchEvent(new Event('stateChange'));
    }
  }
  
  export const store = new Store();
  (window as any).store = store;
  