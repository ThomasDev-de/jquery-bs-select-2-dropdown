(function ($) {
    function init($select) {

        if ($select.closest('.dropdown').length) {
            return $select.closest('.dropdown');
        }

        const settings = $select.data('options');

        const multiple = false !== $select.prop('multiple');
        let selectedValue = $select.val();

        let closeOutside = "";
        if (multiple)
            closeOutside = `data-bs-auto-close="outside"`;

        let dropClasses = [];
        if (settings.dropUp) dropClasses.push('dropup');
        if (settings.dropEnd) dropClasses.push('dropend');
        if (settings.dropStart) dropClasses.push('dropstart');
        if (settings.dropCenter) dropClasses.push('dropdown-center');

        const $dropdown = $('<div>', {
            class: 'dropdown js-bs-select-dropdown ' + dropClasses.join(' '),
            html: `
                <a class="${settings.btnClass} dropdown-toggle d-flex flex-nowrap align-items-center" ${closeOutside} href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" style="width:${settings.btnWidth}">
                <div class="js-dropdown-header flex-fill text-start">${settings.btnEmptyText}</div>

                </a>`
        }).insertAfter($select);

        $select.appendTo($dropdown);
        $select.val(selectedValue);
        $select.hide();

        let darkMenu = settings.darkMenu ? 'dropdown-menu-dark' : '';

        const $dropdownMenu = $('<div>', {
            class: 'dropdown-menu mt-1 ' + darkMenu
        }).appendTo($dropdown);

        let searchInput = '';
        let closeBtnClass = settings.darkMenu ? 'btn-close-white' : '';
        let closeButton = '';
        if (settings.search) {
            searchInput = `<input type="search" class="form-control form-control-sm me-auto" placeholder="Suchen..">`;
        }

        if (multiple) {
            closeButton = `<button type="button" class="btn-close ${closeBtnClass} ms-2" data-bs-dismiss="dropdown" aria-label="Close"></button>`;
        }

        $(`
            <div class="d-flex px-2 pb-2 justify-content-end align-items-center border-bottom">
                ${searchInput}
                ${closeButton}
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

        let i = 0;
        $select.find('optgroup, option').each(function (index, option) {
            if ( $(this).is("optgroup")){
                $(`<h6 class="dropdown-header">${$(this).attr('label')}</h6>`).appendTo($dropdownMenu);

                return;
            }
            let $option = $(option);
            let value = $option.prop('value');
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

            let paddingLeft = 'ps-0';
            if ($option.closest('optgroup').length){
                paddingLeft = 'ps-3';
            }

            let $subtext = settings.showSubtext && $option.data('subtext') ?
                `<small class="text-muted mx-2">${$option.data('subtext')}`
                :'';

            $('<div>', {
                class: paddingLeft,
                html: `
                <a class="dropdown-item ${selected} d-flex align-items-end" data-index="${i}" href="#">
                    <span>${$option.text()}</span>
                    ${$subtext}
                </a>`
            }).appendTo($dropdownMenu);
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
            .on('hidden.bs.dropdown', function () {
                // empty search field if exists
                let searchField = $(this).find('[type="search"]');
                if (searchField.length) {
                    searchField.val(null).trigger('keyup');
                }
            })
            .on('keyup', '[type="search"]', function (e) {
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
        const multiple = false !== $select.prop('multiple');
        const $dropdown = $select.closest('.js-bs-select-dropdown');
        const $titleElement = $dropdown.find('.js-dropdown-header');
        let selectedValues = $select.val();
        let title;
        if (!selectedValues) {
            title = settings.btnEmptyText;
        } else {
            if (Array.isArray(selectedValues)) {
                if (selectedValues.length === 1) {
                    let $option = $select.find(`option[value="${selectedValues[0]}"]`);
                    let $subtext = settings.showSubtext && $option.data('subtext') ?
                        `<small class="text-muted mx-2">${$option.data('subtext')}`
                        :'';

                    title = `<span>${$option.text()}</span><small class="text-muted ms-2">${$subtext}</small>`;
                } else {
                    let length = $select.find('option').length;
                    title = `${selectedValues.length} / ${length} ausgewählt`;
                }
            } else {
                let $option = $select.find(`option[value="${selectedValues}"]`);
                let $subtext = settings.showSubtext && $option.data('subtext') ?
                    `<small class="text-muted ms-2">${$option.data('subtext')}`
                    :'';

                title = `<span>${$option.text()}</span><small class="text-muted mx-2">${$subtext}</small>`;
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

    const DEFAULTS = {
        btnWidth: 'fit-content',
        btnEmptyText: 'Bitte wählen..',
        dropUp: false,
        dropStart: false,
        dropEnd: false,
        dropCenter: false,
        btnClass: 'btn btn-outline-secondary',
        search: true,
        darkMenu: false,
        menuPreHtml: null,
        menuAppendHtml: null,
        showSubtext: true
    };

    $.fn.bsSelectDrop = function (options, param) {

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
                $select.data('options', $.extend(true, DEFAULTS, options || {}))
            }

            init($select);

            if (callFunction) {
                switch (options) {
                    case 'val': {
                        $select.val(param);
                        val($select);
                    }
                        break;
                    case 'destroy': {
                        destroy($select, true);
                    }
                        break;
                    case 'updateOptions': {
                        $select.data('options', $.extend(true, $select.data('options'), param || {}, DEFAULTS));
                        refresh($select);
                    }
                        break;
                    case 'refresh': {
                        refresh($select);
                    }
                        break;
                }
            }

            return $select;
        });
    };

    $('[data-bs-toggle="select"]').bsSelectDrop();

}(jQuery));
