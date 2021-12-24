
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthBodyTailColor" : 13,
    "eyeColor" : 96,
    "ePColor" : 10,
    //Cattributes
    "eyeShape" : 1,
    "decorationPattern" : 1,
    "innerHair" : 13,
    "outerHair" : 50,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    mouthBodyTailColor(colors[dna.mouthBodyTailColor],dna.mouthBodyTailColor)
    $('#mouthBodyTailColor').val(dna.mouthBodyTailColor)
    eyeColor(colors[dna.eyeColor],dna.eyeColor)
    $('#eyeColor').val(dna.eyeColor)
    ePColor(colors[dna.ePColor],dna.ePColor)
    $('#ePColor').val(dna.ePColor)
    innerHair(colors[dna.innerHair],dna.innerHair)
    $('#innerHair').val(dna.innerHair)
    outerHair(colors[dna.outerHair],dna.outerHair)
    $('#outerHair').val(dna.outerHair)
   
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthBodyTailColor').change(()=>{
    var colorVal = $('#mouthBodyTailColor').val()
    mouthBodyTailColor(colors[colorVal],colorVal)
})
$('#eyeColor').change(()=>{
    var colorVal = $('#eyeColor').val()
    eyeColor(colors[colorVal],colorVal)
})
$('#ePColor').change(()=>{
    var colorVal = $('#ePColor').val()
    ePColor(colors[colorVal],colorVal)
})
$('#eyeShape').change(()=>{
    var shape = parseInt($('#eyeShape').val())
    eyeVariation(shape)
})
$('#hairshape').change(()=>{
    var shape = parseInt($('#hairshape').val())
    decorationVariation(shape)
    
})
$('#innerHair').change(()=>{
    var colorVal = $('#innerHair').val()
    innerHair(colors[colorVal],colorVal)
})
$('#outerHair').change(()=>{
    var colorVal = $('#outerHair').val()
    outerHair(colors[colorVal],colorVal)
})
