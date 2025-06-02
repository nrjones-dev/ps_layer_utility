const { app } = window.require('photoshop');

// Helper function to execute photoshop as modal.
function executePhotoshopModal(callback, commandName) {
  return window.require('photoshop').core.executeAsModal(callback, { commandName });
}

// RENAME AND ADD SUFFIX/PREFIX FUNCTIONALITY
function getInputValue(selector, warningSelector) {
  const selectorValue = document.querySelector(selector).value;
  if (!selectorValue && !(warningSelector === 'replaceWarning')) {
    document.getElementById(warningSelector).innerHTML = 'Please enter text';
    return;
  }
  document.getElementById(warningSelector).innerHTML = '';
  return selectorValue;
}

function renameLayerNames() {
  const newName = getInputValue('#rename_layer_text', 'renameWarning');
  if (!newName) return;
  executePhotoshopModal(() => {
    app.activeDocument.activeLayers.forEach((layer) => (layer.name = newName));
  }, 'Rename layers');
}

function replaceText() {
  const textToRemove = getInputValue('#text_to_remove', 'replaceWarning');
  let textToAdd = getInputValue('#text_to_add', 'replaceWarning');
  if (!textToRemove) return;
  if (!textToAdd) textToAdd = '';

  executePhotoshopModal(() => {
    app.activeDocument.activeLayers.forEach((layer) => {
      layer.name = layer.name.replaceAll(textToRemove, textToAdd);
    });
  }, 'Replace Name');
}

function addAffix() {
  const affixText = getInputValue('#add_affix_text', 'affixWarning');
  if (!affixText) return;

  const affixType = document.querySelector('sp-radio-group[name="affixType"]').selected;

  executePhotoshopModal(() => {
    app.activeDocument.activeLayers.forEach((layer) => {
      if (affixType === 'prefix') {
        layer.name = `${affixText}${layer.name}`;
      } else if (affixType === 'suffix') {
        layer.name = `${layer.name}${affixText}`;
      }
    });
  }, 'Add Affix');
}

// DELETE EMPTY LAYERS FUNCTIONALITY //
async function isEmpty(layer) {
  if (layer.layers) {
    const results = await Promise.all(layer.layers.map(isEmpty));
    return results.every((result) => result);
  }
  const { left, right, top, bottom } = layer.bounds;
  return right - left === 0 || bottom - top === 0;
}

// Recursively collect names of empty layers.
async function collectEmptyLayers(layers, emptyLayers) {
  for (const layer of layers) {
    if (layer.layers) await collectEmptyLayers(layer.layers, emptyLayers);
    if (await isEmpty(layer)) emptyLayers.push(layer);
  }
}

async function selectEmpty() {
  const emptyLayers = [];
  await collectEmptyLayers(app.activeDocument.layers, emptyLayers);
  if (emptyLayers.length === 0) {
    document.getElementById('layerList').innerHTML = 'No empty layers to select';
    return;
  }
  document.getElementById('layerList').innerHTML = `
    <ul>${emptyLayers.map((layer) => `<li>${layer.name}</li>`).join('')}</ul>`;
}

async function deleteEmpty() {
  const emptyLayers = [];
  await collectEmptyLayers(app.activeDocument.layers, emptyLayers);

  if (emptyLayers.length === 0) {
    document.getElementById('layerList').innerHTML = 'No empty layers to delete';
    return;
  }
  const confirmed = window.confirm('Are you sure you want to delete empty layers?');
  if (!confirmed) return;

  await executePhotoshopModal(async () => {
    emptyLayers.forEach((layer) => layer.delete());
  }, 'Delete Layers');
  emptyLayers.length = 0;
  document.getElementById('layerList').innerHTML = 'Layers successfully deleted.';
}

// Adding event listeners to buttons
document.getElementById('btnRename').addEventListener('click', renameLayerNames);
document.getElementById('btnAffix').addEventListener('click', addAffix);
document.getElementById('btnReplace').addEventListener('click', replaceText);
document.getElementById('btnDeleteEmpty').addEventListener('click', deleteEmpty);
document.getElementById('btnSelectEmpty').addEventListener('click', selectEmpty);
