# PS: Layer Utility

![Layer_utility](https://github.com/user-attachments/assets/d1dd5769-7c8a-48a2-b9c4-e3eee13b55ad)

## What is it useful for?

This is a plugin for Photoshop that allows you to:

- Add suffix or prefix
- Rename all selected layers
- Search and replace layer names
- List and delete all empty layers

## How to use it

To install this plugin, you can either package the files yourself using Adobe UXP, or double click the package file with extension .ccx

Once a plugin is installed, it can be found in the Plugins dropdown.

**Plugins > Layer Utilities > Layer Utilities**

Once open, you can use this tool's interface in the same manner as other Photoshop panels, allowing you to resize (within limits), collapse and dock to the side bar.

In order to install this tool, please follow the setup guide for photoshop plugins in **PHOTOSHOP: Plugins**

This Plugin is called: `nrj.layer-utility_PS.ccx`

## Features

### Add Suffix or Prefix

The first function of this tool is to add either a 'suffix' or 'prefix' of your choosing.

1. First select the radial options for either a suffix or a prefix.
2. Type in your chosen prefix or suffix. This will be taken literally, so please include some form of separation. I.e. '_' or '-' or simply a space ' '. This should either look like '_OLD' or 'OLD_' for a prefix and suffix respectively.
3. Select a Layer or Layers.
4. Press the 'Add Affix' button.

All selected layers should now have this affix applied.

### Rename all selected layers

This function is to rename all selected layers to the text string entered in this field.

1. Enter a string of text, such as 'BinBags' into the relevant field.
2. Select the Group(s) or Layer(s) where you want to replace the name.
3. Press the 'Rename Layer' button.

All selected layers should now be renamed appropriately.

### Search and replace layer names

This function is designed to search through the names of selected layers and/or groups for a specific string of text, if found then it replaces it with another string of text that the user specifies.

1. Enter a string of text into the first field for 'existing text', such as 'OLD'.
2. Enter a string of text into the second field for 'new text', such as 'NEW'.
3. Select all wanted layers/groups.
4. Click 'Search & Replace Layer Names'

All selected layers should now be renamed appropriately.

**Note:** This tool is case sensitive, for example you can replace 'R' with 'r'
Spaces such as ' ' are also included in the search parameters, for example you can replace a ' ' with '_'.

### List and Delete Empty Layers

This function is designed to search through all layers in the document and list them in the tool if they are found to be empty. 'Empty' is defined as no pixel data in the bounds of the layer.

1. Click 'Select Empty Layers'
2. Confirm that the layers listed in the panel are fine to be deleted.
3. If happy to proceed, click 'Delete Empty Layers'

Empty layers that are found will be listed beneath this header.

## Known Issues

- Currently the user must click the button, rather than hitting enter. This could be changed if needed.
- When selecting Multiple Groups with the shift key, the functions apply to the Groups and all underlying Layers, apart from the last Group selected. This should likely be changed, but as a workaround the user can use CTRL + Click to select multiple layers if this is not a desired outcome.
- The cursor disappears at times, this should return after clicking elsewhere. This seems to be a Photoshop bug, but could benefit from investigation.
