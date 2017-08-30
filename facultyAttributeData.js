var rows = $facAttributeData.$data.length;
var row = 1;

initGlobals();

for (row=0; row<rows; row++) {
  console.log("Fac Attribute: " +   $facAttributeData.$data[row].code + " / " + $facAttributeData.$data[row].description);
  switch($facAttributeData.$data[row].code) {
    case "DECO":
        $globalFattIsDean = "Y";
        $globalFattLimitTerm = "%";
        break;
    case "SUMM":
        $globalFattIsDean = "Y";
        $globalFattLimitTerm = "%30";
        break;
    case "DECH":
        $globalFattIsChair = "Y";
        $globalFattLimitTerm = "%";
        break;
    default:
        $globalFattIsReview = "Y";
  } // end switch
}  // end for

console.log("DECO, DECH, Review, Trm Lmt: "
  + $globalFattIsDean 
  + ", " + $globalFattIsChair
  + ", " + $globalFattIsReview
  + ", " + $globalFattLimitTerm
  )

function initGlobals() {
  $globalFattIsDean = "N";
  $globalFattIsChair= "N";
  $globalFattIsReview= "N";
  $globalFattLimitTerm = "";
}