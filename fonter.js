function fonter() {

  switch (control.getDropDownValue("Font").value) {
    case 'Apercu':
      fNum = 0
      break;
    case 'Eczar':
      fNum = 1
      break;
    case 'Graphik':
      fNum = 2
      break;
    case 'Space Mono':
      fNum = 3
      break;
    case 'Sharp Grotesk':
      fNum = 4
      break;
    case 'Gotu':
      fNum = 5
      break;
  }

  textFont(font);

  fractalDensity = map(textDensity, 0.01, 0.15, 0.01, 0.08)
  textDensityFl = map(textDensity, 0.01, 0.15, 0.005, 0.03)

  cText = control.getText("Text")


  if (isMobile) {
    fTextx = (200 - TextSize / 10) + pX
    fTexty = (height / 1.75 + TextSize / 10) + pY

  } else {
    fTextx = (550 - TextSize / 10) + pX
    fTexty = (height / 1.5 + TextSize / 10) + pY

  }


  let tester = [font, font2, font3, font4, font5, font6]

  points = tester[fNum].textToPoints(cText, fTextx, fTexty, TextSize, {
    sampleFactor: textDensity
  })
  pointsF = tester[fNum].textToPoints(cText, fTextx, fTexty, TextSize, {
    sampleFactor: fractalDensity
  })
  pointsFl = tester[fNum].textToPoints(cText, fTextx, fTexty, TextSize, {
    sampleFactor: textDensityFl
  })
}


let fNum = 0
let cText = "tC"
let fTextx
let fTexty