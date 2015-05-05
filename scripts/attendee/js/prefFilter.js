/*Created By Lee Jones  4-11-14
 *Last updated 12/9/14
 *__________________________________________________________________
 *filter selectboxes(Reviewers) based on selected checkboxes (Keywords & Opportunities)
 */
function UpdateFilter()
{
	  //get user's type: student or professional
    var attendee = document.getElementsByName("attendee");
    var userType;
    for (var i = 0; i < attendee.length; i++)
    {
      if (attendee[i].checked)
        userType = attendee[i].value;
    }

    // create arrays of kewords and opportunities to send for query    
  	var keywords = new Array();	                            // set an array with all active Keywords
  	dom = document.getElementsByClassName("keyword");
  	
    for(var i = 0; i< dom.length; i++)
  		if(dom[i].checked)
  			keywords.push(dom[i].value);
    
    var opportunity = new Array();                          // set an array with all active Opportunities
    dom = document.getElementsByClassName("opportunity");
    
    for(var i = 0; i< dom.length; i++)
      if(dom[i].checked)
        opportunity.push(dom[i].value);
    
    if (keywords.length==0 && opportunity.length==0)  // if no selectboxes checked revert to no filter
    {
      EmptyFilter();
    }
    else
    {
      // use jQuery to call FilterResults.php and return database query results in variable "data" 
      $(document).ready(function()
      {
        $.post("scripts/attendee/php/FilterResults.php", {'keywords[]' : keywords, 'opportunity[]' : opportunity, userType : userType}, function(data, success)
        {
			if (data)                                             // if query returned results
			{
				document.getElementById("topTwenty").innerHTML=data;
			}
        });
      });
    }
}

function EmptyFilter()
{
  for (var i = 1; i <= 20; i++)
  { 
    var dom = document.getElementById("preference" + i);    // set the dom object for which select box we are on

    if (dom.selectedIndex == 0)                     // empty the selecboxes that don't have a selection
      dom.options.length=0;

    dom.disabled = true;

    dom.options[0] = new Option ("Select Preference", "default", true);   // set first option to default value
    dom.options[0].disabled = true;
  }                                
}


