/*
File: script.js
GUI Assignment: HW4 Using the jQuery Plugin/UI with Your Dynamic Table
Aman Bhagat, Umass Lowell Computer Science, aman_bhagat@student.uml.edu
Copyright (c) 2021 by Aman.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by AB on Nov 6 4:30 pm
*/
var numTab =1;
$(function () {
  makeTable()
  $("#minColSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#minCol").val(ui.value);
      $("form[name='mTable']").first().trigger("submit")
    },
  });
  $("#minCol").on("keyup", function() {
    $("#minColSlider").slider("value", this.value);
    if( $("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit")
    }
});
  $("#maxColSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#maxCol").val(ui.value);
      $("form[name='mTable']").first().trigger("submit")
    },
  });
  $("#maxCol").on("keyup", function() {
    $("#maxColSlider").slider("value", this.value);
    if( $("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit")
    }
});
  $("#minRowSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#minRow").val(ui.value);
      $("form[name='mTable']").first().trigger("submit")
    },
  });
  $("#minRow").on("keyup", function() {
    $("#minRowSlider").slider("value", this.value);
    if( $("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit")
    }
});
  $("#maxRowSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#maxRow").val(ui.value);
      $("form[name='mTable']").first().trigger("submit")
    },
  });
  $("#maxRow").on("keyup", function() {
    $("#maxRowSlider").slider("value", this.value);
    if( $("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit")
    }
});
  $(document).ready(function () {
    jQuery.validator.addMethod("comparison", function (value, element, params) {
        return this.optional(element) || parseInt(value) >= parseInt($('input[name="' + params[0] +'"]').val());
    });
  });
  $("form[name='mTable']").validate({
    rules: {
      minCol: {
        required: true,
        number: true,
        range: [-50, 50],
      },
      maxCol: {
        required: true,
        number: true,
        comparison:['minCol', true],
        range: [-50, 50],
      },
      minRow: {
        required: true,
        number: true,
        range: [-50, 50],
      },
      maxRow: {
        required: true,
        number: true,
        comparison:['minRow', true],
        range: [-50, 50],
      },
    },
    messages: {
      minCol: {
        required: "<p id = eror>Please enter your minCol</p>",
        number: "<p id = eror>Please enter a Number</p>",
        range: "<p id = eror>Range can only be from -50 to 50</p>",
      },
      maxCol: {
        required: "<p id = eror>Please enter your minCol</p>",
        number: "<p id = eror>Please enter a Number</p>",
        comparison:"<p id = eror>Max Col Should be bigger than min Col</p>",
        range: "<p id = eror>Range can only be from -50 to 50</p>",
      },
      minRow: {
        required: "<p id = eror>Please enter your minCol</p>",
        number: "<p id = eror>Please enter a Number</p>",
        range: "<p id = eror>Range can only be from -50 to 50</p>",
      },
      maxRow: {
        required: "<p id = eror>Please enter your minCol</p>",
        number: "<p id = eror>Please enter a Number</p>",
        comparison:"<p id = eror>Max Row Should be bigger than min Row</p>",
        range: "<p id = eror>Range can only be from -50 to 50</p>",
      },
    },
    submitHandler: function (form, e) {
      e.preventDefault();
      makeTable();
    },
  });
});


  $(function () {
    $('#submit').click(function (form) {
      console.log("Hi")
      // var mTable = makeTable();
        // var num_tabs = $('div#tabs ul li.tab').length;        
        

        //     $('div#tabs ul').append(
        // '<li class="tab"><a href="#tab-' + numTab + '">Table '+ numTab + '</a><span class="ui-icon ui-icon-close""></li>');
        // $('div#tabs').append(
        //     '<div id="tab-' +  numTab + '"></div>');
        // $('#tabs').tabs("refresh");
        // $('#tabs').tabs("option", "active", -1); //makes the new tab active
        // var activeTab = $("#tabs").tabs('option', 'active');   
        // activeTab += 1;
        // $("#tab-" + activeTab).append('<div id="tab-' + numTab + '">' + $("#table").html() + '</div>');
     
      $('#tabs').tabs();
       
      console.log(numTab)
  $('div#tabs ul').append(
    '<li class="tab"><a href="#tab-' + numTab + '">Table '+ numTab + '</a><span class="ui-icon ui-icon-close""></li>');
  $( "div#tabs" ).append('<div id="tab-' + numTab + '">' + $("#table").html() + '</div>');
  $( "#tabs" ).tabs("refresh");
  $( "#tabs" ).tabs("option", "active", -1);
  numTab++;
    });
});

// //Insert content into the currently selected tab
// function insertContent(content) {
//     var activeTab = $("#tabs").tabs('option', 'active');   
//     activeTab += 1;
//     $("#tab-" + activeTab).append('<div id="table"></div>'+ $("#table").html() );
// }


    var tabs = $("#tabs").tabs();

tabs.delegate("span.ui-icon-close", "click", function() {
  var panelId = $(this).closest("li").remove().attr("aria-controls");
  $("#" + panelId).remove();
  tabs.tabs("refresh");
  console.log(panelId)
});
function makeTable(){
  var minCol = Number(document.getElementById("minCol").value);
      var maxCol = Number(document.getElementById("maxCol").value);
      var minRow = Number(document.getElementById("minRow").value);
      var maxRow = Number(document.getElementById("maxRow").value);
      console.log(minCol);
      console.log(maxCol);
      console.log(minRow);
      console.log(maxRow);
      const errorElement = document.createElement("p");
      const errorMes = document.getElementById("errMes");
      const table = document.createElement("table");
      const tabledata = document.getElementById("table");

      tabledata.innerHTML = "";
      for (let i = minRow - 1; i <= maxRow; i++) {
        const row = document.createElement("tr");
        for (let j = minCol - 1; j <= maxCol; j++) {
          if (i === minRow - 1 && j === minCol - 1) {
            const colH = document.createElement("th");
            colH.innerText = "";
            row.appendChild(colH);
          } else if (i === minRow - 1) {
            const colH = document.createElement("th");
            colH.innerText = j;
            row.appendChild(colH);
          } else if (j == minCol - 1) {
            const colH = document.createElement("th");
            colH.innerText = i;
            row.appendChild(colH);
          } else {
            const col = document.createElement("td");
            col.innerText = i * j;
            row.appendChild(col);
          }
        }
        table.appendChild(row);
      }
      tabledata.appendChild(table);
      console.log(tabledata)
}