(function ($) {

		function show($select) {
			let $dropdown = $select.closest('.dropdown');
			if ($dropdown.length) {
				$dropdown.dropdown('show');
			}
		}

		function hide($select) {
			let $dropdown = $select.closest('.dropdown');
			if ($dropdown.length) {
				$dropdown.dropdown('hide');
			}
		}

		function init($select) {

			if ($select.closest('.dropdown').length) {
				return $select.closest('.dropdown');
			}

			const settings = $select.data('options');

			const multiple = false !== $select.prop('multiple');
			let selectedValue = $select.val();

			let closeOutside = "";
			if (multiple) {
				closeOutside = `data-bs-auto-close="outside"`;
			}


			let dropClasses = [];
			if (settings.dropUp) dropClasses.push('dropup');
			if (settings.dropEnd) dropClasses.push('dropend');
			if (settings.dropStart) dropClasses.push('dropstart');
			if (settings.dropCenter) dropClasses.push('dropdown-center');

			let $dropdown = $('<div>', {
				class: 'dropdown js-bs-select-dropdown ' + dropClasses.join(' '),
				html: `
                <a class="${settings.btnClass} dropdown-toggle d-flex flex-nowrap align-items-center" ${closeOutside} href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" style="width:${settings.btnWidth}">
                <div class="js-dropdown-header flex-fill text-start">${settings.btnEmptyText}</div>

                </a>`
			}).insertAfter($select);

			// fix overflow, when dropdown is inside bootstrap-table
			if($dropdown.closest('.fixed-table-body:not(.overflow-visible)').length){
				$dropdown.closest('.fixed-table-body').addClass('overflow-visible');
			}

			// add events
			$dropdown
				.on('hide.bs.dropdown', function () {
					$select.trigger('hide.bs.select');
				})
				.on('hidden.bs.dropdown', function () {
					$select.trigger('hidden.bs.select');
				})
				.on('show.bs.dropdown', function () {
					$select.trigger('show.bs.select');
					if($('.js-bs-select-dropdown .dropdown-menu.show').length){
						$('.js-bs-select-dropdown .dropdown-menu.show').closest('.dropdown').dropdown('hide');
					}
				})
				.on('shown.bs.dropdown', function () {
					$select.trigger('shown.bs.select');
					if ($select.closest('.dropdown').find('[type="search"]').length){
						$select.closest('.dropdown').find('[type="search"]').focus()
					}
				});

			$select.appendTo($dropdown);
			$select.val(selectedValue);
			$select.hide();

			let darkMenu = settings.darkMenu ? 'dropdown-menu-dark' : '';

			const $dropdownMenu = $('<div>', {
				class: 'dropdown-menu mt-1 py-0 ' + darkMenu
			}).appendTo($dropdown);

			let searchInput = '';
			let closeBtnClass = settings.darkMenu ? 'btn-close-white' : '';
			let closeButton = '';
			let actionMenu = '';
			if (settings.search) {
				searchInput = `<input type="search" autocomplete="off" class="form-control form-control-sm me-auto" placeholder="Suchen..">`;
			}

			if (multiple) {
				closeButton = `<button type="button" class="btn-close ${closeBtnClass} ms-2" data-bs-dismiss="dropdown" aria-label="Close"></button>`;
				if (settings.showActionMenu) {
					actionMenu = `
						<div class="btn-group btn-group-sm mt-2 p-0">
							<a href="#" class="btn btn-link p-0 js-select-select-all">${settings.selectAllText}</a>
							<a href="#" class="btn btn-link p-0 js-select-select-none">${settings.deselectAllText}</a>
						</div>
					`;
				}
			}

			let toolbarClasses = '';
			if (searchInput !== '' || closeButton !== '' || actionMenu !== ''){
				toolbarClasses = 'px-2 pb-2 border-bottom';
			}
			$(`
			<div class="d-flex flex-column ${toolbarClasses}">
	            <div class="d-flex  justify-content-end align-items-center">
	                ${searchInput}
	                ${closeButton}
	            </div>
	            ${actionMenu}
            </div>
            `).appendTo($dropdownMenu);

			if (settings.menuPreHtml !== null) {
				$('<div>', {
					html: settings.menuPreHtml,
					class: 'text-muted p-3 fs-6',
					// css: {padding:'4px 16px'}
				}).appendTo($dropdownMenu);
				$('<hr class="dropdown-divider mt-0">').appendTo($dropdownMenu);
			}

			$dropdownMenu.find('[type="search"]').prop("autocomplete", "off")

			let i = 0;
			let inOGroup = false;
			$select.find('optgroup, option').each(function (index, option) {
				if ($(this).is("optgroup")) {
					$(`<h6 class="dropdown-header text-uppercase text-start my-0 w-100 rounded-0 py-1 bg-${settings.dropHeaderClass} text-bg-${settings.dropHeaderClass}">${$(this).attr('label')}</h6>`).appendTo($dropdownMenu);
					return;
				}
				let $option = $(option);
				let classList = $option.get(0).className.trim();
				let value = $option.prop('value');
				let inOptGroup = $option.closest('optgroup').length !== 0;
				let isDisabled = $option.prop('disabled');
				let disabledClass = isDisabled ? 'disabled' : '';

				if (!value || value === "")
					return;

				let selected = "";

				if (value !== false) {
					if (multiple) {
						selected = $.inArray(value, selectedValue) > -1 ? 'active' : '';
					} else {
						selected = selectedValue === value ? 'active' : '';
					}
				}

				let $subtext = settings.showSubtext && $option.data('subtext') ?
					`<small class="text-muted mx-2">${$option.data('subtext')}`
					: '';

				let $icon = $option.data('icon') ?
					`<i class="${$option.data('icon')}"></i> `
					: '';

				let paddingLeftClass = inOptGroup ? 'ps-3' : '';

				if(inOGroup && !inOptGroup){
					$(`<hr class="dropdown-divider">`).appendTo($dropdownMenu);
				}

				$('<div>', {
					tabindex: i,
					class: classList,
					html: `
                <a class="dropdown-item ${selected} ${disabledClass} d-flex align-items-end" data-index="${i}" href="#">
                    <span class=" ${paddingLeftClass}">${$icon}${$option.text()}</span>
                    ${$subtext}
                </a>`
				}).appendTo($dropdownMenu);
				inOGroup = inOptGroup;
				i++;
			});

			if (settings.menuAppendHtml !== null) {
				$('<hr class="dropdown-divider">').appendTo($dropdownMenu);

				$('<div>', {
					html: settings.menuAppendHtml,
					class: 'text-muted fs-6',
					css: {padding: '4px 16px'}
				}).appendTo($dropdownMenu);
			}

			$dropdown
				.on('click', '.js-select-select-all', function (e) {
					e.preventDefault();
					$select.find('option').prop('selected', true);
					refresh($select);
					$select.trigger('change.bs.select');
					$select.bsSelectDrop('show');
				})
				.on('click', '.js-select-select-none', function (e) {
					e.preventDefault();
					$select.find('option').prop('selected', false);
					refresh($select);
					$select.trigger('change.bs.select');
					$select.bsSelectDrop('show');
				})
				.on('hidden.bs.dropdown', function () {
					// empty search field if exists
					let searchField = $(this).find('[type="search"]');
					if (searchField.length) {
						searchField.val(null).trigger('keyup');
					}
				})
				.on('keyup', '[type="search"]', function () {
					let searchPattern = $(this).val().trim();
					let searchElements = $dropdown.find('[data-index]');
					if (searchPattern !== '') {
						searchElements.each(function (index, value) {

							let currentName = $(value).text().trim();
							if (currentName.toUpperCase().indexOf(searchPattern.toUpperCase()) > -1) {
								$(value).removeClass('d-none');
							} else {
								$(value).addClass('d-none');
							}
						});
					} else {
						searchElements.removeClass('d-none');
					}
				})
				.on('click', '[data-bs-dismiss="dropdown"]', function (e) {
					let btn = $(e.currentTarget);
					let dd = btn.closest('.dropdown');
					dd.find('[data-bs-toggle="dropdown"]').dropdown('hide');
				})
				.on('click', '.dropdown-item', function (e) {
					e.preventDefault();

					if (!multiple)
						$dropdown.find('.dropdown-item.active').removeClass('active');

					$(e.currentTarget).toggleClass('active');

					let values = [];

					$dropdown.find('.dropdown-item.active').each(function (i, element) {
						let val = $select.find('option:eq(' + $(element).data('index') + ')').prop('value');
						if (val !== false) {
							values.push(val);
						}
					});

					// update select

					if (multiple) {
						$select.val(values);
					} else if (values.length) {
						$select.val(values[0]);
					} else {
						$select.val(null);
					}

					console.log($select.val());

					setDropdownTitle($select);

					$select.trigger('change');
				});

			setDropdownTitle($select);

			return $dropdown;
		}


		function setDropdownTitle($select) {
			let settings = $select.data('options');
			// const multiple = false !== $select.prop('multiple');
			const $dropdown = $select.closest('.js-bs-select-dropdown');
			const $titleElement = $dropdown.find('.js-dropdown-header');
			let selectedValues = $select.val();
			let title;
			if (!selectedValues || !selectedValues.length || selectedValues === "" || !$select.find('option:selected').length) {
				title = settings.btnEmptyText;
			} else {
				if (Array.isArray(selectedValues)) {
					if (selectedValues.length === 1) {
						let $option = $select.find(`option[value="${selectedValues[0]}"]`);
						let $subtext = $option.closest('optgroup').length && $option.data('subtext') ?
							`<small class="text-muted mx-2">${$option.data('subtext')}`
							: '';
						let $icon = $option.data('icon') ?
							`<i class="${$option.data('icon')}"></i> `
							: '';

						title = `<span>${$icon}${$option.text()}</span><small class="text-muted ms-2">${$subtext}</small>`;
					} else {

						if (!settings.showSelectionAsList) {
							let length = $select.find('option').length;
							title = settings.showSelectedText(selectedValues.length, length);
						} else {
							let texts = [];
							selectedValues.forEach(val => {
								let $option = $select.find(`option[value="${val}"]`);
								let $subtext = $option.closest('optgroup').length && $option.data('subtext') ?
									$option.data('subtext')
									: '';
								let $icon = $option.data('icon') ?
									`<i class="${$option.data('icon')}"></i> `
									: '';

								texts.push(`<div><span>${$icon}${$option.text()}</span><small class="text-muted ms-2">${$subtext}</small></div>`);

							})
							title = `<div class="d-flex flex-column">${texts.join('')}</div>`;
						}
					}
				} else {
					let $option = $select.find(`option[value="${selectedValues}"]`);
					if($option.hasClass('d-none')){
						title = settings.btnEmptyText;
					}else {
						let $subtext = $option.closest('optgroup').length && $option.data('subtext') ?
							`<small class="text-muted ms-2">${$option.data('subtext')}`
							: '';
						let $icon = $option.data('icon') ?
							`<i class="${$option.data('icon')}"></i> `
							: '';
						title = `<span>${$icon}${$option.text()}</span><small class="text-muted mx-2">${$subtext}</small>`;
					}
				}
			}

			$titleElement.html(title);
		}

		function val($select) {
			const $dropdown = $select.closest('.js-bs-select-dropdown');
			$dropdown.find('.dropdown-item.active').removeClass('active');
			let selectedValues = $select.val();
			if (!Array.isArray(selectedValues)) {
				selectedValues = [selectedValues];
			}

			selectedValues.forEach(value => {
				let index = $select.find(`option[value="${value}"]`).index();
				$dropdown.find(`.dropdown-item[data-index="${index}"]`).addClass('active');
			});

			$select.trigger('change');

			setDropdownTitle($select);
		}

		function destroy($select, show) {
			let val = $select.val();
			let $dropdown = $select.closest('.js-bs-select-dropdown');
			$select.insertBefore($dropdown);
			$select.val(val);
			$dropdown.remove();
			if (show)
				$select.show();
		}

		function refresh($select) {
			destroy($select, false);
			init($select);
		}


		$.fn.bsSelectDrop = function (options, param) {

			const DEFAULTS = {
				btnWidth: 'fit-content',
				btnEmptyText: 'Please select..',
				dropUp: false,
				dropStart: false,
				dropEnd: false,
				dropCenter: false,
				dropHeaderClass: 'secondary',
				btnClass: 'btn btn-outline-secondary',
				search: true,
				darkMenu: false,
				menuPreHtml: null,
				menuAppendHtml: null,
				showSubtext: true,
				showActionMenu: true,
				showSelectionAsList: true,
				showSelectedText: function (count, total) {
					return `${count}/${total} ausgewählt`;
				},
				deselectAllText: 'Deselect All',
				selectAllText: 'Select All',
			};

			let callFunction = false;
			let optionsSet = false;

			switch (typeof options) {
				case 'string': {
					callFunction = true;
				}
					break;
				default: {
					optionsSet = true;
				}
					break;
			}

			return $(this).each(function (index, select) {
				const $select = $(select);

				if (optionsSet) {
					$select.data('options', $.extend(true, DEFAULTS, $select.data(), options || {}))
				}

				init($select);

				if (callFunction) {
					switch (options) {
						case 'hide': {
							hide($select);
						}
							break;
						case 'show': {
							show($select);
						}
							break;
						case 'val': {
							$select.val(param);
							val($select);
							refresh($select);
							$select.trigger('change.bs.select');
						}
							break;
						case 'destroy': {
							destroy($select, true);
							$select.trigger('destroy.bs.select');
						}
							break;
						case 'updateOptions': {
							$select.data('options', $.extend(true,DEFAULTS, $select.data('options'), param || {}));
							refresh($select);
							$select.trigger('update.bs.select');
						}
							break;
						case 'refresh': {
							refresh($select);
							$select.trigger('refresh.bs.select');
						}
							break;
					}
				}

				return $select;
			});
		};

		$('[data-bs-toggle="select"]').bsSelectDrop();

	}
	(jQuery)
);
