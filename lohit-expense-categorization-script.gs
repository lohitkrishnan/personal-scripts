/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

// Example document : https://docs.google.com/spreadsheets/d/1DDCKrHSd1V7lvYD70Rx7SpIXIaGriILoRkBBASK5dhQ/edit#gid=979904343
const CATEGORY_KEYWORD_MAP = {
  "FOOD": ["FOOD", "SWIGGY", "SANGAM","FRUI", "BISCU"], 
  "GROCERY": ["GROCE", "STARBAZAAR", "SPUDN", "FRESH"],
  "SALARY" : ["VANITHA"],
   "BADDY" : ["BADDY"],
    "BILLS" : ["FURLENCO", "BESCOM", "MAHARASHTRA"],
     "RENT" : ["SAJID NA"],
  "CAR" : ["FUEL"],
  "MEDICALS" : ["MEDIC"],
  "NA" : ["CREDCLUB", "MOTILAL OSWAL ASSET" , "Franklin Templeton", "cred@axisb"],
  "GIFT" : ["GIFT"]
  };
  
const CATEGORY_COLUMN_NAME = "Category"
const DESCRIPTION_COLUMN_NAME = "Description"
const OTHERS_CATEGORY = "OTHERS";

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'classify the items', functionName: 'classifyItems_'}
  ];
  spreadsheet.addMenu('Lohit', menuItems);
}

/**
 * A function that adds headers and some initial data to the spreadsheet.
 */
function classifyItems_() {

  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange()
  var data = range.getValues();

  var categoryColIndex = data[0].indexOf(CATEGORY_COLUMN_NAME);
  var descColIndex = data[0].indexOf(DESCRIPTION_COLUMN_NAME);

  if (categoryColIndex != -1 && descColIndex != -1) {
    for (var rowIndex = 1; rowIndex < data.length; rowIndex++) {
      var category = getCategory_(data[rowIndex] [(descColIndex)]);
      range.getCell(rowIndex+1, categoryColIndex+1).setValue(category);
    }
  }
}

/**
 * A custom function that classifies the text into categories.
 *
 * @param {Object} The text object to classify
 * @return {String} Category
 */
function getCategory_(descriptionText) {

for (const category in CATEGORY_KEYWORD_MAP) {
  for (const keyword_index in CATEGORY_KEYWORD_MAP[category]) {
    var keyword = CATEGORY_KEYWORD_MAP[category][keyword_index];
if (descriptionText.toString().toUpperCase().indexOf(keyword.toUpperCase()) > -1) {
      return category;
    }
    SpreadsheetApp.getActiveSheet().getCurrentCell().setValue(keyword);
  }
}
  return OTHERS_CATEGORY;
}





