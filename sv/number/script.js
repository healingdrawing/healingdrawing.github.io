function toSwedishNumberText(number) {
  if (number.length > "999999999999999999".length) {
    return { digital: "Ogiltigt nummer", cardinal: "Ogiltigt nummer", ordinal: "Ogiltigt nummer" };
  }

  const units = [
    "", "ett", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio",
    "tio", "elva", "tolv", "tretton", "fjorton", "femton", "sexton",
    "sjutton", "arton", "nitton"
  ];

  const ordinals = [
    "", "första", "andra", "tredje", "fjärde", "femte", "sjätte",
    "sjunde", "åttonde", "nionde", "tionde", "elfte", "tolfte",
    "trettonde", "fjortonde", "femtonde", "sextonde", "sjuttonde",
    "artonde", "nittonde"
  ];

  const tens = [
    "", "", "tjugo", "trettio", "fyrtio", "femtio", "sextio",
    "sjuttio", "åttio", "nittio"
  ];

  const scales = [
    { cardinal: "", ordinal: "" },
    { cardinal: "tusen", ordinal: "tusende" },
    { cardinal: "miljon", ordinal: "miljonte" },
    { cardinal: "miljard", ordinal: "miljardte" },
    { cardinal: "biljon", ordinal: "biljonte" },
    { cardinal: "biljard", ordinal: "biljardte" },
  ];

  function convertLessThanThousand(num, isOrdinal, isLast) {
    if (num === 0) return "";
    let result = "";
    const hundreds = Math.floor(num / 100);
    const tensUnits = num % 100;
    
    if (hundreds > 0) {
      result += units[hundreds] + "hundra";
      if (tensUnits === 0 && isOrdinal && isLast) return result + "de";
    }

    if (tensUnits === 0) return result;

    if (isOrdinal && isLast && tensUnits < 20 && tensUnits > 0) {
      return result + ordinals[tensUnits];
    }

    if (tensUnits >= 20) {
      const tensVal = Math.floor(tensUnits / 10);
      const unitsVal = tensUnits % 10;
      result += tens[tensVal];
      if (unitsVal > 0) {
        result += isOrdinal && isLast ? ordinals[unitsVal] : units[unitsVal];
      } else if (isOrdinal && isLast) {
        result += "nde";
      }
    } else {
      result += units[tensUnits];
    }

    return result;
  }

  function convertToSwedish(num, isOrdinal) {
    if (num === "0") return isOrdinal ? "<span class='d13'>nollte</span>" : "<span class='d13'>noll</span>";
    
    // Regex to split into groups of three digits from the right
    const groups = num.match(/\d{1,3}(?=(\d{3})*$)/g) || [];
    const chunks = [];
    
    let osi; //ordinal_scale_index
    groups.reverse();
    
    for (let i=0;i<groups.length;i++){ if (parseInt(groups[i],10)>0){ osi = i; break; } }
    
    for (let i=osi;i<groups.length;i++){
      const chunkNum = parseInt(groups[i], 10);
      let chunkText = convertLessThanThousand(chunkNum, isOrdinal, i === 0 );
      if (i > 0 && chunkNum > 0 ) chunkText += isOrdinal && i === osi ? scales[i].ordinal : scales[i].cardinal;
      if (i > 1 && chunkNum > 1) chunkText += "er";
      chunks.unshift(chunkText);
    }
    
    format_colors(chunks);
    return chunks.join("");
  }

  return {
    digital: convert_to_colored_digits(number),
    cardinal: convertToSwedish(number, false),
    ordinal: convertToSwedish(number, true)
  };
}

var color_classes = [ "d13", "d46", "d79", "d1012", "d1315", "d1618" ];
function format_colors(chunks){
  for (var i = 0; i < chunks.length; i++) {
    chunks[i] = "<div class=" + color_classes[i] + ">" + chunks[i] + "</div>";
  }
  return chunks;
}

function convert_to_colored_digits(number){
  const groups = number.match(/\d{1,3}(?=(\d{3})*$)/g) || [];
  for (var i = 0; i < groups.length; i++) {
    groups[i] = "<span class='" + color_classes[i] + " digits" + "'>" + groups[i] + "</span>";
  }
  return groups.join("") || "unexpected error";
}
