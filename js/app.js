// Use progressive enhancement to add functionality to a list of students
// Use append methods to add functionality to the page so as to not degrade or eliminate the readability of browsers that do not have javascript enabled


// Globals
var studentItems = $('.student-item');


// Add varibles that represent the HTML parts and append to page
var studentSearch ='<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';


// Pagination section should display 10 students per page. First need to get total number of students, divide by 10 to determine how many pages are necessary. Display as numbered list at bottom of page. Clicking each page number will display that section of students

function pages(list) {
  var pagesArray = [];
  do {
    for (; list.length > 0;) {
      pagesArray.push(list.splice(0, 10));
    }
  } while (list.length > 0);
  return pagesArray;
}

function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('slow');
        });
      }
  });
}

function appendButtons(pageList) {
	var numPages = pageList.length;
	var pagination ='<div class="pagination"><ul></ul></div>';
	$('.page').append(pagination);
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




// Append search functionality & pagination to the list
$('.page-header.cf').append(studentSearch);


var studentList = pages(studentItems);
console.log(studentList);
appendButtons(studentList);
showPages(0, studentList);