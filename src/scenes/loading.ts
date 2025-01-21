import * as ex from 'excalibur';
import { Resources } from '../resources';
import { logo } from '../images/logo';

export const loader = new ex.Loader();
//the logo has to be a base 64 string...
loader.logo = logo;
//the positioning is sensitive, and it seems like the loading bar is parented to the logo.......
loader.logoPosition = ex.vec(450, 20);
loader.loadingBarPosition = ex.vec(250,200)
loader.backgroundColor = '#003494'
loader.playButtonText = 'Play!'

function loadResourcesRecursively(resource: any, loader: ex.Loader): void {
  // Base case: if resource is Sound or ImageSource, load it
  if (resource instanceof ex.Sound || resource instanceof ex.ImageSource) {
      loader.addResource(resource);
      return;
  }

  // If we have an array, process each element
  if (Array.isArray(resource)) {
      resource.forEach(item => loadResourcesRecursively(item, loader));
      return;
  }

  // If we have an object, process each value
  if (resource && typeof resource === 'object') {
      Object.values(resource).forEach(value => loadResourcesRecursively(value, loader));
      return;
  }
}


loadResourcesRecursively(Resources, loader);