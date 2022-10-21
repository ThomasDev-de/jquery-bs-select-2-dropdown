# jquery-bsSelectDrop

Converts a select into a dropdown

### Installation
Include the script at the end of the body tag.
```html
<script src="jquery.bsSelectDrop.js" type="text/javascript">
```

### Requirements
- bootstrap 5.0+
- jQuery 3.6

### Usage
All selects with the atrribute `[data-bs-toggle="select"]` are initialized automatically.

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
  dropUp: false, // shows the menu above
  dropStart: false, // shows the menu on the left
  dropEnd: false, // shows the menu on the right
  dropCenter: false, // shows the menu centered
  buttonClass: 'btn btn-outline-secondary', // The classes assigned to the dropdown button
  search: true, // in case of multiselection, a search function is added.
  darkMenu: false, // shows the menu in darkstyle
  emptyText: 'Bitte wählen..', // The text at no selection
  menuPreHtml: null, // shows a text in the menu before the selection
  menuAppendHtml: null // shows the text in the menu after the selection
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

#### destroy
Deletes the dropdown and restores the original select.
```js
$('select').bsSelectDrop('destroy');
```

### Further ideas (ToDos)
- add optgroup to dropdown
- add subtexts to options and title of dropdown
- add trigger events on dropdown open and close
