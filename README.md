# jquery-bsSelectDrop

Converts a select into a dropdown

### table of contents

- [jquery-bsSelectDrop](#jquery-bsselectdrop)
    + [Installation](#installation)
    + [Requirements](#requirements)
    + [Usage](#usage)
    + [Options](#options)
    + [Methods](#methods)
      - [val](#val)
      - [updateOptions](#updateoptions)
      - [refresh](#refresh)
      - [destroy](#destroy)

### Installation
Include the script at the end of the body tag.
```html
<script src="jquery.bsSelectDrop.js" type="text/javascript">
```

### Requirements
- bootstrap 5.0+
- jQuery 3.6

### Usage
All selects with the attribute `[data-bs-toggle="select"]` are initialized automatically.

**Manual call**
```html
<!-- Simple selection -->
<select name="countries">
  <option value="Germany">Deutschland</option>
  <option value="Poland">Polen</option>
  ...
</select>

<!-- Or multiselection -->
<select name="cities" multiple>
  <option value="1">Berlin rocks</option>
  <option value="2">New York</option>
  ...
</select>

<script>
  $('select').bsSelectDrop();
</script>
```


### Options
```js
{
  btnWidth: 'fit-content', // the css width of the dropdown button
  btnEmptyText: 'Bitte wählen..', // The text at no selection
  btnClass: 'btn btn-outline-secondary', // The classes assigned to the dropdown button
  dropUp: false, // shows the menu above
  dropStart: false, // shows the menu on the left
  dropEnd: false, // shows the menu on the right
  dropCenter: false, // shows the menu centered  
  search: true, // adds a search function to the menu
  darkMenu: false, // shows the menu in darkstyle
  menuPreHtml: null, // shows a text in the menu before the selection
  menuAppendHtml: null, // shows the text in the menu after the selection
  showSubtext: true, // If this option is true, options have the data attribute data-subtext, the subtext will be displayed in the dropdown.
  showSelectionAsList: true // If it is a multiple selection, all selections should be listed below each other. If the value is false, it will show how much was selected.
}
```
### Methods
Methods are called as follows

```js
$('select').bsSelectDrop('method', param);
```

#### val
Changes the value of the select
```js
$('select').bsSelectDrop('val', 1);
```

#### updateOptions
Changes the options of the dropdown.
```js
$('select').bsSelectDrop('updateOptions', {
  buttonClass: 'btn btn-danger',
  ...
});
```

#### refresh
Rebuild the dropdown. This is useful if the options are changed via Javascript.
```js
$('select').bsSelectDrop('refresh');
```

#### destroy
Deletes the dropdown and restores the original select.
```js
$('select').bsSelectDrop('destroy'); 
```
### Further ideas (ToDos)
- [x] add optgroup to dropdown
- [x] add subtexts to options and title of dropdown 
- [ ] add trigger events on dropdown open and close
