var currentPage = 1;
var rowsPerPage = 2; // Set to 2 rows per page
var table = document.getElementById('frameworkTable');
var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
var pageCount = Math.ceil(rows.length / rowsPerPage);

function showPage(pageNumber) {
    var start = (pageNumber - 1) * rowsPerPage;
    var end = start + rowsPerPage;

    for (var i = 0; i < rows.length; i++) {
        if (i >= start && i < end) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function createPagination() {
    var pagination = document.getElementById('pagination');

    // Clear existing pagination links
    pagination.innerHTML = '';

    // Add "Back" link
    var backLink = document.createElement('a');
    backLink.href = '#';
    backLink.innerText = 'Back';
    backLink.addEventListener('click', function (event) {
        event.preventDefault();
        navigatePage('back');

    });
    backLink.style.color = currentPage === 1 ? 'gray' : '';
    pagination.appendChild(backLink);

    // Add page links
    for (var i = 1; i <= pageCount; i++) {
        var link = document.createElement('a');
        link.href = '#';
        link.innerText = i;

        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageNumber = parseInt(this.innerText);
            showPage(pageNumber);
            updateActiveLink(pageNumber);
        });

        pagination.appendChild(link);
    }

    // Add "Forward" link
    var forwardLink = document.createElement('a');
    forwardLink.href = '#';
    forwardLink.innerText = 'Forward';
    forwardLink.addEventListener('click', function (event) {
        event.preventDefault();
        navigatePage('forward');
    });
    forwardLink.style.color = currentPage === pageCount ? 'gray' : '';
    pagination.appendChild(forwardLink);

    updateActiveLink(currentPage);
}

function updateActiveLink(activePage) {
    var links = document.getElementById('pagination').getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    links[activePage].classList.add('active');
}

function navigatePage(direction) {
    if (direction === 'back' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'forward' && currentPage < pageCount) {
        currentPage++;
    }
    // Update back and forward link colors
    var backLink = document.querySelector('#pagination a:first-child');
    var forwardLink = document.querySelector('#pagination a:last-child');
    backLink.style.color = currentPage === 1 ? 'gray' : '';
    forwardLink.style.color = currentPage === pageCount ? 'gray' : '';

    showPage(currentPage);
    updateActiveLink(currentPage);
}

function filterTable1() {
    // Get the selected option from the "Lines displayed" dropdown
    var displayDropdown = document.getElementById('display');
    var selectedOption = displayDropdown.options[displayDropdown.selectedIndex].value;

    // Update rowsPerPage based on the selected option
    rowsPerPage = parseInt(selectedOption);

    // Recalculate pageCount
    pageCount = Math.ceil(rows.length / rowsPerPage);

    // Display the first page and update pagination
    showPage(1);
    createPagination();
}

document.addEventListener('DOMContentLoaded', filterTable1);