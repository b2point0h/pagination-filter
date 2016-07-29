"use strict";
// Use progressive enhancement to add functionality to a list of students
// Use append methods to add functionality to the page so as to not degrade or eliminate the readability of browsers that do not have javascript enabled


// Globals
var studentItems = $('.student-item');
var studentSearch ='<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
var pagination ='<div class="pagination"><ul></ul></div>';
var studentList = pages(studentItems);

// Appends
$('.page-header.cf').append(studentSearch);



// Generate an array of students for each page. Limit each page to a max of 10 students.
function pages(list) {
	var oldList = list.slice();
	var pagesArray = [];
	while (oldList.length) {
		pagesArray.push(oldList.splice(0,10));
	}
	return pagesArray;
}

// After generating the pages array of students, display the first page, hide the rest. 
function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}

// Append buttons to page. The number of pages to show is found from the pageList.length. Add & remove active class on click, and on pageload add active class to first button.
function appendButtons(pageList) {
	$('.page').append(pagination);
	var numPages = pageList.length;
	for (var i = 1; i <= numPages; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

	//Add click listeners
	  $(".pagination ul li a").on("click", function(e) {
	    var pageSelection = parseInt($(this)[0].text) - 1;
	    showPages(pageSelection, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");
	    e.preventDefault();
	  });
}

	
// Search function finds both name and/or email. If no results are found, change the header H2 to display No Results, otherwise display default Students title. On firing of the searchList, check input value to see if matches, if there are matches, generate the new student array & display appropriate list of buttons.
function searchList() {	
    var searchTerm = $('#search').val().toLowerCase().trim();

        var filteredStudents = studentItems.filter(function(i) {
        	var studentEmail = $(this).find('.email').text();
            var studentNames = $(this).find('h3').text();
            if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (filteredStudents.length === 0 ) {
        	$('.page-header h2').text('No Results');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        var paginated_students = pages(filteredStudents);
        $('.pagination').remove();
        if (filteredStudents.length >= 10) {
          appendButtons(paginated_students);
        }
        showPages(0, paginated_students);
}

// Inits
appendButtons(studentList);
showPages(0, studentList);

// Event Handlers
$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);
