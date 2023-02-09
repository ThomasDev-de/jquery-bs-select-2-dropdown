# jquery-bsSelectDrop

Converts a select into a dropdown

### table of contents

- [jquery-bsSelectDrop](#jquery-bsselectdrop)
    + [Installation](#installation)
    + [Requirements](#requirements)
    + [Usage](#usage)
    + [Options](#options)
    + [Methods](#methods)
      - [show](#show)
      - [hide](#hide)
      - [val](#val)
      - [updateOptions](#updateoptions)
      - [refresh](#refresh)
      - [destroy](#destroy)
    + [Events](#events)

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

<!-- Or with option groups -->
<select name="cities2" multiple>
    <optgroup label="Germany">
        <option value="1">Berlin</option>
        <option value="2">Munich</option>
    </optgroup>
    <optgroup label="USA">
        <option value="3">New York</option>
        <option value="4">San Francisco</option>
    </optgroup>
    <optgroup label="Spain">
        <option value="5">Barcelona</option>
        <option value="6">Madrid</option>
    </optgroup>
    ...
</select>

<script>
  $('select').bsSelectDrop();
</script>
```
### option[data-attributes]

| data-attribute | example                                                          | description                                                          |
|----------------|------------------------------------------------------------------|----------------------------------------------------------------------|
| data-subtext   | `<option data-subtext="Germany" value="1">Berlin</option>`       | Adds a small additional text section                                 |
| data-icon      | `<option data-icon="fa-solid fa-city" value="1">Berlin</option>` | Adds an icon in front of the option. (e.g. a class from FontAwesome) |


### Options
```js
{
  btnWidth: 'fit-content', // the css width of the dropdown button
  btnEmptyText: 'Please select..', // The text at no selection
  btnClass: 'btn btn-outline-secondary', // The classes assigned to the dropdown button
  dropUp: false, // shows the menu above
  dropStart: false, // shows the menu on the left
  dropEnd: false, // shows the menu on the right
  dropCenter: false, // shows the menu centered  
  dropHeaderClass: 'secondary', // If option groups are present, the background class of the heading is set here.
  search: true, // adds a search function to the menu
  darkMenu: false, // shows the menu in darkstyle
  menuPreHtml: null, // shows a text in the menu before the selection
  menuAppendHtml: null, // shows the text in the menu after the selection
  showSubtext: true, // If this option is true, options have the data attribute data-subtext, the subtext will be displayed in the dropdown.
  showActionMenu: true, // If it is a multiple selection and this option is true, two buttons are displayed above the selection for faster selection.
  showSelectionAsList: true, // If it is a multiple selection, all selections should be listed below each other. If the value is false, it will show how much was selected.
  showSelectedText: function(selectedItems, totalItems){}, // If it is a multiple selection and the selected elements are greater than 1, this function is called. This function is ignored if the showSelectionAsList option is true.
  deselectAllText: 'Deselect All', // If showActionMenu is true, the language of the two buttons can be set here.
  selectAllText: 'Select All', // If showActionMenu is true, the language of the two buttons can be set here.
}
```
### Methods
Methods are called as follows

```js
$('select').bsSelectDrop('method', param);
```

#### show
Opens the dropdown
```js
$('select').bsSelectDrop('show');
```

#### hide
Closes the dropdown
```js
$('select').bsSelectDrop('hide');
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

### Events

| event type        | Description                                                                                          |
|-------------------|------------------------------------------------------------------------------------------------------|
| hide.bs.select    | Fires immediately when the hide instance method has been called.                                     |
| hidden.bs.select  | 	Fired when the dropdown has finished being hidden from the user and CSS transitions have completed. |
| show.bs.select    | Fires immediately when the show instance method is called.                                           |
| shown.bs.select   | 	Fired when the dropdown has been made visible to the user and CSS transitions have completed.       |
| refresh.bs.select | 	Fires when the `refresh` method has been invoked.                                                   |
| change.bs.select  | 	Fires when the method `val` has been called.                                                        |
| update.bs.select  | 	Fires when the method `updateOptions` was called.                                                   |
| destroy.bs.select | 	Fires when the `destroy` method has been activated.                                                 |
